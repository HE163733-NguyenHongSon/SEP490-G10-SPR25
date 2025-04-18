"use client";
import { useBookingContext } from "@/patient/contexts/BookingContext";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const SymptomInput = ({ onSubmit }: { onSubmit: () => void }) => {
  const { symptoms, setSymptoms, loading } = useBookingContext();

  return (
    <div className="relative w-full h-15">
      <input
        type="text"
        placeholder="Nhập triệu chứng..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="pl-4 pr-10 py-4 w-full h-full rounded bg-gray-100 text-gray-500 focus:outline-none"
      />
      <button
        onClick={onSubmit}
        disabled={loading || symptoms.trim().length < 2}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <PaperAirplaneIcon className="w-6 h-6 text-cyan-500" />
      </button>
    </div>
  );
};

export default SymptomInput;
