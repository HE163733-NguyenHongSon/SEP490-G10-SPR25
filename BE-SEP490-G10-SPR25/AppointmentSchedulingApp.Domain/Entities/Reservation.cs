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

    public DateTime AppointmentDate { get; set; }


    public string Status { get; set; } = "Đang chờ";

    public string? CancellationReason { get; set; }

    public DateTime CreatedDate { get; set; }= DateTime.Now;

    public int CreatedByUserId { get; set; }

    public DateTime UpdatedDate { get; set; }=DateTime.Now;

    public int UpdatedByUserId { get; set; }

    public virtual User CreatedByUser { get; set; } = null!;

    public virtual DoctorSchedule DoctorSchedule { get; set; } = null!;

    public virtual Feedback? Feedback { get; set; }

    public virtual MedicalRecord? MedicalRecord { get; set; }

    public virtual Patient Patient { get; set; } = null!;

    public virtual Payment Payment { get; set; } = null!;

    public virtual User UpdatedByUser { get; set; } = null!;
}
