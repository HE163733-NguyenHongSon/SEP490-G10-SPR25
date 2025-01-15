using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Models;

public partial class Patient
{
    public int PatientId { get; set; }

    public string? Rank { get; set; }

    public virtual User PatientNavigation { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
