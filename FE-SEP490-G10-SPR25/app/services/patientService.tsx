export const patientService = {
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
  },
  
  // update bang user
  async updatePatientContact(updatedData: IUser): Promise<void> {
    try {
      console.log("Updated data:",  JSON.stringify(updatedData)); // Log the updated data
      const res = await fetch("http://localhost:5220/api/Patients/UpdatePatientInformationByReceptionist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
 
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to update patient contact: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
  

  // update bang patient
  async updateGuardianOfPatient(data: {
    patientId: number;
    guardianId: number;
  }): Promise<void> {
    try {
      const res = await fetch("http://localhost:5220/api/Patients/UpdateGuardianOfPatientByReceptionist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: data.patientId,
          guardianId: data.guardianId
        })
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to update patient contact: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
  
  

};
