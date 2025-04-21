"use client";
import React from "react";
import Select from "react-select";
import { Stethoscope as StethoscopeIcon, RefreshCw } from "lucide-react";
import { useBookingContext } from "@/patient/contexts/BookingContext";

const SpecialtySelector = () => {
  const {
    specialties,
    specialtyId,
    customStyles,
    showRestoreSuggestion,
    handleSpecialtyChange,
    restoreSuggestion,
  } = useBookingContext();

  const options = specialties.map(s => ({
    value: Number(s.specialtyId),
    label: s.specialtyName,
  }));

  const currentSpecialty = options.find(opt => opt.value === specialtyId);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <StethoscopeIcon className="w-4 h-4 mr-2" />
          Chuyên khoa
        </label>
        {showRestoreSuggestion && (
          <button
            onClick={restoreSuggestion}
            className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Khôi phục gợi ý
          </button>
        )}
      </div>
      <Select
        styles={customStyles}
        value={currentSpecialty || null}
        onChange={handleSpecialtyChange}
        options={options}
        isDisabled={!options.length}
        placeholder="Chọn chuyên khoa"
        noOptionsMessage={() => "Không có chuyên khoa nào"}
      />
    </div>
  );
};

export default SpecialtySelector;
