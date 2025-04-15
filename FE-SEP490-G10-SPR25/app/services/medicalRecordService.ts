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
};
