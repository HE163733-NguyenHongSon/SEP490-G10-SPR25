'use client'
import { useState } from "react";

const timeSlots = [
  "08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30",
  "10:30 - 11:00", "11:00 - 11:30", "13:30 - 14:00", "14:00 - 14:30", "14:30 - 15:00",
  "15:00 - 15:30", "15:30 - 16:00", "16:00 - 16:30"
];

const ScheduleTab = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="space-y-4 border-b border-gray-300 pb-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>LỊCH KHÁM</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => setSelectedSlot(slot)}
            className={`py-2 px-4 rounded-md text-sm border font-medium transition
              ${selectedSlot === slot
                ? "bg-cyan-500 text-white border-cyan-500"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"}
            `}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-500 pt-2 flex items-center gap-2">
        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M5 13l4 4L19 7" />
        </svg>
        {selectedSlot
          ? <>Đã chọn: <strong>{selectedSlot}</strong></>
          : <>Chọn 🖱 và đặt (Phí đặt lịch <strong>0đ</strong>)</>}
      </div>
    </div>
  );
};

export default ScheduleTab;
