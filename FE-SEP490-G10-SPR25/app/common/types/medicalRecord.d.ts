interface IMedicalRecord {
  reservationId: string;
  appointmentDate: string;
  symptoms?: string;
  diagnosis?: string;
  treatmentPlan?: string;
  followUpDate?: string;  
  notes?: string;  
  patientName?: string;
  patientId?: number;
  patientGender?: string;
  patientDob?: string;
  patientAge?: number;
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