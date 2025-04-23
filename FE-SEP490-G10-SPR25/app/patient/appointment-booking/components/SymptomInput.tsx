// components/SymptomInput.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSymptoms, selectSymptoms } from '../bookingSlice';
import { FileText } from 'lucide-react';

const SymptomInput = () => {
  const dispatch = useDispatch();
  const symptoms = useSelector(selectSymptoms);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setSymptoms(e.target.value));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <FileText className="w-4 h-4 mr-2" />
        Lý do khám / Triệu chứng
      </label>
      <textarea
        rows={4}
        value={symptoms}
        onChange={handleChange}
        placeholder="Mô tả chi tiết lý do khám, triệu chứng hoặc mối quan tâm của bạn."
        className="w-full text-gray-700 rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 py-2 px-3 border"
      />
    </div>
  );
};

export default SymptomInput;
