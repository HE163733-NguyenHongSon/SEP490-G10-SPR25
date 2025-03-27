using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Slot
{
    public int SlotId { get; set; }

    public TimeOnly? SlotStartTime { get; set; }

    public TimeOnly? SlotEndTime { get; set; }

    public virtual ICollection<DoctorSchedule> DoctorSchedules { get; set; } = new List<DoctorSchedule>();
}
