const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL!;
export const doctorScheduleService = {
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
  async getAvailableSchedulesByServiceId(serviceId: string |number): Promise<IAvailableSchedules[]> {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
        }),
      });
      
      if (!res.ok) {
        console.error("Gợi ý thất bại:", await res.text());
        return [];
      }
      
      const result = await res.json();
      console.log(`Retrieved ${result} available schedules for service ${serviceId}`);
      return result;
    } catch (error) {
      console.error(
        `Error fetching available schedule list for service ${serviceId}:`,
        error
      );
      return [];
    }
  },
  
};
