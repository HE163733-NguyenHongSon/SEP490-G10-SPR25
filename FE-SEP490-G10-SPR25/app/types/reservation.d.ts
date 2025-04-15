interface IReservation {
  reservationId: string;
  patient: IPatient;
  appointmentDate: string;
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
  cancellationReason:string;
  createdDate:string;
  createdByUserId:string;
  updatedDate: string;
  updatedByUserId:string;
}
