interface IReservation {
  reservationId: string;
  patient: IPatient;
  appointmentDate: string;
  doctorSchedule:IDoctorSchedule
  reason: string;
  priorExaminationImg: string;
  status: string;
  cancellationReason:string;
  createdDate:string;
  createdByUserId:string;
  updatedDate: string;
  updatedByUserId:string;
}
