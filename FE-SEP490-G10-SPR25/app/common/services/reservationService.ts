const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL!;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const reservationService = {
  async getListReservationByFilter(
    patientId: string | undefined,
    status: string,
    sortBy: string
  ) {
    const response = await fetch(
      `${apiUrl}/api/Reservations/${patientId}/${status}/${sortBy}`
    );
    return response.json();
  },

  async getNumberOfReservationsByPatientIdAndStatus(
    patientId: string,
    status: string
  ): Promise<IStatus> {
    const response = await fetch(
      `${apiUrl}/odata/Reservations/$count?$filter=patient/userId eq ${patientId} and status eq '${status}'`
    );

    const data = await response.json();
    return { name: status, count: data };
  },
  async getCancelCountThisMonth (
    patientId?: string
  ): Promise<IStatus> {
    const now = new Date();    
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JS: 0 = Jan
    const url =
      `${apiUrl}/odata/Reservations/$count?$filter=` +
      `patient/userId eq ${patientId} and ` +
      `status eq 'Đã hủy' and ` +
      `year(createdDate) eq ${year} and ` +
      `month(createdDate) eq ${month}`;
    console.log(url);
    const response = await fetch(url, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reservation count");
    }

    const data = await response.text();
    return { name: "Đã hủy trong tháng", count: Number(data) };
  },
  // async getReservationById(id: string) {
  //   const response = await api.get(`/Reservation/${id}`);
  //   return response.data;
  // },

  // async createReservation(data: string) {
  //   const response = await api.post("/Reservation", data);
  //   return response.data;
  // },

  async getBookingSuggestion(
    symptoms: string
  ): Promise<IBookingSuggestion | null> {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
        }),
      });
    
      if (!res.ok) {
        console.error("Gợi ý thất bại:", await res.text());
        return null;
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error fetching booking suggestion:", error);
      return null;
    }
  },
  async addReservation(reservation: IAddedReservation) {
    try {
      const formData = new FormData();

      if (reservation.patientId) {
        formData.append("PatientId", reservation.patientId);
      }
      if (reservation.doctorScheduleId) {
        formData.append("DoctorScheduleId", reservation.doctorScheduleId);
      }
      formData.append("Reason", reservation.reason);
      if (reservation.appointmentDate) {
        formData.append("AppointmentDate", reservation.appointmentDate);
      }
      if (reservation.createdByUserId) {
        formData.append("CreatedByUserId", reservation.createdByUserId);
      }
      if (reservation.updatedByUserId) {
        formData.append("UpdatedByUserId", reservation.updatedByUserId);
      }

      // Nếu có ảnh khám trước thì gửi kèm
      if (reservation.priorExaminationImg) {
        formData.append("PriorExaminationImg", reservation.priorExaminationImg);
      }

      const res = await fetch(`${apiUrl}/api/Reservations/AddReservation`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Thêm lịch hẹn thất bại:", await res.text());
        return null;
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error add booking:", error);
      return null;
    }
  },

  async updateReservationStatus(rs: IReservationStatus) {
    console.log(rs);
    const response = await fetch(
      `${apiUrl}/api/Reservations/UpdateReservationStatus`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rs),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update reservation status");
    }

    const data = await response.json();

    return data;
  },
};

export default reservationService;
