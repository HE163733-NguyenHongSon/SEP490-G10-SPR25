  import api from "./api"
  import { MedicalRecord } from "../types/medicalRecord"


 export const medicalRecordService = {
   async getMedicalRecordList(): Promise<MedicalRecord[]> {
     const res= await api.get('/api/MedicalRecords');
     return res.data;
   },
 }