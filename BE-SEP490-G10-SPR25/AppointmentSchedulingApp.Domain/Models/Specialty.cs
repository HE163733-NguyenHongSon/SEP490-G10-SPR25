using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Models;

public partial class Specialty
{
    public int SpecialtyId { get; set; }

    public string SpecialtyName { get; set; } = null!;

    public string? SpecialtyDescription { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();

    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();

    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
}
