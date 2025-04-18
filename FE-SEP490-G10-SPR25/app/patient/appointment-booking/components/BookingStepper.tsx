import { CheckCircle, Circle, User, Calendar, Check } from "lucide-react";

const BookingStepper = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Thông tin bệnh nhân", "Thông tin lịch hẹn", "Xác nhận"];
  const icons = [<User className="w-6 h-6" />, <Calendar className="w-6 h-6" />, <Check className="w-6 h-6" />];

  return (
    <div className=" w-full mb-8">
      <div className="flex justify-between items-center relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-0 transform -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-cyan-500 z-10 transform -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;

          return (
            <div key={index} className="flex flex-col items-center z-20 flex-1 text-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "bg-cyan-500 border-cyan-500 text-white"
                    : isActive
                    ? "border-cyan-500 text-cyan-500 bg-white"
                    : "border-gray-300 text-gray-400 bg-white"
                } transition-all duration-300`}
              >
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : icons[index]}
              </div>
              <span className={`mt-2 text-sm ${isActive ? "text-cyan-600 font-semibold" : "text-gray-500"}`}>
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
