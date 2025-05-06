const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const doctorScheduleService = {
  async getDoctorScheduleList(): Promise<IDoctorSchedule[]> {
    try {
      const url = `${apiUrl}/api/DoctorSchedules`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });


      if (!res.ok) {
        console.error(
          `Error response for DoctorSchedules list: ${res.statusText}`
        );
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching DoctorSchedules list:", error);
      return []; // Return empty array instead of throwing
    }
  },

  async getAvailableSchedulesByServiceIdAndPatientId(
    serviceId: string | number,
    patientId?: string | number
  ): Promise<IAvailableSchedule[]> {    
    try {
      const res = await fetch(`${apiUrl}/api/DoctorSchedules/GetAvailableSchedulesByServiceIdAndPatientId/${serviceId}/${patientId}`);

      if (!res.ok) {
        console.error("Gợi ý thất bại:", await res.text());
        return [];
      }

      const result = await res.json();
    
      return result;
    } catch (error) {
      console.error(
        `Error fetching available schedule list for service ${serviceId}:`,
        error
      );
      return [];
    }
  },

  async getDoctorScheduleDetailById(
    doctorScheduleId?: string | number
  ): Promise<IDoctorSchedule> {
    try {
      const url = `${apiUrl}/api/DoctorSchedules/GetDoctorScheduleDetailById/${doctorScheduleId}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });


      if (!res.ok) {
        console.error(
          `Error response for DoctorSchedule detail: ${res.statusText}`
        );
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
   
      return data;
    } catch (error) {
     
      throw error; // We might need to throw here as the UI likely needs this data
    }
  },
  async updateDoctorSchedule(updateData: {
    doctorScheduleId: number;
    doctorId: number;
    serviceId: number;
    dayOfWeek: string;
    roomId: number;
    slotId: number;
  }): Promise<IDoctorSchedule> {
    try {
      const url = `${apiUrl}/api/DoctorSchedules`;

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
        cache: "no-store",
      });


      if (!res.ok) {
        const errorResponse = await res.json();
        console.error(`Error response details:`, errorResponse);
        throw new Error(
          `HTTP error! Status: ${res.status}, Message: ${
            errorResponse.message || "Unknown error"
          }`
        );
      }

      const data = await res.json();
      
      return data;
    } catch (error) {
     
      throw error;
    }
  },
  async createDoctorSchedule(newData: {
    doctorId: number;
    serviceId: number;
    dayOfWeek: string;
    roomId: number;
    slotId: number;
  }): Promise<IDoctorSchedule> {
    try {
      const url = `${apiUrl}/api/DoctorSchedules`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
        cache: "no-store",
      });


      if (!res.ok) {
        const errorResponse = await res.json();
        console.error(`Error response details:`, errorResponse);
        throw new Error(
          `HTTP error! Status: ${res.status}, Message: ${
            errorResponse.message || "Unknown error"
          }`
        );
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error creating new DoctorSchedule:`, error);
      throw error;
    }
  },
  async filterDoctorSchedules(filterParams: {
    doctorName?: string;
    serviceId?: number;
    day?: string;
    roomId?: number;
    slotId?: number;
  }): Promise<IDoctorSchedule[]> {
    try {
      const queryParams = new URLSearchParams();

      if (filterParams.doctorName?.trim()) {
        queryParams.append("doctorName", filterParams.doctorName.trim());
      }
      if (filterParams.serviceId !== undefined) {
        queryParams.append("serviceId", filterParams.serviceId.toString());
      }
      if (filterParams.day) {
        queryParams.append("day", filterParams.day);
      }
      if (filterParams.roomId !== undefined) {
        queryParams.append("roomId", filterParams.roomId.toString());
      }
      if (filterParams.slotId !== undefined) {
        queryParams.append("slotId", filterParams.slotId.toString());
      }

      const url = `${apiUrl}/api/DoctorSchedules/filter&search?${queryParams.toString()}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API error response text:", text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const text = await res.text();
      if (!text) {
        console.warn("Empty response body received.");
        return [];
      }

      const data = JSON.parse(text);
      return data;
    } catch (error) {
      console.error("Error fetching filtered DoctorSchedules:", error);
      throw error;
    }
  },
};
