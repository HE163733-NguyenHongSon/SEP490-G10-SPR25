 interface Reservation {
    reservationId: string;
    serviceImage: string;
    serviceName: string;
    servicePrice: string;
    doctorName: string;
    appointmentDate: string;
    slotStartTime: string;
    slotEndTime: string;
    roomName: string;
    reason: string;
    updatedDate: string;
    status: "Pending" | "Confirmed" | "Completed" | "No-show" | "Canceled";
  }