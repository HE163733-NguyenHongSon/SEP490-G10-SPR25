"use client";
import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { patientService } from "@/services/patientService";
import { useQuery } from "@tanstack/react-query";
import SymptomInput from "./SymptomInput";
import BookingForm from "./BookingForm";
import { BookingProvider, useBookingContext } from "@/patient/contexts/BookingContext";

const PopupBody = () => {
  const { user } = useUser();
  const {
    symptoms,
    setSymptoms,
    setSuggestionData,
    setLoading,
    setShowBookingForm,
    setPatients,
  } = useBookingContext();

  const { data: patientDetail } = useQuery({
    queryKey: ["patientDetail", user],
    queryFn: async () => {
      const data = await patientService.getPatientDetailById(user?.userId);
      setPatients(data?.dependents || []);
      return data;
    },
    enabled: !!user,
    staleTime: 30000,
  });

  const handleSubmit = async () => {
    if (symptoms.trim().length > 2) {
      setLoading(true);
      setShowBookingForm(true);
      try {
        const res = await fetch(`/api/suggestions?symptom=${symptoms}`);
        const data = await res.json();
        setSuggestionData(data);
      } catch (error) {
        console.error("Lỗi khi lấy gợi ý:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative w-full max-w-full p-4">
      <SymptomInput onSubmit={handleSubmit} />
      <BookingForm />
    </div>
  );
};

const SymptomPopup = () => (
  <BookingProvider>
    <PopupBody />
  </BookingProvider>
);

export default SymptomPopup;
