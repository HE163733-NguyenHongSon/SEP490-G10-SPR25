interface IReservation {
  reservationId: string;
  patient: IPatient;
  patientId?:string;
  appointmentDate: string;
  doctorSchedule:IDoctorSchedule
  doctorScheduleId:string;
  reason: string;
  priorExaminationImg: File | null | string;
  status: string;
  cancellationReason:string;
  createdDate:string;
  createdByUserId:string;
  updatedDate: string;
  updatedByUserId:string;
}
