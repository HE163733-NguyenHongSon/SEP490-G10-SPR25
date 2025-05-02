"use client";
import React, { useEffect, useState } from "react";
import { doctorScheduleService } from "@/common/services/doctorScheduleService";
import Link from "next/link";

export default function DoctorScheduleDetailPage({
  params,
}: {
  params: { doctorScheduleId: string };
}) {
  const [schedule, setSchedule] = useState<IDoctorSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const scheduleData =
          await doctorScheduleService.getDoctorScheduleDetailById(
            params.doctorScheduleId
          );
        setSchedule(scheduleData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch schedule data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [params.doctorScheduleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading schedule data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Schedule not found</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <Link href="/receptionist/doctorSchedule" passHref>
              <button className="flex items-center text-white hover:text-blue-100 transition-colors">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Quay lại
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Chi tiết lịch làm việc</h1>
              <p className="mt-1 text-blue-100">
                Mã lịch: #{schedule.doctorScheduleId}
              </p>
            </div>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Basic Info Section */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Thông tin cơ bản
              </h3>
              <dl className="space-y-3">
                <InfoItem label="Bác sĩ" value={schedule.doctorName} />
                <InfoItem label="Dịch vụ" value={schedule.serviceName} />
                <InfoItem label="Mã lịch" value={schedule.doctorScheduleId} />
              </dl>
            </div>
          </div>

          {/* Detail Sections */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Schedule Details */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Thông tin lịch trình
                </h3>
                <dl className="space-y-3">
                  <InfoItem label="Phòng làm việc" value={schedule.roomName} />
                  <InfoItem
                    label="Ngày trong tuần"
                    value={schedule.dayOfWeek}
                  />
                </dl>
              </div>

              {/* Time Slot */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Khung giờ làm việc
                </h3>
                <dl className="space-y-3">
                  <InfoItem
                    label="Bắt đầu"
                    value={formatTime(schedule.slotStartTime)}
                  />
                  <InfoItem
                    label="Kết thúc"
                    value={formatTime(schedule.slotEndTime)}
                  />
                </dl>
              </div>

              {/* Additional Info */}
              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Thông tin bổ sung
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Mã bác sĩ" value={schedule.doctorId} />
                  <InfoItem label="Mã dịch vụ" value={schedule.serviceId} />
                  <InfoItem label="Mã phòng" value={schedule.roomId} />
                  <InfoItem label="Mã khung giờ" value={schedule.slotId} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <div className="flex items-center justify-end space-x-4">
            <Link
              href={`/receptionist/doctorSchedule-edit/${schedule.doctorScheduleId}`}
              passHref
            >
              <button className="flex items-center px-5 py-2.5 text-gray-600 hover:text-gray-800 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Chỉnh sửa lịch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component (giữ nguyên từ trang cũ)
const InfoItem = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) => (
  <div
    className={`flex justify-between items-center ${
      highlight ? "bg-blue-50 px-4 py-2 rounded-lg" : ""
    }`}
  >
    <dt className="text-gray-600">{label}:</dt>
    <dd
      className={`font-medium ${highlight ? "text-blue-700" : "text-gray-900"}`}
    >
      {value || "---"}
    </dd>
  </div>
);

// Hàm định dạng giờ
const formatTime = (timeString: string) => {
  const time = new Date(`1970-01-01T${timeString}`);
  return time.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
