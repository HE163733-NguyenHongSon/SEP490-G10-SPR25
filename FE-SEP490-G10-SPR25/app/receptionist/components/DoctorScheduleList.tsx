"use client";
import React from "react";
import Link from "next/link";



interface IDoctorSchedules {
  items: IDoctorSchedule[];
}

export const DoctorScheduleList = ({ items }: IDoctorSchedules) => {

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã lịch khám
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên bác sĩ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên dịch vụ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Thứ trong tuần
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phòng khám
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slot
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              thời gian bắt đầu
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              thời gian kết thúc
            </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thời gian
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hoạt động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items?.map((doctorSchedule) => (
            <tr key={doctorSchedule.doctorScheduleId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doctorSchedule.doctorScheduleId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {doctorSchedule.doctorName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {doctorSchedule.serviceName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doctorSchedule.dayOfWeek}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doctorSchedule.roomName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doctorSchedule.slotId}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doctorSchedule.slotStartTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doctorSchedule.slotEndTime}
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {doctorSchedule.slotStartTime} - {doctorSchedule.slotEndTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/receptionist/doctorSchedule-detail/${doctorSchedule.doctorScheduleId}`}
                  className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition-colors duration-200"
                >
                  Chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};