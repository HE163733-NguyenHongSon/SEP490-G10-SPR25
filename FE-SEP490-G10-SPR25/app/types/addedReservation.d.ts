interface IAddedReservation {
  patientId?: string;
  doctorScheduleId?: string;
  reason: string;
  priorExaminationImg: File | null;
  appointmentDate?: string;
  createdByUserId?: string;
  updatedByUserId?: string;
}
