import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSuggestionData,
  setSpecialtyId,
  setServiceId,
  setDoctorId,
  setShowRestoreSuggestion,
} from "./bookingSlice";

export const restoreSuggestion = createAsyncThunk(
  "booking/restoreSuggestion",
  async (_, { dispatch }) => {
    const storedSuggestion = localStorage.getItem("bookingSuggestion");
    if (storedSuggestion) {
      try {
        const parsedData = JSON.parse(storedSuggestion);

        dispatch(setSuggestionData(parsedData));
        dispatch(
          setSpecialtyId(Number(parsedData?.specialty?.specialtyId ?? 0))
        );
        dispatch(setServiceId(parsedData?.service?.serviceId ?? ""));
        dispatch(
          setDoctorId(
            parsedData?.availableSchedules?.[0]?.doctorScheduleId ?? ""
          )
        );
        dispatch(setShowRestoreSuggestion(false));
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu gợi ý từ localStorage:", error);
      }
    }
  }
);
