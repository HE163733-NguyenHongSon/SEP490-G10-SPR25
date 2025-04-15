"use client";
import React from "react";


interface IDashboardAdmin {
  totalAppointmentSchedule: number;
  totalPatient: number;
  totalDoctor: number;
  totalService: number;
  appointmentScheduleChangePercent: number; // Sửa tên property cho đúng
  patientChangePercent: number; // Sửa tên property cho đúng
}

export const HospitalMetrics = ({ items }: { items: IDashboardAdmin }) => {
  const formatPercent = (percent: number) => {
    const isPositive = percent >= 0;
    return {
      colorClass: isPositive ? "text-green-500 bg-green-100/20" : "text-red-500 bg-red-100/20",
      icon: isPositive ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 4l-8 8 1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 20l8-8-1.41-1.41L13 16.17V4h-2v12.17L5.41 10.59 4 12z" />
        </svg>
      ),
      value: `${Math.abs(percent).toFixed(2)}%`,
    };
  };

  const appointmentInfo = formatPercent(items.appointmentScheduleChangePercent);
  const patientInfo = formatPercent(items.patientChangePercent);



  return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Lịch hẹn khám */}
      <div className="rounded-2xl border border-gray-300 p-5 dark:border-gray-700 shadow-md md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-gray-800 dark:text-white/90">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 2v2m8-2v2m-9 4h10M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
          </svg>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Lịch hẹn khám</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {items.totalAppointmentSchedule} đã khám
            </h4>
          </div>
          <div className={`flex items-center font-semibold rounded-full p-2 ${appointmentInfo.colorClass}`}>
            {appointmentInfo.icon}
            <span className="ml-1">{appointmentInfo.value}</span>
          </div>
        </div>
      </div>

      {/* Bệnh nhân */}
      <div className="rounded-2xl border border-gray-300 p-5 dark:border-gray-700 shadow-md md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-gray-800 dark:text-white/90">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 14c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 2c-4.418 0-8 2.015-8 4.5V22h16v-1.5c0-2.485-3.582-4.5-8-4.5z" />
          </svg>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Bệnh nhân</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {items.totalPatient} bệnh nhân
            </h4>
          </div>
          <div className={`flex items-center font-semibold rounded-full p-2 ${patientInfo.colorClass}`}>
            {patientInfo.icon}
            <span className="ml-1">{patientInfo.value}</span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-300 p-5 dark:border-gray-700 shadow-md md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-800 dark:text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM6 20v-2c0-2.21 3.58-4 8-4s8 1.79 8 4v2H6z" />
          </svg>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Bác sĩ
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {items.totalDoctor} bác sĩ
            </h4>
          </div>
          
        </div>
      </div>

      <div className="rounded-2xl border border-gray-300 p-5 dark:border-gray-700 shadow-md md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-800 dark:text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Dịch vụ
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {items.totalService} dịch vụ
            </h4>
          </div>
        
        </div>
      </div>
      
    </div>
  );
};
