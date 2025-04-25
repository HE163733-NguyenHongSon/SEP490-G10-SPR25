interface IAvailableDate {
  date: string;
  times: TimeSlot[];
}
interface TimeSlot {
  slotId: string;
  slotStartTime: string;
  slotEndTime: string;
}
