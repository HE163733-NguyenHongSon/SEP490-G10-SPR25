const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export const doctorService = {
  async getDoctorList(): Promise<IDoctor[]> {
    try {
      console.log(`Fetching doctors from: ${apiUrl}/api/Doctors`);
      const res = await fetch(`${apiUrl}/api/Doctors`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      if (!res.ok) {
        console.error(`Error response: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(`Retrieved ${data.length} doctors from API`);
      return data;
    } catch (error) {
      console.error('Error fetching doctor list:', error);
      return [];
    }
  },
  async getDoctorListByServiceId(serviceId:string | number): Promise<IDoctor[]> {
    try {
      const res = await fetch(`${apiUrl}/api/Doctors/GetDoctorListByServiceId/${serviceId}`)
      if (!res.ok) {
        console.error(`Error response: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(`Retrieved ${data.length} doctors from API`);
      return data;
    } catch (error) {
      console.error('Error fetching doctor list:', error);
      return [];
    }
  },
  async getNumberOfDoctors(): Promise<number> {
    try {
      const url = `${apiUrl}/odata/Doctors/$count`;
      console.log('Fetching doctor count from:', url);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });
      
      if (!res.ok) {
        console.error(`Error response for doctor count: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const count = await res.json();
      console.log(`Retrieved doctor count: ${count}`);
      return count;
    } catch (error) {
      console.error('Error getting number of doctors:', error);
      return 0; // Return 0 instead of throwing error
    }
  },
  
  async getDoctorListByIdListAndSort(
    idList: string,
    sortBy: string
  ): Promise<IDoctor[]> {
    try {
      const sortOptions: Record<string, keyof IDoctor> = {
        most_exam: "numberOfExamination",
        most_service: "numberOfService",
      };
      const doctors = (await this.getDoctorList()).filter((d) =>
        idList.includes((d.userId ?? '').toString())
      );

      const sortKey = sortOptions[sortBy];
      if (sortKey) {
        return doctors.sort(
          (a, b) => (b[sortKey] as number) - (a[sortKey] as number)
        );
      }

      return doctors;
    } catch (error) {
      console.error('Error getting doctor list by ID and sort:', error);
      throw error;
    }
  },

  async getDoctorDetailById(
    doctorId: string | number
  ): Promise<IDoctorDetailDTO> {
    try {
      if (!apiUrl) {
        console.error("API URL is undefined. Check your .env.local file for NEXT_PUBLIC_API_URL");
        throw new Error("API URL is not configured");
      }
      
      console.log(`Fetching doctor detail from: ${apiUrl}/api/Doctors/${doctorId}`);
      const res = await fetch(`${apiUrl}/api/Doctors/${doctorId}`, {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        console.error(`HTTP error! Status: ${res.status}, Details: ${errorText}`);
        throw new Error(`HTTP error! Status: ${res.status}, Details: ${errorText}`);
      }

      const data = await res.json();
      console.log("Doctor detail API response:", JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error(`Error fetching doctor details for doctor ID ${doctorId}:`, error);
      throw error;
    }
  },

  async updateDoctor(doctorId: number, doctorData: IDoctorDetailDTO): Promise<IDoctorDetailDTO> {
    try {
      console.log(`Updating doctor with ID ${doctorId}`);
      
      // Tạo bản sao của dữ liệu để tránh thay đổi object gốc
      const processedData = { ...doctorData };
      
      // Xử lý schedules nếu có
      if (processedData.schedules && processedData.schedules.length > 0) {
        processedData.schedules = processedData.schedules.map((schedule: IDoctorSchedule) => {
          // Chuyển định dạng thời gian thành chuỗi nếu cần
          const scheduleWithStringTimes = { ...schedule };
          if (scheduleWithStringTimes.slotStartTime) {
            scheduleWithStringTimes.slotStartTime = scheduleWithStringTimes.slotStartTime.toString();
          }
          if (scheduleWithStringTimes.slotEndTime) {
            scheduleWithStringTimes.slotEndTime = scheduleWithStringTimes.slotEndTime.toString();
          }
          return scheduleWithStringTimes;
        });
      }
      
      // Prepare data for API
      const apiData = {
        ...processedData,
        userId: typeof processedData.userId === 'string' ? parseInt(processedData.userId) : processedData.userId,
        // Chỉ dùng roleNames đơn giản, không cần Roles object
        roleNames: "Doctor"
      };
      
      // Loại bỏ trường Roles nếu có để tránh xung đột
      if ('Roles' in apiData) {
        delete apiData.Roles;
      }
      
      console.log('Doctor data being sent:', JSON.stringify(apiData, null, 2));
      
      const res = await fetch(`${apiUrl}/api/Doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(apiData)
      });
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        console.error(`Error updating doctor: Status ${res.status}, Details: ${errorText}`);
        throw new Error(`HTTP error! Status: ${res.status}, Details: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error updating doctor with ID ${doctorId}:`, error);
      throw error;
    }
  },

  async deleteDoctor(doctorId: number): Promise<boolean> {
    try {
      console.log(`Deleting doctor with ID ${doctorId}`);
      
      const res = await fetch(`${apiUrl}/api/Doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!res.ok) {
        console.error(`Error deleting doctor: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting doctor with ID ${doctorId}:`, error);
      throw error;
    }
  },

  async getDoctorListByFilterAndSort(
    specialties: string[],
    academicTitles: string[],
    degrees: string[],
    sortBy: string
  ): Promise<IDoctor[]> {
    try {
      const query = [];
      const sortOptions: { [key: string]: string } = {
        hightest_rating: "rating",
        most_exam: "numberOfExamination",
        most_service: "numberOfService",
        academic_title: "academicTitle", 
      };
    
      const orderBy = sortOptions[sortBy] || "rating";
    
      if (specialties.length > 0) {
        query.push(
          `specialtyNames/any(s: ${specialties
            .map((sp) => `s eq '${sp}'`)
            .join(" or ")})`
        );
      }
      if (academicTitles.length > 0) {
        query.push(
          `academicTitle in (${academicTitles.map((a) => `'${a}'`).join(",")})`
        );
      }
      if (degrees.length > 0) {
        query.push(`degree in (${degrees.map((d) => `'${d}'`).join(",")})`);
      }
    
      const apiEndpoint = `${apiUrl}/api/Doctors?${
        query.length > 0 ? `$filter=${query.join(" or ")}&` : ""
      }${sortBy !== "academic_title" ? `$orderby=${orderBy} desc` : ""}`;
      
      const res = await fetch(apiEndpoint);
    
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    
      const data = await res.json();
    
      if (sortBy === "academic_title") {
        const rank = {
          "GS.TS": 1,
          "GS": 2,
          "PGS.TS": 3,
          "PGS": 4,
          "TS": 5,
        };
    
        return data.sort(
          (a: IDoctor, b: IDoctor) =>
            (rank[a.academicTitle as keyof typeof rank] || 99) - (rank[b.academicTitle as keyof typeof rank] || 99)
        );
      }
    
      return data;
    } catch (error) {
      console.error('Error filtering and sorting doctors:', error);
      throw error;
    }
  },

  // New methods for doctors
  async getDoctorAppointments(doctorId: number, status: string = "Xác nhận"): Promise<IReservation[]> {
    try {
      // Properly encode the status parameter
      const encodedStatus = encodeURIComponent(status);
      const url = `${apiUrl}/api/Doctors/${doctorId}/appointments?status=${encodedStatus}`;
      
      console.log(`Fetching doctor appointments from: ${url}`);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      // Get response as text first
      const text = await res.text();
      
      // Log raw response for debugging
      console.log('Raw API response:', text);
      
      if (!res.ok) {
        console.error(`Error response: ${res.status} ${res.statusText}`, text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // If response is empty, return empty array
      if (!text || text.trim() === '') {
        console.log('Empty response received, returning empty array');
        return [];
      }

      // Try to parse as JSON
      try {
        const data = JSON.parse(text);
        console.log(`Successfully parsed JSON, found ${Array.isArray(data) ? data.length : 0} appointments`);
        console.log("Parsed data structure:", JSON.stringify(data, null, 2).substring(0, 500) + "...");
        
        // Check if data is actually an array
        if (!Array.isArray(data)) {
          console.warn("API response is not an array as expected. Actual type:", typeof data);
          // If it's an object with data property, try to extract it
          if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
            console.log("Found data property that is an array, using that instead");
            return data.data;
          }
          return [];
        }
        
        // Check if we have any items and log the structure of the first one
        if (data.length > 0) {
          console.log("First appointment structure:", JSON.stringify(data[0], null, 2));
          
          // Check if patientName is present
          if (data[0].patientName) {
            console.log("PatientName is present:", data[0].patientName);
          } else {
            console.warn("PatientName is missing from API response!");
            
            // Add patientName manually if possible
            data.forEach(appointment => {
              if (appointment.patient && appointment.patient.userName) {
                appointment.patientName = appointment.patient.userName;
                console.log(`Added patientName=${appointment.patientName} for appointment ID=${appointment.reservationId}`);
              }
            });
          }
        }
        
        return data;
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw response:', text);
        return [];
      }
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      return [];
    }
  },

  async cancelAppointment(reservationId: number, cancellationReason: string): Promise<boolean> {
    try {
      console.log(`Cancelling appointment with ID ${reservationId}`);
      
      // Get current user ID for updatedByUserId
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.userId || '';
      
      const cancelData: IReservationStatus = {
        reservationId: reservationId.toString(),
        status: "Hủy",
        cancellationReason: cancellationReason,
        updatedByUserId: userId.toString(),
        updatedDate: new Date().toISOString()
      };
      
      const res = await fetch(`${apiUrl}/api/Doctors/appointments/${reservationId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cancelData)
      });
      
      // Get response as text first
      const text = await res.text();
      
      // Log raw response for debugging
      console.log('Raw API response:', text);
      
      if (!res.ok) {
        console.error(`Error cancelling appointment: ${res.status} ${res.statusText}`, text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      // We don't need to parse the response for cancel operation
      // Just return true for successful operation
      return true;
    } catch (error) {
      console.error(`Error cancelling appointment with ID ${reservationId}:`, error);
      throw error;
    }
  },

  async createMedicalRecord(reservationId: number, medicalRecord: IMedicalRecord): Promise<IMedicalRecord> {
    try {
      console.log(`Creating medical record for reservation ${reservationId}`);
      
      // Sửa API endpoint đúng của DoctorsController
      const url = `${apiUrl}/api/Doctors/appointments/${reservationId}/medicalrecord`;
      
      // Không cần bọc trong đối tượng khác - gửi đúng như định dạng trong controller
      const payload = {
        reservationId: reservationId.toString(), // Đảm bảo là string như trong MedicalRecordDTO
        appointmentDate: medicalRecord.appointmentDate,
        symptoms: medicalRecord.symptoms,
        diagnosis: medicalRecord.diagnosis,
        treatmentPlan: medicalRecord.treatmentPlan,
        followUpDate: medicalRecord.followUpDate,
        notes: medicalRecord.notes
      };
      
      console.log("Medical record data being sent:", JSON.stringify(payload, null, 2));
      
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      // Get response as text first
      const text = await res.text();
      
      // Log raw response for debugging
      console.log('Raw API response:', text);
      
      if (!res.ok) {
        console.error(`Error creating medical record: ${res.status} ${res.statusText}`, text);
        throw new Error(`HTTP error! Status: ${res.status}, Details: ${text}`);
      }
      
      // If response is empty, return the input record
      if (!text || text.trim() === '') {
        console.log('Empty response received, returning input record');
        return medicalRecord;
      }
      
      // Try to parse as JSON
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw response:', text);
        // Return the original record if parsing fails
        return medicalRecord;
      }
    } catch (error) {
      console.error(`Error creating medical record for reservation ${reservationId}:`, error);
      throw error;
    }
  },

  async isFirstTimePatient(patientId: number): Promise<boolean> {
    try {
      console.log(`Checking if patient ${patientId} is first time patient`);
      
      const res = await fetch(`${apiUrl}/api/Doctors/patients/${patientId}/isfirsttime`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Get response as text first
      const text = await res.text();
      
      // Log raw response for debugging
      console.log('Raw API response:', text);
      
      if (!res.ok) {
        console.error(`Error checking first time patient: ${res.status} ${res.statusText}`, text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      // If response is empty, assume it's a first-time patient
      if (!text || text.trim() === '') {
        console.log('Empty response received, assuming first-time patient');
        return true;
      }
      
      // Try to parse as JSON
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw response:', text);
        // Default to true (first-time patient) if parsing fails
        return true;
      }
    } catch (error) {
      console.error(`Error checking if patient ${patientId} is first time patient:`, error);
      // Default to true (first-time patient) if an error occurs
      return true;
    }
  },

  async getPatientMedicalHistory(patientId: number): Promise<IMedicalRecord[]> {
    try {
      console.log(`Fetching medical history for patient ${patientId}`);
      
      const res = await fetch(`${apiUrl}/api/Doctors/patients/${patientId}/medicalrecords`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Get response as text first
      const text = await res.text();
      
      // Log raw response for debugging
      console.log('Raw API response:', text);
      
      if (!res.ok) {
        console.error(`Error fetching patient medical history: ${res.status} ${res.statusText}`, text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      // If response is empty, return empty array
      if (!text || text.trim() === '') {
        console.log('Empty response received, returning empty array');
        return [];
      }
      
      // Try to parse as JSON
      try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw response:', text);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching medical history for patient ${patientId}:`, error);
      return [];
    }
  },

  async getMedicalRecordsByPatientAndDoctorId(doctorId: number, patientId: number): Promise<IMedicalRecord[]> {
    try {
      console.log(`Fetching medical records for patient ${patientId} and doctor ${doctorId}`);
      
      const res = await fetch(`${apiUrl}/api/Doctors/${doctorId}/patients/${patientId}/medicalrecords`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Get response as text first
      const text = await res.text();
      
      // Log raw response for debugging
      console.log('Raw API response:', text);
      
      if (!res.ok) {
        console.error(`Error fetching medical records: ${res.status} ${res.statusText}`, text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      // If response is empty, return empty array
      if (!text || text.trim() === '') {
        console.log('Empty response received, returning empty array');
        return [];
      }
      
      // Try to parse as JSON
      try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw response:', text);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching medical records for patient ${patientId} and doctor ${doctorId}:`, error);
      return [];
    }
  },

  async getAllMedicalRecordsByDoctorId(doctorId: number): Promise<IMedicalRecord[]> {
    try {
      console.log(`Fetching all medical records for doctor ${doctorId}`);
      
      const res = await fetch(`${apiUrl}/api/Doctors/${doctorId}/medicalrecords`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Get response as text first
      const text = await res.text();
      
      // Log raw response for debugging
      console.log('Raw API response:', text);
      
      if (!res.ok) {
        console.error(`Error fetching all medical records: ${res.status} ${res.statusText}`, text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      // If response is empty, return empty array
      if (!text || text.trim() === '') {
        console.log('Empty response received, returning empty array');
        return [];
      }
      
      // Try to parse as JSON
      try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw response:', text);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching all medical records for doctor ${doctorId}:`, error);
      return [];
    }
  },

  async getDiagnostics(doctorId: number): Promise<any> {
    try {
      console.log(`Getting diagnostics for doctor ${doctorId}`);
      
      const res = await fetch(`${apiUrl}/api/Doctors/${doctorId}/diagnostics`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Get response as text first
      const text = await res.text();
      
      // Log raw response for debugging
      console.log('Raw diagnostics API response:', text);
      
      if (!res.ok) {
        console.error(`Error getting diagnostics: ${res.status} ${res.statusText}`, text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      // If response is empty, return empty object
      if (!text || text.trim() === '') {
        console.log('Empty response received, returning empty object');
        return {};
      }
      
      // Try to parse as JSON
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw response:', text);
        return {};
      }
    } catch (error) {
      console.error(`Error getting diagnostics for doctor ${doctorId}:`, error);
      return {};
    }
  }
};
