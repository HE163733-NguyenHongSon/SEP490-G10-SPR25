"use client";
import { useState } from "react";
import BookingForm from "./BookingForm";
import { FaPaperPlane } from "react-icons/fa";

const SymptomPopup = () => {
  const [symptoms, setSymptoms] = useState("");
  const [suggestionData, setSuggestionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    if (symptoms.trim().length > 2) {
      fetchSuggestion(symptoms);
    }
  };

  const fetchSuggestion = async (query: string) => {
    setLoading(true);
    setShowPopup(false);
    try {
      const res = await fetch(`/api/suggestions?symptom=${query}`);
      const data = await res.json();

      setSuggestionData(data);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative w-full max-w-xl p-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Nhập triệu chứng..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full px-4 py-2 pr-12 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Icon gửi nằm trong input */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-cyan-500 rounded-full text-white hover:bg-cyan-600 transition duration-200"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <FaPaperPlane className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {showPopup && suggestionData && (
        <BookingForm
          symptoms={symptoms}
          suggestionData={suggestionData}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default SymptomPopup;
