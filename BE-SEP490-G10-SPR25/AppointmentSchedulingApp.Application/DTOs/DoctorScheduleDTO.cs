﻿public class DoctorScheduleDTO
{
    public int DoctorScheduleId { get; set; }

    public int DoctorId { get; set; }
    public string DoctorName { get; set; }

    public int ServiceId { get; set; }
    public string ServiceName { get; set; } 

    public string DayOfWeek { get; set; } = null!;

    public int RoomId { get; set; }
    public string  RoomName { get; set; }

    public int SlotId { get; set; }

    public TimeOnly SlotStartTime { get; set; }

    public TimeOnly SlotEndTime { get; set; }
}
