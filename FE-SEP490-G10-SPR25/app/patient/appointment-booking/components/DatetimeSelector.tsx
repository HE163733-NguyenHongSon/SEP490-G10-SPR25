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
import { RootState } from "@/store";

interface ITimeOption {
  value: string;
  label: string;
  slotId: string;
}

// Helper: format date as yyyy-MM-dd
const formatDateToYMD = (date: Date): string => {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

const DatetimeSelector = () => {
  const dispatch = useDispatch();
  const [availableDateObjects, setAvailableDateObjects] = useState<Date[]>([]);

  const {
    selectedDate,
    selectedTime,
    doctorId,
    suggestionData,
    availableSchedules,
    availableDates,
    isShowRestoreSuggestion,
    customSelectStyles,
  } = useSelector((state: RootState) => state.booking);

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

  const fetchSchedules = useCallback(() => {
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
      const dates = filteredSchedules.map((d) => new Date(d.date));
      setAvailableDateObjects(dates);

      const fromSuggestion =
        (suggestionData?.availableSchedules ?? []).length > 0;

      if (!isShowRestoreSuggestion && fromSuggestion) {
        const firstDate = filteredSchedules[0];
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
  }, [
    availableSchedules,
    doctorId,
    suggestionData,
    dispatch,
    isShowRestoreSuggestion,
  ]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

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
      const formatted = formatDateToYMD(date);
      dispatch(setSelectedDate(formatted));
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

  const isDateAvailable = useCallback(
    (date: Date) =>
      availableDateObjects.some(
        (d) => formatDateToYMD(d) === formatDateToYMD(date)
      ),
    [availableDateObjects]
  );

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium mb-1 flex items-center gap-1 text-gray-500">
            <Calendar className="w-4 h-4" />
            Chọn ngày
          </label>
          <DatePicker
            selected={selectedDate ? new Date(selectedDate) : null}
            onChange={handleDateChange}
            filterDate={isDateAvailable}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
            className="w-full border p-2  rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-100  border-gray-300"
            minDate={new Date()}
          />
        </div>

        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium mb-1 flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            Chọn giờ
          </label>
          <Select
            value={
              selectedTime
                ? timeOptions.find((opt) => opt.value === selectedTime)
                : null
            }
            onChange={handleTimeChange}
            options={timeOptions}
            placeholder={timeOptions.length ? "Chọn giờ" : "Không có khung giờ"}
            isDisabled={!selectedDate || timeOptions.length === 0}
            className="w-full"
            styles={customSelectStyles}
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

     
    </div>
  );
};

export default DatetimeSelector;
