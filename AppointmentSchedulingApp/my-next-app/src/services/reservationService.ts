import api from "./api";
import {Status} from "../types"


const reservationService = {
  async getListReservationByStatusAndSort(status:string, sortBy:string) {
    const response = await api.get(`/api/Reservations/${status}/${sortBy}`);
    return  response.data;
  },
  
  async getReservationCountByStatus(status: string): Promise<Status> {
    const response = await api.get(`/odata/Reservations/$count?$filter=status eq '${status}'`);
    return { name: status, count: response.data };
  },
  

  async getReservationById(id: string) {
    const response = await api.get(`/Reservation/${id}`);
    return response.data;
  },

  async createReservation(data: string) {
    const response = await api.post("/Reservation", data);
    return response.data;
  },

  async updateReservation(id: number, status: string) {
    const response = await api.put(`/Reservation/${id}`, status);
    return response.data;
  },

  async deleteReservation(id: number) {
    const response = await api.delete(`/Reservation/${id}`);
    return response.data;
  },
};

export default reservationService;
