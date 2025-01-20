using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Models;

public partial class MedicalRecord
{
    public int MedicalRecordId { get; set; }

    public int ReservationId { get; set; }

    public string? Symptoms { get; set; }

    public string? Diagnosis { get; set; }

    public string? TreatmentPlan { get; set; }

    public DateTime? FollowUpDate { get; set; }

    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Reservation Reservation { get; set; } = null!;
}
