import api from "./api";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const medicalReportService = {
  async getMedicalReportByPatientId(
    patientId?: string
  ): Promise<IMedicalReport> {
    const res = await api.get(`/api/MedicalReports/${patientId}`);
    return res.data;
  },
  async fetchAndDownloadMedicalReport(patientId?: string) {
    try {
      const response = await fetch(
        `${apiUrl}/api/MedicalReports/ExportPdf/${patientId}`
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        alert("Xuất báo cáo thất bại: " + (errorMessage || "Không rõ lỗi"));
        return; // Không tiếp tục nữa
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
      console.error("Error fetching medical report:", error);
      alert(
        "Xuất báo cáo thất bại: " +
          (error instanceof Error
            ? error.message
            : "Đã xảy ra lỗi không xác định")
      );
    }
  },
};
