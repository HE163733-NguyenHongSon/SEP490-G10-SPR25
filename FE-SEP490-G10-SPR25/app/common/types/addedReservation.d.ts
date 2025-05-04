interface IAddedReservation {
  patientId?: string;
  doctorScheduleId?: string;
  reason: string;
  // priorExaminationImg: string;
  appointmentDate?: string;
  createdByUserId?: string;
  updatedByUserId?: string;
}
