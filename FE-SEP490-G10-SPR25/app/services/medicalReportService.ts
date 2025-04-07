  import api from "./api"

export const medicalReportService = {
    async getMedicalReportByPatientId(): Promise<IMedicalRecord[]> {
      const res= await api.get('/api/MedicalRecords');
      return res.data;
    },
  }