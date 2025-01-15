using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Models;

public partial class DoctorSchedule
{
    public int DoctorScheduleId { get; set; }

    public int DoctorId { get; set; }

    public string DayOfWeek { get; set; } = null!;

    public int SlotId { get; set; }

    public int RoomId { get; set; }

    public virtual Doctor Doctor { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public virtual Room Room { get; set; } = null!;

    public virtual Slot Slot { get; set; } = null!;
}
