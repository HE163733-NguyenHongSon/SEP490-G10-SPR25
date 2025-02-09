 interface IMedicalRecord {
    medicalRecordId: number;
    appointmentDate: string;
    symptoms: string;
    diagnosis: string;
    treatmentPlan: string;
    followUpDate?: string;  
    notes?: string;  
  }
  type IMedicalRecords=IMedicalRecord[]