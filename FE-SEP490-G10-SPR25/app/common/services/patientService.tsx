
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const patientService = {
  async getNumberOfExaminedPatients(): Promise<number> {
    try {
      const url = `${apiUrl}/api/Reservations?$filter=status eq 'Hoàn thành'`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });


      if (!res.ok) {
        console.error(`Error response for examined patients: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data: IReservation[] = await res.json();
      const uniquePatients = new Set(data.map((r: IReservation) => r.patient.userId));

      return uniquePatients.size;
    } catch (error) {
      console.error('Error getting number of examined patients:', error);
      return 0; // Return 0 instead of throwing error
    }
  },
  addPatient: async (patientData: IAddedPatient): Promise<IPatient | null> => {
    try {
      const response = await fetch(`${apiUrl}/api/Patients/AddPatient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        console.error("Lỗi khi thêm bệnh nhân:", await response.text());
        return null;
      }

      const data: IPatient = await response.json();
      return data;
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return null;
    }
  },

  async getPatientList(): Promise<IPatient[]> {
    try {
      const url = `${apiUrl}/api/Patients`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });


      if (!res.ok) {
        console.error(`Error response for patient list: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching patient list:', error);
      return []; // Return empty array instead of throwing
    }
  },

  async getPatientDetailById(patientId?: string | number): Promise<IPatientDetail> {
    try {
      const url = `${apiUrl}/api/Patients/${patientId}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });


      if (!res.ok) {
        console.error(`Error response for patient detail: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching patient details for ID ${patientId}:`, error);
      throw error; // We might need to throw here as the UI likely needs this data
    }
  },

  async getPatientListBySearch(field: string, value: string): Promise<IPatient[]> {
    try {
      // const encodedValue = encodeURIComponent(value.trim());
      // const url = `${apiUrl}/api/Patients?$filter=contains(tolower(${field}), '${encodedValue}')`;
      const cleanedValue = value.trim().replace(/\s+/g, ' '); // loại bỏ thừa khoảng trắng
      const encodedValue = encodeURIComponent(cleanedValue);

      const url = `${apiUrl}/api/Patients?$filter=contains(tolower(${field}), tolower('${encodedValue}'))`;


      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });


      if (!res.ok) {
        console.error(`Error response for patient search: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error searching patients:`, error);
      return []; // Return empty array instead of throwing
    }
  },

  // Update bằng user
  async updatePatientContact(updatedData: IUser): Promise<void> {
    try {
      const url = `${apiUrl}/api/Patients/UpdatePatientInformationByReceptionist`;

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(updatedData),
      });


      if (!res.ok) {
        console.error(`Error response for update patient contact: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

    } catch (error) {
      console.error(`Error updating patient contact:`, error);
      throw error; // Rethrow as caller needs to know if update failed
    }
  },

  // Update bằng patient
  async updateGuardianOfPatient(data: {
    patientId: number;
    guardianId: number;
  }): Promise<void> {
    try {
      const url = `${apiUrl}/api/Patients/UpdateGuardianOfPatientByReceptionist`;

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          patientId: data.patientId,
          guardianId: data.guardianId
        })
      });


      if (!res.ok) {
        console.error(`Error response for update guardian: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

    } catch (error) {
      console.error(`Error updating patient guardian:`, error);
      throw error; // Rethrow as caller needs to know if update failed
    }
  }
};
