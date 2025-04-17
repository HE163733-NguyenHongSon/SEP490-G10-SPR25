interface IDoctorSchedule {
  doctorScheduleId: number;
  doctorId: number;
  doctorName: string;
  doctorImage: string;
  serviceId: number;
  serviceName: string;
  servicePrice: string;
  serviceImage: string;
  dayOfWeek: string;
  roomId: number;
  roomName: string;
  slotId: number;
  slotStartTime: string;
  slotEndTime: string;
}
