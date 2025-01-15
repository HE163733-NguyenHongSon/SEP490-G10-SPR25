using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Models;

public partial class Reservation
{
    public int ReservationId { get; set; }

    public int PatientId { get; set; }

    public int ServiceId { get; set; }

    public int DoctorScheduleId { get; set; }

    public string? Reason { get; set; }

    public string? PriorExaminationImg { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public string Status { get; set; } = null!;

    public virtual DoctorSchedule DoctorSchedule { get; set; } = null!;

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual Patient Patient { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;
}
