 interface IMedicalRecord {
  reservationId: number;
    appointmentDate: string;
    symptoms: string;
    diagnosis: string;
    treatmentPlan: string;
    followUpDate?: string;  
    notes?: string;  
  }