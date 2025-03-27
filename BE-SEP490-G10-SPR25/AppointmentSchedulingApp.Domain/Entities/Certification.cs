using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Certification
{
    public int CertificationId { get; set; }

    public int DoctorId { get; set; }

    public string? CertificationUrl { get; set; }

    public virtual Doctor Doctor { get; set; } = null!;
}
