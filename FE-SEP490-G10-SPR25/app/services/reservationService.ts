const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const reservationService = {
  async getListReservationByFilter(
    patientId: string,
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
  async getCancelledReservationsThisMonth(patientId: string): Promise<IStatus> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JS: 0 = Jan

    const response = await fetch(
      `${apiUrl}/odata/Reservations/$count?$filter=` +
        `patient/userId eq ${patientId} and ` +
        `status eq 'Đã hủy' and ` +
        `year(appointmentDate) eq ${year} and ` +
        `month(appointmentDate) eq ${month}`,
      {
        next: { revalidate: 0 }, // Không cache
      }
    );

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

  async updateReservationStatus(rs: IReservationStatus) {
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

  // async deleteReservation(id: number) {
  //   const response = await api.delete(`/Reservation/${id}`);
  //   return response.data;
  // },
};

export default reservationService;
