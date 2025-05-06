"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpecialtySelector from "./SpecialtySelector";
import ServiceSelector from "./ServiceSelector";
import DoctorSelector from "./DoctorSelector";
import DatetimeSelector from "./DatetimeSelector";
import SymptomInput from "./SymptomInput";
import FileUpload from "./FileUpload";

import { RootState } from "@/store";
import {
  setIsLoading,
  setIsUseSuggestion,
  setSuggestionData,
  setSpecialtyId,
} from "../redux/bookingSlice";

import reservationService from "@/common/services/reservationService";
import { toast } from "react-toastify";

// Modal hiển thị khi không có lịch trống
const UnavailableScheduleModal = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        Lịch này không khả dụng
      </h2>
      <p>
        Hiện tại không có lịch trống phù hợp với lựa chọn của bạn. Vui lòng chọn
        chuyên khoa, dịch vụ hoặc bác sĩ khác.
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => window.location.reload()}
      >
        Đóng
      </button>
    </div>
  </div>
);

const BookingInfor = () => {
  const dispatch = useDispatch();
  const { isLoading, suggestionData, selectedPatient, symptoms, specialtyId } =
    useSelector((state: RootState) => state.booking);

  useEffect(() => {
    console.log("Fetching suggestion data...", selectedPatient);
    if (!selectedPatient || !symptoms?.length) return;
    const fetchSuggestionAndHandle = async () => {
      dispatch(setIsLoading(true));
      dispatch(setIsUseSuggestion(true));

      try {
        const suggestion = await reservationService.getBookingSuggestion(
          symptoms,
          selectedPatient.userId
        );
        dispatch(setSuggestionData(suggestion));
        if (!specialtyId) {
          dispatch(setSpecialtyId(suggestion?.specialty?.specialtyId || ""));
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          toast.error(
            "Đã xảy ra lỗi khi lấy gợi ý chuyên khoa. Vui lòng thử lại."
          );
        }
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchSuggestionAndHandle();
  }, [symptoms, selectedPatient, dispatch]);

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
          <SpecialtySelector />
          <ServiceSelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DoctorSelector />
          <DatetimeSelector />
        </div>

        <SymptomInput />
        <FileUpload />
      </div>

      {suggestionData?.specialty?.specialtyId &&
        suggestionData?.availableSchedules?.length === 0 && (
          <UnavailableScheduleModal />
        )}
    </div>
  );
};

export default BookingInfor;
