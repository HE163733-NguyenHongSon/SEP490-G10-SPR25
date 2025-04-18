"use client";
import { useBookingContext } from "@/patient/contexts/BookingContext";
import PatientInfor from "./PatientInfor";
import BookingInfor from "./BookingInfor";
import BookingConfirmation from "./BookingConfirmation";
import BookingStepper from "./BookingStepper";
import { useRef, useEffect } from "react";

const BookingForm = () => {
  const { showBookingForm, currentStep, closeBookingForm, prevStep, nextStep } =
    useBookingContext();

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showBookingForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showBookingForm]);

  if (!showBookingForm) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeBookingForm}
      ></div>

      {/* Form Container */}
      <div
        ref={formRef}
        className="relative z-50 top-14 bg-white w-4/5 md:w-2/3 h-[90vh] rounded-lg shadow-xl p-6 overflow-y-auto"
      >
        {/* Back Button */}
        <div>
          <div className="flex justify-between items-center mb-4">
            {/* Back Button */}
            <button
              onClick={currentStep !== 1 ? prevStep : closeBookingForm}
              className="text-cyan-600 hover:underline font-medium flex items-center"
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
              Quay về trang trước
            </button>

            {/* Next Button */}
            <button
              onClick={nextStep}
              className="text-cyan-600 hover:underline font-medium flex items-center"
            >
              Tiếp theo
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Stepper */}
          <BookingStepper currentStep={currentStep} />
        </div>

        {/* Step Components */}
        {currentStep === 1 && <PatientInfor />}
        {currentStep === 2 && <BookingInfor />}
        {currentStep === 3 && <BookingConfirmation />}

       
      </div>
    </div>
  );
};

export default BookingForm;
