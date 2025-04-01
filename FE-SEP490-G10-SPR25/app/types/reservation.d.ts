 interface IReservation {
    reservationId: string;
    serviceImage: string;
    serviceName: string;
    servicePrice: string;
    doctorName: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    roomName: string;
    reason: string;
    updatedDate: string;
    status: "Pending" | "Confirmed" | "Completed" | "No-show" | "Canceled";
  }