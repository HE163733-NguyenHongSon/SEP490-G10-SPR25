interface IDoctorSchedule {
  doctorScheduleId: number;
  doctorId: number;
  doctorName: string;
  doctorImage: string;
  serviceId: number;
  serviceName: string;
  servicePrice: string;
  serviceImage: string;
  isPrepayment: boolean;
  dayOfWeek: string;
  roomId: number;
  roomName: string;
  location: string;
  slotId: number;
  slotStartTime: string;
  slotEndTime: string;
}
