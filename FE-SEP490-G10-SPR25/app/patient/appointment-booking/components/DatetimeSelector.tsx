"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useBookingContext } from "@/patient/contexts/BookingContext";

interface TimeOption {
  value: string;
  label: string;
  slotId: string;
}

const DatetimeSelector = () => {
  const [availableDateObjects, setAvailableDateObjects] = useState<Date[]>([]);
  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([]);

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

  // Memoized schedules data processing
  const schedules = useMemo(() => {
    if (!suggestionData?.availableSchedules) return [];
    
    return suggestionData.availableSchedules
      .filter((schedule) => String(schedule.doctorId) === String(doctorId))
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
      }, []);
  }, [doctorId, suggestionData?.availableSchedules]);

  // Memoized function to update time options
  const updateTimeOptions = useCallback((date: string) => {
    const selectedDay = availableDates.find((d) => d.date === date);
    const options = selectedDay?.times.map((t) => ({
      value: t.slotStartTime,
      label: `${t.slotStartTime} - ${t.slotEndTime}`,
      slotId: t.slotId,
    })) || [];
    
    setTimeOptions(options);
    
    // Reset time selection if current selection is not available
    const currentTimeAvailable = options.some(opt => opt.value === selectedTime);
    if (!currentTimeAvailable && options.length > 0) {
      setSelectedTime(options[0].value);
      setSelectedSlotId(options[0].slotId);
    } else if (options.length === 0) {
      setSelectedTime("");
      setSelectedSlotId("");
    }
  }, [availableDates, selectedTime, setSelectedTime, setSelectedSlotId]);

  // Initialize available dates and times
  useEffect(() => {
    if (schedules.length > 0) {
      const dates = schedules.map(d => new Date(d.date));
      setAvailableDates(schedules);
      setAvailableDateObjects(dates);
      
      // Auto-select first date if none selected or current selection is invalid
      const firstDate = schedules[0].date;
      const isValidDate = selectedDate && schedules.some(d => d.date === selectedDate);
      
      const dateToSet = isValidDate ? selectedDate : firstDate;
      setSelectedDate(dateToSet);
      updateTimeOptions(dateToSet);
    } else {
      setAvailableDates([]);
      setAvailableDateObjects([]);
      setTimeOptions([]);
      setSelectedTime("");
      setSelectedSlotId("");
    }
  }, [schedules, selectedDate, setSelectedDate, updateTimeOptions]);

  // Update time options when selected date changes
  useEffect(() => {
    if (selectedDate) {
      updateTimeOptions(selectedDate);
    }
  }, [selectedDate, updateTimeOptions]);

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    const isoDate = date.toISOString().split("T")[0];
    setSelectedDate(isoDate);
  };

  const handleTimeChange = (option: TimeOption | null) => {
    if (option) {
      setSelectedTime(option.value);
      setSelectedSlotId(option.slotId);
    } else {
      setSelectedTime("");
      setSelectedSlotId("");
    }
  };

  const isDateAvailable = (date: Date) => {
    return availableDateObjects.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  const selectedTimeOption = timeOptions.find(opt => opt.value === selectedTime) || null;

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
          Ngày hẹn: {selectedDate} {selectedTime && `lúc ${selectedTime}`}
        </div>
      )}

      {availableDates.length === 0 && (
        <div className="text-sm text-red-500">Không có lịch khả dụng.</div>
      )}
    </div>
  );
};

export default DatetimeSelector;