interface IMedicalRecord {
  reservationId: string;
  appointmentDate: string;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  followUpDate?: string;  
  notes?: string;  
}

interface IMedicalRecordCreate {
  reservationId: number;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  followUpDate?: string;  
  notes?: string;  
}