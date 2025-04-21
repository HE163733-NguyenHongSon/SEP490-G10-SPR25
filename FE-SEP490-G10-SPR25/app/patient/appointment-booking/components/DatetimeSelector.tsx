"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useBookingContext } from "@/patient/contexts/BookingContext";

interface ITimeOption {
  value: string;
  label: string;
  slotId: string;
}

const DatetimeSelector = () => {
  const [availableDateObjects, setAvailableDateObjects] = useState<Date[]>([]);

  const {
    suggestionData,
    availableDates,
    selectedDate,
    selectedTime,
    selectedSlotId,
    setAvailableDates,
    setSelectedDate,
    setSelectedTime,
    setSelectedSlotId,
    doctorId,
  } = useBookingContext();

  // Xử lý danh sách lịch hẹn từ suggestionData
  const schedules = useMemo(() => {
    if (!suggestionData?.availableSchedules) return [];

    return suggestionData.availableSchedules
      .filter((s) => String(s.doctorId) === String(doctorId))
      .reduce((acc: IAvailableDate[], schedule) => {
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
      }, []); //=> trả về dữ liệu lịch
  }, [suggestionData?.availableSchedules, doctorId]);

  // Tính danh sách khung giờ dựa trên ngày đã chọn
  const timeOptions: ITimeOption[] = useMemo(() => {
    const selectedDay = availableDates.find((d) => d.date === selectedDate);
    return (
      selectedDay?.times.map((t) => ({
        value: t.slotStartTime,
        label: `${t.slotStartTime} - ${t.slotEndTime}`,
        slotId: t.slotId,
      })) || []
    );
  }, [availableDates, selectedDate]);

  // Cập nhật danh sách ngày và auto chọn ngày hợp lệ
  useEffect(() => {
    if (schedules.length > 0) {
      const dates = schedules.map((d) => new Date(d.date));
      setAvailableDates(schedules);
      setAvailableDateObjects(dates);

      const isValid = selectedDate && schedules.some((d) => d.date === selectedDate);
      const defaultDate = isValid ? selectedDate : schedules[0].date;

      setSelectedDate(defaultDate);
    } else {
      setAvailableDates([]);
      setAvailableDateObjects([]);
      setSelectedTime(""); // Reset time when no schedules
      setSelectedSlotId(""); // Reset selected slotId
    }
  }, [schedules, selectedDate, setAvailableDates, setSelectedDate, setSelectedTime, setSelectedSlotId]);

  // Reset thời gian nếu thời gian hiện tại không hợp lệ
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

  const handleDateChange = useCallback((date: Date | null) => {
    if (!date) return;
    const isoDate = date.toISOString().split("T")[0];
    setSelectedDate(isoDate);
  }, [setSelectedDate]);

  const handleTimeChange = useCallback((option: ITimeOption | null) => {
    if (option) {
      setSelectedTime(option.value);
      setSelectedSlotId(option.slotId);
    } else {
      setSelectedTime("");
      setSelectedSlotId("");
    }
  }, [setSelectedTime, setSelectedSlotId]);

  const isDateAvailable = (date: Date) =>
    availableDateObjects.some((d) => d.toDateString() === date.toDateString());

  const selectedTimeOption = timeOptions.find((opt) => opt.value === selectedTime) || null;

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Date Picker */}
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

        {/* Time Selector */}
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

      {availableDates.length === 0 && (
        <div className="text-sm text-red-500">Không có lịch khả dụng.</div>
      )}
    </div>
  );
};

export default DatetimeSelector;
