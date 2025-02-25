  import api from "./api"


 export const medicalRecordService = {
   async getMedicalRecordList(): Promise<IMedicalRecord[]> {
     const res= await api.get('/api/MedicalRecords');
     return res.data;
   },
 }