using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Reservation
{
    public int ReservationId { get; set; }

    public int PatientId { get; set; }

    public int DoctorScheduleId { get; set; }

    public string? Reason { get; set; }

    public string? PriorExaminationImg { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public string Status { get; set; } = null!;

    public string? CancellationReason { get; set; }

    public DateTime UpdatedDate { get; set; }

    public virtual DoctorSchedule DoctorSchedule { get; set; } = null!;

    public virtual Feedback Feedback { get; set; } = new Feedback();

    public virtual ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();

    public virtual Patient Patient { get; set; } = null!;
}
