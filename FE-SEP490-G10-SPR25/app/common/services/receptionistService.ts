const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IReservation {
  reservationId: number;
  patient?: {
    userId?: number;
    userName?: string;
    email?: string;
  };
  doctor?: {
    userId?: number;
    userName?: string;
  };
  doctorSchedule?: {
    slotStartTime?: string;
    slotEndTime?: string;
  };
  appointmentDate: string | Date;
  status: string;
  reason?: string;
}

export const receptionistService = {
  async getPatientList(): Promise<any[]> {
    const res = await fetch(
      `${apiUrl}/api/Patients`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },

  async getPatientDetailById(patientId: string | number): Promise<any> {
    const res = await fetch(`${apiUrl}/api/Patients/${patientId}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },
  
  async getTodayAppointments(): Promise<IReservation[]> {
    try {
      // Get today's date in YYYY-MM-DD format for API filtering
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      
      // Fetch all appointments for today
      const res = await fetch(
        `${apiUrl}/api/Reservations?$filter=appointmentDate eq ${formattedDate}`,
        {
          next: { revalidate: 0 }, // Disable caching
        }
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error("Error fetching today's appointments:", error);
      return []; // Return empty array on error
    }
  },
  
  async getAppointmentsByStatus(status: string): Promise<IReservation[]> {
    try {
      const res = await fetch(
        `${apiUrl}/api/Reservations?$filter=status eq '${status}'`,
        {
          next: { revalidate: 0 },
        }
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error fetching appointments with status ${status}:`, error);
      return [];
    }
  },
  
  async getDashboardStats(): Promise<{
    todayAppointmentsCount: number;
    newPatientsCount: number;
    pendingAppointmentsCount: number;
  }> {
    try {
      // In a real implementation, you might call multiple endpoints
      // or have a dedicated dashboard stats endpoint
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      
      const todayAppts = await this.getTodayAppointments();
      const pendingAppts = await this.getAppointmentsByStatus('Chờ xác nhận');
      
      // For new patients, you'd need an actual API endpoint
      // This is just a placeholder
      const newPatientsCount = 0;
      
      return {
        todayAppointmentsCount: todayAppts.length,
        newPatientsCount,
        pendingAppointmentsCount: pendingAppts.length
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      return {
        todayAppointmentsCount: 0,
        newPatientsCount: 0,
        pendingAppointmentsCount: 0
      };
    }
  }
};
