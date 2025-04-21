
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const doctorScheduleService = {
 
  // async getDoctorScheduleList(): Promise<IDoctorSchedule[]> {
  //   try {      
  //     const url = `${apiUrl}/api/DoctorSchedules`;
  //     console.log('Fetching DoctorSchedules list from:', url);
      
  //     const res = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       cache: 'no-store'
  //     });

  //     console.log('DoctorSchedules list response status:', res.status);
      
  //     if (!res.ok) {
  //       console.error(`Error response for DoctorSchedules list: ${res.statusText}`);
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }
  
  //     const data = await res.json();
  //     console.log(`Retrieved ${data.length} DoctorSchedules`);
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching DoctorSchedules list:', error);
  //     return []; // Return empty array instead of throwing
  //   }
  // },

  async getDoctorScheduleList(doctorId: string): Promise<IDoctorSchedule[]> {
    try {      
      const res = await fetch(`${apiUrl}/api/DoctorSchedules`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        console.error(`Error response: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(`Retrieved ${data.length} schedules for doctor ${doctorId}`);
      return data;
    } catch (error) {
      console.error(
        `Error fetching schedule list for doctor ${doctorId}:`,
        error
      );
      return [];
    }
  },
  

  async getDoctorScheduleDetailById(doctorScheduleId?: string | number  ): Promise<IDoctorSchedule> {
    try {
      const url = `${apiUrl}/api/DoctorSchedules/GetDoctorScheduleDetailById/${doctorScheduleId}`;
      console.log(`Fetching DoctorSchedule detail from: ${url}`);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      console.log(`DoctorSchedule detail response status: ${res.status}`);
      
      if (!res.ok) {
        console.error(`Error response for DoctorSchedule detail: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(`Retrieved details for DoctorSchedule ID: ${doctorScheduleId}`);
      return data;
    } catch (error) {
      console.error(`Error fetching DoctorSchedule details for ID ${doctorScheduleId}:`, error);
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
      console.log(`Updating DoctorSchedule at: ${url}`);
      
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData),
        cache: 'no-store'
      });
  
      console.log(`Update response status: ${res.status}`);
  
      if (!res.ok) {
        const errorResponse = await res.json();
        console.error(`Error response details:`, errorResponse);
        throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorResponse.message || 'Unknown error'}`);
      }
  
      const data = await res.json();
      console.log(`Successfully updated DoctorSchedule ID: ${updateData.doctorScheduleId}`);
      return data;
      
    } catch (error) {
      console.error(`Error updating DoctorSchedule ID ${updateData.doctorScheduleId}:`, error);
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
      console.log(`Creating new DoctorSchedule at: ${url}`);
  
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
        cache: 'no-store'
      });
  
      console.log(`Create response status: ${res.status}`);
  
      if (!res.ok) {
        const errorResponse = await res.json();
        console.error(`Error response details:`, errorResponse);
        throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorResponse.message || 'Unknown error'}`);
      }
  
      const data = await res.json();
      console.log(`Successfully created new DoctorSchedule`);
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
        queryParams.append('doctorName', filterParams.doctorName.trim());
      }
      if (filterParams.serviceId !== undefined) {
        queryParams.append('serviceId', filterParams.serviceId.toString());
      }
      if (filterParams.day) {
        queryParams.append('day', filterParams.day);
      }
      if (filterParams.roomId !== undefined) {
        queryParams.append('roomId', filterParams.roomId.toString());
      }
      if (filterParams.slotId !== undefined) {
        queryParams.append('slotId', filterParams.slotId.toString());
      }
  
      const url = `${apiUrl}/api/DoctorSchedules/filter&search?${queryParams.toString()}`;
      console.log(`Fetching filtered DoctorSchedules from: ${url}`);
  
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });
  
      if (!res.ok) {
        const text = await res.text();
        console.error('API error response text:', text);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const text = await res.text();
      if (!text) {
        console.warn('Empty response body received.');
      return [];
    }
  
      const data = JSON.parse(text);
      console.log('Successfully fetched filtered DoctorSchedules.');
      return data;
    } catch (error) {
      console.error('Error fetching filtered DoctorSchedules:', error);
      throw error;
    }
  }
  
  


}