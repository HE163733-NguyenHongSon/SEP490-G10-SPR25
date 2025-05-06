"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SpecialtySelector from "./SpecialtySelector";
import ServiceSelector from "./ServiceSelector";
import DoctorSelector from "./DoctorSelector";
import DatetimeSelector from "./DatetimeSelector";
import SymptomInput from "./SymptomInput";
import FileUpload from "./FileUpload";

import { RootState } from "@/store";

const BookingInfor = () => {
  const { isLoading, suggestionData } = useSelector(
    (state: RootState) => state.booking
  );
  useEffect(() => {
    console.log("suggestion", suggestionData);
  }, [isLoading]);
  return (
    <div className="relative border-b border-gray-200 py-6 md:py-8 px-2 md:px-4 rounded-lg bg-white shadow-sm transition-all duration-300">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded-lg">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div
        className={`space-y-10 transition-opacity duration-300 ${
          isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <SpecialtySelector />
          </div>
          <div className="w-full">
            <ServiceSelector />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <DoctorSelector />
          </div>
          <div className="w-full">
            <DatetimeSelector />
          </div>
        </div>

        <div className="w-full">
          <SymptomInput />
        </div>

        <div className="w-full">
          <FileUpload />
        </div>
      </div>

      {(!suggestionData?.availableSchedules ||
        suggestionData.availableSchedules.length === 0) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Lịch này không khả dụng
            </h2>
            <p>
              Hiện tại không có lịch trống phù hợp với lựa chọn của bạn. Vui
              lòng chọn chuyên khoa, dịch vụ hoặc bác sĩ khác.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingInfor;
