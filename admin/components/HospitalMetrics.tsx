"use client";
import React from "react";

export const HospitalMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="rounded-2xl border border-gray-300  p-5  dark:border-gray-700 shadow-md  md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-gray-800 dark:text-white/90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 2v2m8-2v2m-9 4h10M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
            />
          </svg>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Lịch hẹn khám
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782 đã khám
            </h4>
          </div>
          <div className="flex items-center font-semibold text-green-500 bg-green-100/20  rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="green"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 4l-8 8 1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12z" />
            </svg>

            <span className="ml-1">11.01%</span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-300  p-5  dark:border-gray-700 shadow-md md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-gray-800 dark:text-white/90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 2c-4.418 0-8 2.015-8 4.5V22h16v-1.5c0-2.485-3.582-4.5-8-4.5z"
            />
          </svg>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Bệnh nhân
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359 bệnh nhân
            </h4>
          </div>

          <div className="flex items-center text-red-500  bg-red-100/20 font-semibold rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="red"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 20l8-8-1.41-1.41L13 16.17V4h-2v12.17L5.41 10.59 4 12z" />
            </svg>

            <span className="ml-1">11.01%</span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-300  p-5  dark:border-gray-700 shadow-md md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-gray-800 dark:text-white/90"
          >
            <path d="M12 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v5h-2v-5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v5H6v-5zm10 1v4h-2v-4h2zm-4 0v4h-2v-4h2z" />
          </svg>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Bác sĩ
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              100 bác sĩ
            </h4>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-300  p-5  dark:border-gray-700 shadow-md md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-gray-800 dark:text-white/90"
          >
            <path d="M3 6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6zm9 1c-1.1 0-2 .9-2 2v2H8v2h2v2h2v-2h2v-2h-2V9h-2V7h2z" />
          </svg>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Dịch vụ
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              200 dịch vụ
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
