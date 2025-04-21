"use client";
import { useBookingContext } from "@/patient/contexts/BookingContext";
import PatientInfor from "./PatientInfor";
import BookingInfor from "./BookingInfor";
import BookingConfirmation from "./BookingConfirmation";
import BookingStepper from "./BookingStepper";
import { useRef, useEffect, useState, memo, useCallback } from "react";

const MemoizedPatientInfor = memo(PatientInfor);
const MemoizedBookingInfor = memo(BookingInfor);
const MemoizedBookingConfirmation = memo(BookingConfirmation);

const BookingForm = () => {
  const {
    showBookingForm,
    currentStep,
    closeBookingForm,
    prevStep,
    nextStep,
    setSuggestionData,
    setSelectedPatient,
    setServiceId,
    setSpecialtyId,
    setDoctorId,
    setSelectedDate,
    setSelectedTime,
  } = useBookingContext();

  const formRef = useRef<HTMLDivElement>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Tối ưu hóa cuộn khi form được hiển thị lần đầu tiên
  useEffect(() => {
    if (!showBookingForm) return;

    setIsMounted(true);
    formRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      setIsMounted(false);
    };
  }, [showBookingForm]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setShowConfirmModal(true);
    }
  }, []);

  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      setShowConfirmModal(true);
    } else {
      if (currentStep === 2) {
        setSuggestionData(null);
      }
      prevStep();
    }
  }, [currentStep, prevStep, setSuggestionData]);

  const confirmCancel = useCallback(() => {
    setSelectedPatient(null);
    setSuggestionData(null);
    setServiceId(0);
    setSpecialtyId(1);
    setDoctorId(undefined);
    setSelectedDate("");
    setSelectedTime("");
    closeBookingForm();
    setShowConfirmModal(false);
  }, [
    closeBookingForm,
    setSelectedPatient,
    setSuggestionData,
    setServiceId,
    setSpecialtyId,
    setDoctorId,
    setSelectedDate,
    setSelectedTime,
  ]);

  if (!showBookingForm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleOverlayClick}
      />

      {/* Form */}
      <div
        ref={formRef}
        className={`relative z-50 top-12 w-[90%] md:w-2/3 lg:w-1/2 h-[90vh] bg-white rounded-2xl shadow-2xl p-6 flex flex-col transition-opacity duration-300 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại
          </button>

          {currentStep < 3 && (
            <button
              onClick={nextStep}
              className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition"
            >
              Tiếp theo
            </button>
          )}
        </div>

        {/* Stepper */}
        <BookingStepper currentStep={currentStep} />

        {/* Nội dung form */}
        <div className="flex-1 mt-6 min-h-[400px] overflow-y-auto">
          {currentStep === 1 && <MemoizedPatientInfor />}
          {currentStep === 2 && <MemoizedBookingInfor />}
          {currentStep === 3 && <MemoizedBookingConfirmation />}
        </div>
      </div>

      {/* Modal xác nhận */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl p-8 w-[90%] max-w-[550px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Bạn có chắc chắn muốn hủy đặt lịch?
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Thao tác này sẽ xóa tất cả thông tin bạn đã nhập...
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:underline transition"
              >
                Không
              </button>
              <button
                onClick={confirmCancel}
                className="bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600 transition"
              >
                Hủy đặt lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
