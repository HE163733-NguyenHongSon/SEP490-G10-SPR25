// components/SymptomInput.js
import React from "react";
import {  useSelector } from "react-redux";
import { FileText } from "lucide-react";
import { RootState } from "@/patient/store";

const SymptomInput = () => {
  const { symptoms } = useSelector((state: RootState) => state.booking);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <FileText className="w-4 h-4 mr-2" />
        Lý do khám / Triệu chứng
      </label>
      <textarea
        rows={4}
        value={symptoms}
        disabled={true}
        placeholder="Mô tả chi tiết lý do khám, triệu chứng hoặc mối quan tâm của bạn."
        className="w-full text-gray-700 rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 py-2 px-3 border"
      />
    </div>
  );
};

export default SymptomInput;
