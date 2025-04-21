"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useBookingContext } from "@/patient/contexts/BookingContext";
import { doctorScheduleService } from "@/services/doctorScheduleService";

interface ITimeOption {
  value: string;
  label: string;
  slotId: string;
}

const DatetimeSelector = () => {
  const [availableDateObjects, setAvailableDateObjects] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    suggestionData,
    availableDates,
    selectedDate,
    selectedTime,
    setAvailableDates,
    setSelectedDate,
    setSelectedTime,
    setSelectedSlotId,
    doctorId,
    serviceId,
  } = useBookingContext();

  // Lấy dữ liệu từ suggestion hoặc API
  const [schedules, setSchedules] = useState<IAvailableDate[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        let rawSchedules = [];

        if ((suggestionData?.availableSchedules ?? []).length > 0) {
          rawSchedules = suggestionData?.availableSchedules || [];
        } else {
          rawSchedules =
            await doctorScheduleService.getAvailableSchedulesByServiceId(
              serviceId
            );
        }

        const filteredSchedules = rawSchedules
          .filter(
            (s: IAvailableSchedules) => String(s.doctorId) === String(doctorId)
          )
          .reduce((acc: IAvailableDate[], schedule: IAvailableSchedules) => {
            const date = schedule.appointmentDate.split("T")[0];
            const slot = {
              slotId: String(schedule.slotId),
              slotStartTime: schedule.slotStartTime || "",
              slotEndTime: schedule.slotEndTime || "",
            };

            const existing = acc.find((item) => item.date === date);
            if (existing) {
              existing.times.push(slot);
            } else {
              acc.push({
                date,
                times: [slot],
              });
            }

            return acc;
          }, []);

        setSchedules(filteredSchedules);
      } catch (err) {
        console.error("Lỗi khi lấy lịch hẹn:", err);
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [suggestionData, doctorId, serviceId]);

  // Danh sách khung giờ dựa trên ngày đã chọn
  const timeOptions: ITimeOption[] = useMemo(() => {
    const selectedDay = schedules.find((d) => d.date === selectedDate);
    return (
      selectedDay?.times.map((t) => ({
        value: t.slotStartTime,
        label: `${t.slotStartTime} - ${t.slotEndTime}`,
        slotId: t.slotId,
      })) || []
    );
  }, [schedules, selectedDate]);

  // Cập nhật danh sách ngày và auto chọn nếu là từ suggestion
  useEffect(() => {
    if (schedules.length > 0) {
      const dates = schedules.map((d) => new Date(d.date));
      setAvailableDates(schedules);
      setAvailableDateObjects(dates);

      const fromSuggestion =
        (suggestionData?.availableSchedules ?? []).length > 0;

      if (fromSuggestion) {
        const firstDate = schedules[0];
        setSelectedDate(firstDate.date);
        if (firstDate.times.length > 0) {
          setSelectedTime(firstDate.times[0].slotStartTime);
          setSelectedSlotId(firstDate.times[0].slotId);
        }
      }
    } else {
      setAvailableDates([]);
      setAvailableDateObjects([]);
      setSelectedTime("");
      setSelectedSlotId("");
    }
  }, [
    schedules,
    suggestionData,
    setAvailableDates,
    setSelectedDate,
    setSelectedTime,
    setSelectedSlotId,
  ]);

  // Nếu giờ hiện tại không hợp lệ -> reset hoặc chọn mặc định
  useEffect(() => {
    if (timeOptions.length === 0) {
      setSelectedTime("");
      setSelectedSlotId("");
      return;
    }

    const isValid = timeOptions.some((t) => t.value === selectedTime);
    if (!isValid) {
      setSelectedTime(timeOptions[0].value);
      setSelectedSlotId(timeOptions[0].slotId);
    }
  }, [timeOptions, selectedTime, setSelectedTime, setSelectedSlotId]);

  const handleDateChange = useCallback(
    (date: Date | null) => {
      if (!date) return;
      const isoDate = date.toISOString().split("T")[0];
      setSelectedDate(isoDate);
    },
    [setSelectedDate]
  );

  const handleTimeChange = useCallback(
    (option: ITimeOption | null) => {
      if (option) {
        setSelectedTime(option.value);
        setSelectedSlotId(option.slotId);
      } else {
        setSelectedTime("");
        setSelectedSlotId("");
      }
    },
    [setSelectedTime, setSelectedSlotId]
  );

  const isDateAvailable = (date: Date) =>
    availableDateObjects.some((d) => d.toDateString() === date.toDateString());

  const selectedTimeOption =
    timeOptions.find((opt) => opt.value === selectedTime) || null;

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium mb-1">Chọn ngày</label>
          <DatePicker
            selected={selectedDate ? new Date(selectedDate) : null}
            onChange={handleDateChange}
            filterDate={isDateAvailable}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
            className="w-full p-2 border rounded-md text-gray-700"
            minDate={new Date()}
          />
        </div>

        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium mb-1">Chọn giờ</label>
          <Select
            value={selectedTimeOption}
            onChange={handleTimeChange}
            options={timeOptions}
            placeholder={timeOptions.length ? "Chọn giờ" : "Không có khung giờ"}
            isDisabled={!selectedDate || timeOptions.length === 0}
            className="w-full text-gray-700"
            noOptionsMessage={() => "Không có khung giờ"}
          />
        </div>
      </div>

      {selectedDate && (
        <div className="text-sm text-gray-600">
          Ngày hẹn: {new Date(selectedDate).toLocaleDateString("vi-VN")}
          {selectedTime && ` lúc ${selectedTime}`}
        </div>
      )}

      {availableDates.length === 0 && !loading && (
        <div className="text-sm text-red-500">Không có lịch khả dụng.</div>
      )}
    </div>
  );
};

export default DatetimeSelector;
