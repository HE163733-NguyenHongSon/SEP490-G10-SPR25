"use client";
import Select from "react-select";
import { Stethoscope as StethoscopeIcon, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSpecialtyId,
  setIsShowRestoreSuggestion,
  setDoctorId,
  setServiceId,
  setSelectedDate,
  setSelectedTime,
} from "../redux/bookingSlice";
import { restoreSuggestion } from "../redux/bookingThunks";
import type { RootState, AppDispatch } from "../../store";

const SpecialtySelector = () => {
  const dispatch: AppDispatch = useDispatch();
  const { specialties, specialtyId, isShowRestoreSuggestion,suggestionData,customSelectStyles } = useSelector(
    (state: RootState) => state.booking
  );

  const options = specialties.map((s: ISpecialty) => ({
    value: String(s.specialtyId),
    label: s.specialtyName,
  }));

  const currentSpecialty = options.find(
    (opt) => opt.value === String(specialtyId)
  );

  const handleSpecialtyChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      const selectedId = selectedOption.value;     
      dispatch(setSpecialtyId(selectedId));
      dispatch(setServiceId(""));
      dispatch(setDoctorId(""));
      dispatch(setSelectedDate(""));
      dispatch(setSelectedTime(""));
      dispatch(
        setIsShowRestoreSuggestion(
          selectedId !== suggestionData?.specialty.specialtyId
        )
      );
    }
  };

  const handleRestoreSuggestion = () => {
    dispatch(restoreSuggestion());
  };

 

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <StethoscopeIcon className="w-4 h-4 mr-2" />
          Chuyên khoa
        </label>
        {isShowRestoreSuggestion && (
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
        styles={customSelectStyles}
      />
    </div>
  );
};

export default SpecialtySelector;
