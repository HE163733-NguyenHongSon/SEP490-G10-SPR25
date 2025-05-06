"use client";
import { useUser } from "@/common/contexts/UserContext";
import { patientService } from "@/common/services/patientService";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import BookingForm from "./components/BookingForm";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import reservationService from "@/common/services/reservationService";
import {
  setIsLoading,
  setPatients,
  setIsShowBookingForm,
  setIsUseSuggestion,
  setSymptoms,
} from "./redux/bookingSlice";
import { RootState } from "@/store";

const SymptomPopup = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const { isLoading, isShowBookingForm } = useSelector(
    (state: RootState) => state.booking
  );

  const { data: patientDetail } = useQuery({
    queryKey: ["patientDetail", user],
    queryFn: async () =>
      await patientService.getPatientDetailById(user?.userId),
    enabled: !!user,
    staleTime: 30000,
  });

  const handleSubmit = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (trimmed.length <= 2) return;

    dispatch(setIsLoading(true));
    dispatch(setIsUseSuggestion(true));

    try {
      const suggestion = await reservationService.getBookingSuggestion(trimmed);
      if (suggestion?.specialty?.specialtyId === null) {
        toast.error(
          `Triệu chứng "${trimmed}" bạn nhập không phù hợp. Vui lòng thử lại!`,
          { autoClose: 5000 }
        );
        return;
      }
      dispatch(setSymptoms(trimmed));
      const guardian: IPatient = {
        userId: patientDetail?.userId,
        userName: patientDetail?.userName,
        avatarUrl: patientDetail?.avatarUrl,
        relationship: "Người giám hộ",
        dob: patientDetail?.dob,
        phone: patientDetail?.phone,
        address: patientDetail?.address,
        gender: patientDetail?.gender,
        email: patientDetail?.email,
      };
      dispatch(setPatients([guardian, ...(patientDetail?.dependents || [])]));
      dispatch(setIsShowBookingForm(true));
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error(
          "Đã xảy ra lỗi khi lấy gợi ý chuyên khoa. Vui lòng thử lại."
        );
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [inputValue, dispatch, patientDetail]);

  return (
    <div className="relative w-full max-w-2xl p-4">
      <div className="relative w-full h-15">
        <input
          type="text"
          placeholder="Nhập triệu chứng..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-4 pr-10 py-4 w-full h-full rounded bg-gray-100 text-gray-500 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || inputValue.trim().length < 2}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-6 w-6 text-cyan-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            <PaperAirplaneIcon className="w-6 h-6 text-cyan-500" />
          )}
        </button>
      </div>
      {isShowBookingForm && <BookingForm />}
    </div>
  );
};

export default SymptomPopup;
