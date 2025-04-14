import api from "./api"

export const medicalReportService = {
    async getMedicalReportByPatientId(patientId?:string): Promise<IMedicalReport> {
      const res= await api.get(`/api/MedicalReports/${patientId}`);
      return res.data;
    },
  }