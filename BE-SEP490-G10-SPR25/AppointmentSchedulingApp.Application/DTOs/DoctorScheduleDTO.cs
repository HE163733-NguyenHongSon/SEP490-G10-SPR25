using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class DoctorScheduleDTO
{
    [Key]
    public int DoctorScheduleId { get; set; }

    public int DoctorId { get; set; }
    public string DoctorName { get; set; }
    public string DoctorImage { get; set; }
    public string Degree { get; set; }
    public string? AcademicTitle { get; set; }

    public int ServiceId { get; set; }
    public string ServiceName { get; set; }
    public string ServiceImage { get; set; }
    public string ServicePrice { get; set; }

    public bool? IsPrepayment { get; set; }
    public string DayOfWeek { get; set; } = null!;

    public int RoomId { get; set; }
    public string RoomName { get; set; }
    public string Location { get; set; }

    public int SlotId { get; set; }

    public TimeOnly? SlotStartTime { get; set; }

    public TimeOnly? SlotEndTime { get; set; }
}
