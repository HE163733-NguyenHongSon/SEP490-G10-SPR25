"use client";
import { useSelector } from "react-redux";
import { CheckCircle, User, Calendar, Check } from "lucide-react";
import { RootState } from "@/store";

const BookingStepper = () => {
  const currentStep = useSelector(
    (state: RootState) => state.booking.currentStep
  );

  const steps = ["Thông tin bệnh nhân", "Thông tin lịch hẹn", "Xác nhận"];
  const icons = [
    <User key="user" className="w-6 h-6" />,
    <Calendar key="calendar" className="w-6 h-6" />,
    <Check key="check" className="w-6 h-6" />,
  ];

  return (
    <div className="w-full mb-8">
      <div className="relative flex justify-between items-center">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-0 transform -translate-y-1/2" />

        {/* Progress Bar */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-cyan-500 z-10 transform -translate-y-1/2 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;

          return (
            <div
              key={index}
              className="flex-1 z-20 flex flex-col items-center text-center"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-cyan-500 border-cyan-500 text-white"
                    : isActive
                    ? "border-cyan-500 text-cyan-500 bg-white"
                    : "border-gray-300 text-gray-400 bg-white"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  icons[index]
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  isActive ? "text-cyan-600 font-semibold" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingStepper;
