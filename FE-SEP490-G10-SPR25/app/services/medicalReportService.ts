import { IMedicalReport } from "@/types/medicalReport";
import api from "./api"

export const medicalReportService = {
    async getMedicalReportByPatientId(patientId:number): Promise<IMedicalReport> {
      const res= await api.get(`/api/MedicalReports/${patientId}`);
      return res.data;
    },
  }