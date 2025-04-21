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
    <div className="relative border-b border-gray-200 py-6 md:py-8 px-2 md:px-4 rounded-lg bg-white shadow-sm transition-all duration-300">
      {/* Overlay loading */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded-lg">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className={`space-y-10 transition-opacity duration-300 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
        {/* Chọn chuyên khoa và dịch vụ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <SpecialtySelector />
          </div>
          <div className="w-full">
            <ServiceSelector />
          </div>
        </div>

        {/* Chọn bác sĩ và thời gian */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <DoctorSelector />
          </div>
          <div className="w-full">
            <DatetimeSelector />
          </div>
        </div>

        {/* Triệu chứng */}
        <div className="w-full">
          <SymptomInput />
        </div>

        {/* Tệp đính kèm */}
        <div className="w-full">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default BookingInfor;