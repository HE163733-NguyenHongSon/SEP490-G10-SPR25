import API from "./API";

// interface Reservation {
//   reservationId: number;
//   status: string;
// }
interface Status{
  name:string;
  count:number;
}

const ReservationService = {
  async getListReservationByStatusAndSort(status:string, sortBy:string) {
    const response = await API.get(`/api/Reservations/${status}/${sortBy}`);
    return  response.data;
  },
  
  async getReservationCountByStatus(status: string): Promise<Status> {
    const response = await API.get(`/odata/Reservations/$count?$filter=status eq '${status}'`);
    return { name: status, count: response.data };
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
