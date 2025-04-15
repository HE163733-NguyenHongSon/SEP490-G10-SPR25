using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Service
{
    public int ServiceId { get; set; }

    public string ServiceName { get; set; } = null!;

    public string? Overview { get; set; }

    public string? Process { get; set; }

    public string? TreatmentTechniques { get; set; }

    public decimal Price { get; set; }

    public TimeOnly EstimatedTime { get; set; }

    public bool? IsPrepayment { get; set; }

    public int SpecialtyId { get; set; }

    public string? Image { get; set; }

    public double Rating { get; set; }

    public int RatingCount { get; set; }

    public virtual ICollection<DoctorSchedule> DoctorSchedules { get; set; } = new List<DoctorSchedule>();

    public virtual Specialty Specialty { get; set; } = null!;

    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();

    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
}
