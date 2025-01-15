using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Models;

public partial class Service
{
    public int ServiceId { get; set; }

    public string ServiceName { get; set; } = null!;

    public string? Overview { get; set; }

    public string? Process { get; set; }

    public string? TreatmentTechniques { get; set; }

    public decimal Price { get; set; }

    public string Image { get; set; } = null!;

    public int CategoryId { get; set; }

    public int SpecialtyId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public virtual Specialty Specialty { get; set; } = null!;

    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();

    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
}
