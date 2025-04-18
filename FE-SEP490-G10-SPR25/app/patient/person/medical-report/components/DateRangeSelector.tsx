"use client";
import React, { useState } from "react";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";

export const DateRangeSelector = ({
  value,
  onChange,
}: {
  value: [Dayjs, Dayjs] | null;
  onChange: (dates: [Dayjs, Dayjs] | null) => void;
}) => {
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null]>(
    value || [null, null]
  );

  const handleStartChange = (date: Dayjs | null) => {
    const newDates = [date, dates[1]] as [Dayjs | null, Dayjs | null];
    setDates(newDates);
    if (date && dates[1]) {
      onChange([date, dates[1]]);
    }
  };

  const handleEndChange = (date: Dayjs | null) => {
    const newDates = [dates[0], date] as [Dayjs | null, Dayjs | null];
    setDates(newDates);
    if (dates[0] && date) {
      onChange([dates[0], date]);
    }
  };

  const disabledEndDate = (current: Dayjs) => {
    if (!dates[0]) return true;
    return current < dates[0].startOf("day");
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="flex flex-col items-center ">
        <div className="flex flex-row">
          <DatePicker
            value={dates[0]}
            onChange={handleStartChange}
            placeholder="Từ ngày"
            className="w-full h-10"
            format="DD/MM/YYYY"
          />
          <span className="text-gray-500">→</span>
          <DatePicker
            value={dates[1]}
            onChange={handleEndChange}
            placeholder="Đến ngày"
            className="w-full h-10"
            disabled={!dates[0]}
            disabledDate={disabledEndDate}
            format="DD/MM/YYYY"
          />
        </div>
       
      </div>
      <button
        onClick={() => {
          setDates([null, null]);
          onChange(null);
        }}
        className="bg-cyan-500 text-white rounded-xl shadow-md text-sm p-1 w-20"
      >
        Đặt lại
      </button>
    </div>
  );
};
