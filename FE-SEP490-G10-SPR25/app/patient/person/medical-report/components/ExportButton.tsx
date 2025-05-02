import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { medicalReportService } from "@/common/services/medicalReportService";

const ExportButton = ({ patientId }: { patientId?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    await medicalReportService.fetchAndDownloadMedicalReport(patientId);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className="bg-cyan-500 flex flex-row  text-white font-bold py-2 px-4 rounded-lg"
    >
      <ArrowDownTrayIcon className="w-4 h-4 mr-1" />

      {isLoading ? "Đang xuất..." : "Xuất báo cáo y tế"}
    </button>
  );
};

export default ExportButton;
