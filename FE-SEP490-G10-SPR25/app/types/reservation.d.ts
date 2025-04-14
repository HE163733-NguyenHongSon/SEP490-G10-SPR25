interface IReservation {
  reservationId: string;
  patient: IPatient;
  appointmentDate: string;
  updatedDate: string;
  serviceImage: string;
  serviceName: string;
  servicePrice: string;
  doctorName: string;
  startTime: string;
  endTime: string;
  roomName: string;
  location: string;
  reason: string;
  priorExaminationImg: string;
  status: string;
}
