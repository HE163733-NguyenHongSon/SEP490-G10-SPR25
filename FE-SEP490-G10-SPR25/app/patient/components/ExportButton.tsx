import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ExportButton = ({ patientId }: { patientId?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/api/MedicalReports/ExportPdf/${patientId}`
      );

      if (!response.ok) {
        throw new Error("Xuất báo cáo thất bại");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `BaoCaoYTe_${patientId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Export error:", error);
      if (error instanceof Error) {
        alert("Xuất báo cáo thất bại: " + error.message);
      } else {
        alert("Xuất báo cáo thất bại: Đã xảy ra lỗi không xác định");
      }
    } finally {
      setIsLoading(false);
    }
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
