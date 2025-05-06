import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileText } from "lucide-react";
import debounce from "lodash.debounce";
import { RootState } from "@/store";
import { setSymptoms, setIsFormValid } from "../redux/bookingSlice";
import reservationService from "@/common/services/reservationService";

const SymptomInput = () => {
  const dispatch = useDispatch();
  const {
    symptoms,
    serviceId,
    specialtyId,
    services,
    specialties,
    isFormValid,
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

    const result =
      await reservationService.validateSymptomsMatchSpecialtyAndService(
        trimmed,
        String(service?.overview),
        String(specialty?.description)
      );

    if (!result.isValid) {
      return markFormInvalid(result.message || "Triệu chứng không hợp lệ.");
    }

    setError(null);
    dispatch(setSymptoms(trimmed));
    dispatch(setIsFormValid(true));
  };

  const debouncedValidate = useCallback(
    debounce((value: string) => {
      validateSymptoms(value);
    }, 600),
    [serviceId, specialtyId]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTempSymptom(newValue);
    debouncedValidate(newValue);
  };

  useEffect(() => {
    return () => {
      debouncedValidate.cancel();
    };
  }, [debouncedValidate]);

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
          !isFormValid ? "border-red-500" : "border-gray-300"
        } px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none`}
      />

      {!isFormValid && (
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
