import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import {
  setSelectedDate,
  setSelectedTime,
  setSelectedSlotId,
  setAvailableDates,
} from "../redux/bookingSlice";

import { FaCalendar as Calendar, FaClock as Clock } from "react-icons/fa";
import { RootState } from "../../store";

interface ITimeOption {
  value: string;
  label: string;
  slotId: string;
}

const DatetimeSelector = () => {
  const dispatch = useDispatch();
  const [availableDateObjects, setAvailableDateObjects] = useState<Date[]>([]);

  const {
    selectedDate,
    selectedTime,
    doctorId,
    suggestionData,
    availableDates,
    availableSchedules,
    isLoading,
    isShowRestoreSuggestion,
  } = useSelector((state: RootState) => state.booking);
  console.log("show", isShowRestoreSuggestion);

  // Danh sách khung giờ theo ngày được chọn
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

  // Xử lý khi availableDates thay đổi
  useEffect(() => {
    const fetchSchedules = async () => {
      const filteredSchedules = availableSchedules
        .filter((s) => String(s.doctorId) === String(doctorId))
        .reduce((acc: IAvailableDate[], schedule: IAvailableSchedule) => {
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
            acc.push({ date, times: [slot] });
          }

          return acc;
        }, []);

      dispatch(setAvailableDates(filteredSchedules));
      if (filteredSchedules.length > 0) {
        const dates = availableDates.map((d) => {
          const [year, month, day] = d.date.split("-").map(Number);
          return new Date(year, month - 1, day);
        });

        setAvailableDateObjects(dates);
        const fromSuggestion =
          (suggestionData?.availableSchedules ?? []).length > 0;

        if (fromSuggestion) {
          const firstDate = availableDates[0];
          dispatch(setSelectedDate(firstDate.date));
          if (firstDate.times.length > 0) {
            dispatch(setSelectedTime(firstDate.times[0].slotStartTime));
            dispatch(setSelectedSlotId(firstDate.times[0].slotId));
          }
        }
      } else {
        setAvailableDateObjects([]);
        dispatch(setSelectedDate(""));
        dispatch(setSelectedTime(""));
        dispatch(setSelectedSlotId(""));
      }
    };

    fetchSchedules();
  }, [doctorId, availableDates, suggestionData, dispatch]);

  // Nếu selectedTime không nằm trong danh sách times, chọn lại khung giờ đầu tiên
  useEffect(() => {
    if (timeOptions.length === 0) {
      dispatch(setSelectedTime(""));
      dispatch(setSelectedSlotId(""));
      return;
    }

    const isValid = timeOptions.some((t) => t.value === selectedTime);
    if (!isValid) {
      dispatch(setSelectedTime(timeOptions[0].value));
      dispatch(setSelectedSlotId(timeOptions[0].slotId));
    }
  }, [timeOptions, selectedTime, dispatch]);

  const handleDateChange = useCallback(
    (date: Date | null) => {
      if (!date) return;
      const isoDate = date.toISOString().split("T")[0];
      dispatch(setSelectedDate(isoDate));
      console.log("dfdf", isoDate);
    },
    [dispatch]
  );

  const handleTimeChange = useCallback(
    (option: ITimeOption | null) => {
      if (option) {
        dispatch(setSelectedTime(option.value));
        dispatch(setSelectedSlotId(option.slotId));
      } else {
        dispatch(setSelectedTime(""));
        dispatch(setSelectedSlotId(""));
      }
    },
    [dispatch]
  );

  const isDateAvailable = (date: Date) =>
    availableDateObjects.some((d) => d.toDateString() === date.toDateString());

  const selectedTimeOption =
    timeOptions.find((opt) => opt.value === selectedTime) || null;

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Date Picker */}
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium mb-1 flex items-center gap-1 text-gray-500">
            <Calendar className="w-4 h-4" />
            Chọn ngày
          </label>
          <DatePicker
            selected={
              selectedDate && !isShowRestoreSuggestion
                ? new Date(selectedDate)
                : null
            }
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
          <label className="text-sm font-medium mb-1 flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            Chọn giờ
          </label>
          <Select
            value={!isShowRestoreSuggestion ? selectedTimeOption : null}
            onChange={handleTimeChange}
            options={timeOptions}
            placeholder={timeOptions.length ? "Chọn giờ" : "Không có khung giờ"}
            isDisabled={!selectedDate || timeOptions.length === 0}
            className="w-full text-gray-700"
            noOptionsMessage={() => "Không có khung giờ"}
          />
        </div>
      </div>

      {/* Ngày giờ đã chọn */}
      {selectedDate && (
        <div className="text-sm text-gray-600">
          Ngày hẹn: {new Date(selectedDate).toLocaleDateString("vi-VN")}
          {selectedTime && ` lúc ${selectedTime}`}
        </div>
      )}

      {/* Không có lịch khả dụng */}
      {availableDates.length === 0 && !isLoading && (
        <div className="text-sm text-red-500">Không có lịch khả dụng.</div>
      )}
    </div>
  );
};

export default DatetimeSelector;
