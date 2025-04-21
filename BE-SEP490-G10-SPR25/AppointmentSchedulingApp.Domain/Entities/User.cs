using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class User
{
    public int UserId { get; set; }

    public long CitizenId { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; } = "password123";

    public string UserName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public DateOnly Dob { get; set; }

    public string Address { get; set; }

    public string AvatarUrl { get; set; } = "user.jpg";

    public bool IsVerify { get; set; } = false;

    public bool IsActive { get; set; } = true;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual Doctor? Doctor { get; set; }

    public virtual ICollection<Patient> PatientGuardians { get; set; } = new List<Patient>();

    public virtual Patient? Patient { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Receptionist? Receptionist { get; set; }

    public virtual ICollection<Reservation> ReservationCreatedByUsers { get; set; } = new List<Reservation>();

    public virtual ICollection<Reservation> ReservationUpdatedByUsers { get; set; } = new List<Reservation>();

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
