using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Guardian
{
    public int GuardianId { get; set; }

    public string Relationship { get; set; } = null!;

    public virtual User GuardianNavigation { get; set; } = null!;

    public virtual ICollection<Patient> Patients { get; set; } = new List<Patient>();
}
