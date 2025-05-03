interface IMedicalRecord {
  reservationId: string;
  appointmentDate: string;
  symptoms?: string;
  diagnosis?: string;
  treatmentPlan?: string;
  followUpDate?: string;  
  notes?: string;  
  reservation?: {
    patient?: {
      userId?: number;
      patientId?: number;
      userName?: string;
      firstname?: string;
      lastname?: string;
    }
  };
}

interface IMedicalRecordCreate {
  reservationId: number;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  followUpDate?: string;  
  notes?: string;  
}