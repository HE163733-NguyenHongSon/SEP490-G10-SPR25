const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
};
