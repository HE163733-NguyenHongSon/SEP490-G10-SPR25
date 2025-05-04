import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileText, Edit } from "lucide-react";
import { RootState } from "@/store";
import { setSymptoms } from "../redux/bookingSlice";
import debounce from "lodash.debounce";

const SymptomInput = () => {
  const dispatch = useDispatch();
  const { symptoms, isUseSuggestion } = useSelector(
    (state: RootState) => state.booking
  );
  const [tempSymptom, setTempSymptom] = useState(symptoms);

  useEffect(() => {
    setTempSymptom(symptoms);
  }, [symptoms]);

  const debouncedSetSymptoms = useCallback(
    debounce((value: string) => {
      dispatch(setSymptoms(value));
    }, 500),
    [dispatch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTempSymptom(newValue);

    if (!isUseSuggestion) {
      debouncedSetSymptoms(newValue);
    }
  };

  const handleSave = () => {
    dispatch(setSymptoms(tempSymptom));
  };

  useEffect(() => {
    return () => {
      debouncedSetSymptoms.cancel();
    };
  }, [debouncedSetSymptoms]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Lý do khám / Triệu chứng
        </div>
        {isUseSuggestion && (
          <span title="Cập nhật triệu chứng">
            <Edit
              className="w-4 h-4 text-cyan-600 cursor-pointer"
              onClick={handleSave}
            />
          </span>
        )}
      </label>
      <textarea
        rows={4}
        value={tempSymptom}
        onChange={handleChange}
        placeholder="Mô tả chi tiết lý do khám, triệu chứng hoặc mối quan tâm của bạn."
        className="w-full text-gray-700 rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 py-2 px-3 border"
      />
    </div>
  );
};

export default SymptomInput;
