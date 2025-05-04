// components/ExportButton.tsx
"use client";

import React from "react";
import { adminService } from "@/common/services/adminService";

export const ExportButton = () => {
  const handleExport = async () => {
    try {
      await adminService.exportDashboardToExcel();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Xuất báo cáo thất bại");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
    >
      📥 Xuất báo cáo
    </button>
  );
};
