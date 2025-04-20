import React, { useEffect } from "react";
import reservationService from "@/services/reservationService";
import { useBookingContext } from "@/patient/contexts/BookingContext";
import { specialtyService } from "@/services/specialtyService";
import SpecialtySelector from "./SpecialtySelector";
import ServiceSelector from "./ServiceSelector";
import DoctorSelector from "./DoctorSelector";
import DatetimeSelector from "./DatetimeSelector";
import SymptomInput from "./SymptomInput";
import FileUpload from "./FileUpload";

const BookingInfor = () => {
  const {
    symptoms,
    setSpecialties,
    specialtyId,
    setSpecialtyId,
    suggestionData,
    setSuggestionData,
    setLoading,
    selectedPatient,
    loading,
  } = useBookingContext();

  useEffect(() => {
    const storedSuggestion = localStorage.getItem("bookingSuggestion");
    if (storedSuggestion) {
      const parsedData = JSON.parse(storedSuggestion);
      setSuggestionData(parsedData);
      setSpecialtyId(Number(parsedData?.specialty?.specialtyId ?? specialtyId));
    }
  }, []);

  useEffect(() => {
    const fetchSuggestionData = async () => {
      setLoading(true);
      try {
        const data = await reservationService.getBookingSuggestion(
          selectedPatient?.userId,
          symptoms
        );
        const specialties = await specialtyService.getSpecialtyList();

        localStorage.setItem("bookingSuggestion", JSON.stringify(data));
        setSuggestionData(suggestionData ?? data);

        setSpecialtyId(Number(data?.specialty?.specialtyId ?? specialtyId));
        setSpecialties(specialties);
      } catch (error) {
        console.error("Lỗi khi lấy gợi ý lịch khám:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedPatient?.userId && symptoms) {
      fetchSuggestionData();
    }
  }, [selectedPatient, symptoms]);

  return (
    <div className="relative border-b-2 border-gray-200 py-8">
      {/* Overlay khi loading */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className={`space-y-8 ${loading ? "pointer-events-none opacity-50" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SpecialtySelector />
          <ServiceSelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DoctorSelector />
          <DatetimeSelector />
        </div>

        <div className="grid grid-cols-1 gap-8">
          <SymptomInput />
        </div>

        <div className="grid grid-cols-1 gap-8">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default BookingInfor;
