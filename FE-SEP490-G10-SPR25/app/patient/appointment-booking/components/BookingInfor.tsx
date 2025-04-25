"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@/contexts/UserContext";
import reservationService from "@/services/reservationService";
import { specialtyService } from "@/services/specialtyService";
import { patientService } from "@/services/patientService";

import SpecialtySelector from "./SpecialtySelector";
import ServiceSelector from "./ServiceSelector";
import DoctorSelector from "./DoctorSelector";
import DatetimeSelector from "./DatetimeSelector";
import SymptomInput from "./SymptomInput";
import FileUpload from "./FileUpload";

import {
  setLoading,
  setSpecialties,
  setSpecialtyId,
  setSuggestionData,
  setSymptoms,
  setPatients,
  setServiceId,
  setDoctorId,
  setSelectedDate,  
  setSelectedTime
} from "../redux/bookingSlice"; 
import { RootState } from "../../store";

const BookingInfor = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const { symptoms, isLoading, selectedPatient } = useSelector(
    (state: RootState) => state.booking
  );

  const { data: patientDetail } = useQuery({
    queryKey: ["patientDetail", user],
    queryFn: async () => {
      const data = await patientService.getPatientDetailById(user?.userId);
      return data;
    },
    enabled: !!user,
    staleTime: 30000,
  });

  const handleSubmit = async () => {
    if (symptoms.trim().length > 2) {
      dispatch(setSymptoms(symptoms.trim()));
      dispatch(
        setPatients([user as IPatient, ...(patientDetail?.dependents || [])])
      );
      dispatch(setLoading(true));
    }
  };  

  // Example usage of handleSubmit
  useEffect(() => {
    handleSubmit();
  }, [symptoms, patientDetail, user, dispatch]);

  useEffect(() => {
    const stored = localStorage.getItem("bookingSuggestion");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch(setSuggestionData(parsed));
        if (parsed?.specialty?.specialtyId) {
          dispatch(setSpecialtyId(Number(parsed.specialty.specialtyId)));
        }
      } catch (err) {
        console.error("Error parsing bookingSuggestion:", err);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const [suggestion, specialtyList] = await Promise.all([
          reservationService.getBookingSuggestion(symptoms),
          specialtyService.getSpecialtyList(),
        ]);
        dispatch(setSpecialties(specialtyList));
        dispatch(setSuggestionData(suggestion));
        localStorage.setItem("bookingSuggestion", JSON.stringify(suggestion));
        if (suggestion?.specialty?.specialtyId) {
          dispatch(setSpecialtyId(Number(suggestion.specialty.specialtyId)));
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching suggestion:", error);
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (selectedPatient?.userId && symptoms.length > 0) {
      fetchData();
    }

    return () => controller.abort();
  }, [selectedPatient, symptoms, dispatch]);

  useEffect(() => { 
    return () => {                  
      dispatch(setSpecialtyId(0));
      dispatch(setServiceId(""));
      dispatch(setDoctorId(""));
      dispatch(setSelectedDate(""));
      dispatch(setSelectedTime(""));
      localStorage.removeItem("bookingSuggestion");
    };
  }, []);

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
