const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const patientService = {
  async getNumberOfExaminedPatients(): Promise<number> {
    const res = await fetch(`${apiUrl}/api/Reservations?$filter=status eq 'Hoàn thành'`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  
    const data: IReservation[] = await res.json();
    const uniquePatients = new Set(data.map((r: IReservation) => r.patientId));
  
    return uniquePatients.size;
  },
  
  
  

  async getPatientList(): Promise<IPatient[]> {
    const res = await fetch(
      "http://localhost:5220/api/Patients"
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },


  async getPatientDetailById(patientId: string | number): Promise<IPatientDetail> {
    const res = await fetch(`http://localhost:5220/api/Patients/${patientId}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },
  

  async getPatientListBySearch(field: string, value: string): Promise<IPatient[]> {
    try {
      const encodedValue = encodeURIComponent(value.trim());
      const res = await fetch(`http://localhost:5220/api/Patients?$filter=contains(tolower(${field}), '${encodedValue}')`);
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      return await res.json();
    } catch (error) {
      throw new Error(
        `Failed to search patients: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
  

};
