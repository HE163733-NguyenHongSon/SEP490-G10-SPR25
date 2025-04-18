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
        idList.includes(d.userId.toString())
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
      
      console.log(`Fetching filtered doctors from: ${apiEndpoint}`);
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
  }
};
