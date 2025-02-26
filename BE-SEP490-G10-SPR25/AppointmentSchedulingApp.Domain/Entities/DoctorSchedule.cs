using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class DoctorSchedule
{
    public int DoctorScheduleId { get; set; }

    public int DoctorId { get; set; }

    public int ServiceId { get; set; }

    public string DayOfWeek { get; set; } = null!;

    public int RoomId { get; set; }

    public int SlotId { get; set; }

    public virtual Doctor Doctor { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public virtual Room Room { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;

    public virtual Slot Slot { get; set; } = null!;
}
