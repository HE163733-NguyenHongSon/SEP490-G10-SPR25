import React, { useEffect, useMemo, useState, useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { doctorScheduleService } from "@/services/doctorScheduleService";

import {
  setAvailableDates,
  setSchedules,
  setSelectedDate,
  setSelectedTime,
  setSelectedSlotId,
  setLoading,
} from "../bookingSlice";

interface ITimeOption {
  value: string;
  label: string;
  slotId: string;
}

import { RootState } from "../store"; // Adjust the import path based on your project structure

const DatetimeSelector = () => {
  const dispatch = useDispatch();
  const [availableDateObjects, setAvailableDateObjects] = useState<Date[]>([]);
  const {
    selectedDate,
    selectedTime,
    schedules,
    doctorId,
    serviceId,
    suggestionData,
  } = useSelector((state: RootState) => state.booking); // Use RootState instead of any

  // Fetch schedules data from API or suggestion data
  useEffect(() => {
    const fetchSchedules = async () => {
      dispatch(setLoading(true));
      try {
        let rawSchedules = [];

        if ((suggestionData?.availableSchedules ?? []).length > 0) {
          rawSchedules = suggestionData?.availableSchedules || [];
        } else {
          rawSchedules = await doctorScheduleService.getAvailableSchedulesByServiceId(serviceId);
        }

        const filteredSchedules = rawSchedules
          .filter((s: IAvailableSchedules) => String(s.doctorId) === String(doctorId))
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

        dispatch(setSchedules(filteredSchedules));
      } catch (err) {
        console.error("Lỗi khi lấy lịch hẹn:", err);
        dispatch(setSchedules([]));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (doctorId && serviceId) {
      fetchSchedules();
    }
  }, [suggestionData, doctorId, serviceId, dispatch]);

  // Prepare time options based on selected date
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

  useEffect(() => {
    if (schedules.length > 0) {
      const dates = schedules.map((d) => {
        const [year, month, day] = d.date.split("-").map(Number);
        return new Date(year, month - 1, day); // Fix lệch timezone
      });

      dispatch(setAvailableDates(schedules));
      setAvailableDateObjects(dates);

      const fromSuggestion =
        (suggestionData?.availableSchedules ?? []).length > 0;

      if (fromSuggestion) {
        const firstDate = schedules[0];
        dispatch(setSelectedDate(firstDate.date));
        if (firstDate.times.length > 0) {
          dispatch(setSelectedTime(firstDate.times[0].slotStartTime));
          dispatch(setSelectedSlotId(firstDate.times[0].slotId));
        }
      }
    } else {
      dispatch(setAvailableDates([]));
      setAvailableDateObjects([]);
      dispatch(setSelectedTime(""));
      dispatch(setSelectedSlotId(""));
      dispatch(setSelectedDate(""));
    }
  }, [schedules, suggestionData, dispatch]);

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
      {/* Render UI similar to your previous component */}
    </div>
  );
};

export default DatetimeSelector;
