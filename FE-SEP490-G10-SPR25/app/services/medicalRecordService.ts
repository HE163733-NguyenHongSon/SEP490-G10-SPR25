  import api from "./api"


 export const medicalRecordService = {
   async getMedicalRecordList(): Promise<IMedicalRecord[]> {
     const res= await api.get('/api/MedicalRecords');
     return res.data;
   },

   async getAllMedicalRecordByPatientId(patientId: string | number): Promise<IMedicalRecord[]> {
    const res = await fetch(`http://localhost:5220/api/MedicalRecords/GetAllMedicalRecordByPatientId/${patientId}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  }

 }