import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileText } from "lucide-react";
import debounce from "lodash.debounce";
import { RootState } from "@/store";
import {
  setSymptoms,
  setSpecialtyId,
  setSuggestionData,
  setIsFormValid,
} from "../redux/bookingSlice";
import { toast } from "react-toastify";
import reservationService from "@/common/services/reservationService";

const SymptomInput = () => {
  const dispatch = useDispatch();
  const {
    symptoms,
    isUseSuggestion,
    serviceId,
    specialtyId,
    services,
    specialties,
  } = useSelector((state: RootState) => state.booking);

  const [tempSymptom, setTempSymptom] = useState(symptoms);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTempSymptom(symptoms);
  }, [symptoms]);

  const markFormInvalid = (message: string) => {
    setError(message);
    dispatch(setIsFormValid(false));
  };

  const validateSymptoms = async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) {
      return markFormInvalid("Triệu chứng phải có ít nhất 3 ký tự.");
    }
     
    const service = services.find(
      (s) => String(s.serviceId) === String(serviceId)    
    );
    const specialty = specialties.find(
      (s) => String(s.specialtyId) === String(specialtyId)
    );

    if (!service || !specialty) {
      return markFormInvalid("Vui lòng chọn chuyên khoa và dịch vụ trước.");
    }

    const result =
      await reservationService.validateSymptomsMatchSpecialtyAndService(
        trimmed,
        service.overview || service.serviceName || "",
        specialty.description || specialty.specialtyName || ""
      );
      
      if (!result.isValid) {
      console.log("validateSymptoms", value, isUseSuggestion,result);
      return markFormInvalid(result.message || "Triệu chứng không hợp lệ.");
    }
    setError(null);
    dispatch(setSymptoms(trimmed));
    dispatch(setIsFormValid(true));
  };

  const handleSuggestionUpdate = async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) {
      return markFormInvalid("Vui lòng nhập ít nhất 3 ký tự.");
    }

    try {
      const suggestion = await reservationService.getBookingSuggestion(trimmed);
      dispatch(setSuggestionData(suggestion));

      if (
        !suggestion?.specialty?.specialtyId ||
        suggestion?.specialty?.specialtyName === "Không xác định"
      ) {
        return markFormInvalid(
          `Triệu chứng "${trimmed}" không phù hợp. Vui lòng thử lại!`
        );
      }

      setError(null);
      dispatch(setIsFormValid(true));
      dispatch(setSpecialtyId(suggestion.specialty.specialtyId));
      dispatch(setSymptoms(trimmed));
    } catch {
      markFormInvalid("Lỗi khi lấy gợi ý chuyên khoa.");
      toast.error("Đã xảy ra lỗi khi lấy gợi ý chuyên khoa. Vui lòng thử lại.");
    }
  };

  const debouncedValidate = useCallback(
    debounce((value: string) => {
      isUseSuggestion ? handleSuggestionUpdate(value) : validateSymptoms(value);
    }, 600),
    [isUseSuggestion, serviceId, specialtyId, services, specialties]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTempSymptom(newValue);
    debouncedValidate(newValue);
  };

  useEffect(() => () => debouncedValidate.cancel(), [debouncedValidate]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <FileText className="w-4 h-4 mr-2" />
        Lý do khám / Triệu chứng
      </label>

      <textarea
        rows={4}
        value={tempSymptom}
        onChange={handleChange}
        placeholder="Mô tả chi tiết lý do khám, triệu chứng hoặc mối quan tâm của bạn."
        className={`w-full rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none`}
      />

      {error && (
        <div className="flex items-start text-sm text-red-600 mt-1">
          <svg
            className="w-4 h-4 mr-2 mt-0.5 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SymptomInput;
