"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reservationService from "@/common/services/reservationService";
import { specialtyService } from "@/common/services/specialtyService";

import SpecialtySelector from "./SpecialtySelector";
import ServiceSelector from "./ServiceSelector";
import DoctorSelector from "./DoctorSelector";
import DatetimeSelector from "./DatetimeSelector";
import SymptomInput from "./SymptomInput";
import FileUpload from "./FileUpload";

import {
  setIsLoading,
  setSpecialties,
  setSpecialtyId,
  setSuggestionData,
} from "../redux/bookingSlice";
import { RootState } from "../../store";

const BookingInfor = () => {
  const dispatch = useDispatch();

  const { symptoms, isLoading, selectedPatient, isShowRestoreSuggestion } =
    useSelector((state: RootState) => state.booking);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setIsLoading(true));
      try {
        const [suggestion, specialtyList] = await Promise.all([
          reservationService.getBookingSuggestion(symptoms),
          specialtyService.getSpecialtyList(),
        ]);
        dispatch(setSpecialties(specialtyList));
        dispatch(setSuggestionData(suggestion));
        if (suggestion?.specialty?.specialtyId && !isShowRestoreSuggestion) {
          dispatch(setSpecialtyId(suggestion?.specialty.specialtyId || ""));
          console.log("suggets  specialty ", suggestion?.specialty.specialtyId);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching suggestion:", error);
        }
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    if (selectedPatient?.userId && symptoms.length > 0) {
      fetchData();
    }
  }, [symptoms, dispatch, selectedPatient?.userId]);

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
    </div>
  );
};

export default BookingInfor;
