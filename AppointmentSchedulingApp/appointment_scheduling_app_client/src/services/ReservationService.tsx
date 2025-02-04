import API from "./API";

interface Reservation {
  reservationId: number;
  status: string;
}

const ReservationService = {
  async getAllReservations() {
    const response = await API.get("/Reservation/ReservationList/All");
    return response.data;
  },

  async getReservationById(id: string) {
    const response = await API.get(`/Reservation/${id}`);
    return response.data;
  },

  async createReservation(data: string) {
    const response = await API.post("/Reservation", data);
    return response.data;
  },

  async updateReservation(id: number, status: string) {
    const response = await API.put(`/Reservation/${id}`, status);
    return response.data;
  },

  async deleteReservation(id: number) {
    const response = await API.delete(`/Reservation/${id}`);
    return response.data;
  },
};

export default ReservationService;
