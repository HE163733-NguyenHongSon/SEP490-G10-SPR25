using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Receptionist
{
    public int ReceptionistId { get; set; }

    public DateOnly StartDate { get; set; }

    public string? Shift { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User ReceptionistNavigation { get; set; } = null!;
}
