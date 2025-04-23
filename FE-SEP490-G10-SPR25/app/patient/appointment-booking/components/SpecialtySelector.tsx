"use client";
import React, { useEffect } from "react";
import Select from "react-select";
import { Stethoscope as StethoscopeIcon, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSpecialtyId, setShowRestoreSuggestion } from "../bookingSlice";
import { restoreSuggestion } from "../bookingThunks";
import type { RootState, AppDispatch } from "../store";
import type { StylesConfig } from "react-select";

const SpecialtySelector = () => {
  const dispatch: AppDispatch = useDispatch();
  const { specialties, specialtyId, showRestoreSuggestion: showRestore } = useSelector(
    (state: RootState) => state.booking
  );

  const options = specialties.map((s: ISpecialty) => ({
    value: String(s.specialtyId),
    label: s.specialtyName,
  }));

  useEffect(() => {
    if (specialtyId && !localStorage.getItem("suggestedSpecialtyId")) {
      localStorage.setItem("suggestedSpecialtyId", specialtyId.toString());
    }
  }, [specialtyId]);

  const currentSpecialty = options.find(opt => opt.value === String(specialtyId));

  const handleSpecialtyChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      const selectedId = Number(selectedOption.value);
      const suggestedId = Number(localStorage.getItem("suggestedSpecialtyId"));

      dispatch(setSpecialtyId(selectedId));
      dispatch(setShowRestoreSuggestion(selectedId !== suggestedId));
    }
  };

  const handleRestoreSuggestion = () => {
    dispatch(restoreSuggestion());

    const suggestedId = Number(localStorage.getItem("suggestedSpecialtyId"));
    dispatch(setSpecialtyId(suggestedId));
  };

  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#67e8f9" : "#d1d5db",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#67e8f9",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected || state.isFocused ? "#f3f4f6" : "white",
      color: "#374151",
      padding: "10px 12px",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151",
      display: "flex",
      alignItems: "center",
    }),
    input: (base) => ({ ...base, color: "#374151" }),
    placeholder: (base) => ({ ...base, color: "#9ca3af" }),
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <StethoscopeIcon className="w-4 h-4 mr-2" />
          Chuyên khoa
        </label>
        {showRestore && (
          <button
            onClick={handleRestoreSuggestion}
            className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Khôi phục gợi ý
          </button>
        )}
      </div>

      <Select
        value={currentSpecialty || null}
        onChange={handleSpecialtyChange}
        options={options}
        isDisabled={!options.length}
        placeholder="Chọn chuyên khoa"
        noOptionsMessage={() => "Không có chuyên khoa nào"}
        styles={customStyles}
      />
    </div>
  );
};

export default SpecialtySelector;
