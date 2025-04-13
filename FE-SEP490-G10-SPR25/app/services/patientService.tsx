const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log('Patient API URL base:', apiUrl);

export const patientService = {
  async getNumberOfExaminedPatients(): Promise<number> {
    try {
      const url = `${apiUrl}/api/Reservations?$filter=status eq 'Hoàn thành'`;
      console.log('Fetching examined patients from:', url);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      console.log('Examined patients response status:', res.status);
      
      if (!res.ok) {
        console.error(`Error response for examined patients: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    
      const data: IReservation[] = await res.json();
      const uniquePatients = new Set(data.map((r: IReservation) => r.patientId));
      console.log(`Found ${uniquePatients.size} unique examined patients`);
    
      return uniquePatients.size;
    } catch (error) {
      console.error('Error getting number of examined patients:', error);
      return 0; // Return 0 instead of throwing error
    }
  },
  
  async getPatientList(): Promise<IPatient[]> {
    try {
      const url = `${apiUrl}/api/Patients`;
      console.log('Fetching patient list from:', url);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      console.log('Patient list response status:', res.status);
      
      if (!res.ok) {
        console.error(`Error response for patient list: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(`Retrieved ${data.length} patients`);
      return data;
    } catch (error) {
      console.error('Error fetching patient list:', error);
      return []; // Return empty array instead of throwing
    }
  },

  async getPatientDetailById(patientId: string | number): Promise<IPatientDetail> {
    try {
      const url = `${apiUrl}/api/Patients/${patientId}`;
      console.log(`Fetching patient detail from: ${url}`);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      console.log(`Patient detail response status: ${res.status}`);
      
      if (!res.ok) {
        console.error(`Error response for patient detail: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(`Retrieved details for patient ID: ${patientId}`);
      return data;
    } catch (error) {
      console.error(`Error fetching patient details for ID ${patientId}:`, error);
      throw error; // We might need to throw here as the UI likely needs this data
    }
  },
  
  async getPatientListBySearch(field: string, value: string): Promise<IPatient[]> {
    try {
      const encodedValue = encodeURIComponent(value.trim());
      const url = `${apiUrl}/api/Patients?$filter=contains(tolower(${field}), '${encodedValue}')`;
      console.log(`Searching patients with ${field}='${encodedValue}' from: ${url}`);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
  
      console.log('Patient search response status:', res.status);
      
      if (!res.ok) {
        console.error(`Error response for patient search: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(`Found ${data.length} patients matching search criteria`);
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
      console.log("Updating patient contact at:", url);
      console.log("Updated data:", JSON.stringify(updatedData));
      
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(updatedData),
      });
 
      console.log('Update patient contact response status:', res.status);
      
      if (!res.ok) {
        console.error(`Error response for update patient contact: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      console.log("Patient contact updated successfully");
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
      console.log("Updating patient guardian at:", url);
      console.log("Guardian update data:", JSON.stringify(data));
      
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
  
      console.log('Update guardian response status:', res.status);
      
      if (!res.ok) {
        console.error(`Error response for update guardian: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      console.log("Patient guardian updated successfully");
    } catch (error) {
      console.error(`Error updating patient guardian:`, error);
      throw error; // Rethrow as caller needs to know if update failed
    }
  }
};
