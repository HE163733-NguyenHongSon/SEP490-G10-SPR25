const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const medicalRecordService = {
  async getMedicalRecordList(): Promise<IMedicalRecord[]> {
    const res = await fetch(`${apiUrl}/api/MedicalRecords`);
    return res.json();
  },

  async getAllMedicalRecordByPatientId(
    patientId: string | number
  ): Promise<IMedicalRecord[]> {
    const res = await fetch(
      `${apiUrl}/api/MedicalRecords/GetAllMedicalRecordByPatientId/${patientId}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },
  async getMedicalRecordDetailById(
    Id: string | number
  ): Promise<IMedicalRecordDetail> {
    const res = await fetch(`${apiUrl}/api/MedicalRecords/${Id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },

  async createMedicalRecord(medicalRecord: IMedicalRecordCreate): Promise<IMedicalRecord> {
    try {
      
      // Make sure reservationId is a string for the API
      const reservationId = medicalRecord.reservationId;
      const payload = {
        reservationId: medicalRecord.reservationId.toString(),
        symptoms: medicalRecord.symptoms,
        diagnosis: medicalRecord.diagnosis,
        treatmentPlan: medicalRecord.treatmentPlan,
        followUpDate: medicalRecord.followUpDate,
        notes: medicalRecord.notes
      };
      
      const res = await fetch(`${apiUrl}/api/Doctors/appointments/${reservationId}/medicalrecord`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      // Get response as text for error checking
      const text = await res.text();
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}, Details: ${text}`);
      }
      
      if (!text || text.trim() === '') {
        return {
          reservationId: medicalRecord.reservationId.toString(),
          appointmentDate: new Date().toISOString(),
          symptoms: medicalRecord.symptoms,
          diagnosis: medicalRecord.diagnosis,
          treatmentPlan: medicalRecord.treatmentPlan,
          followUpDate: medicalRecord.followUpDate,
          notes: medicalRecord.notes
        };
      }
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw response:', text);
        throw new Error('Failed to parse API response as JSON');
      }
    } catch (error) {
      console.error('Error creating medical record:', error);
      throw error;
    }
  }
};
