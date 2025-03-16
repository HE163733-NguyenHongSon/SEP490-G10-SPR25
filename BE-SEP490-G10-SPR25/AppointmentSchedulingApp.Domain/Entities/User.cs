using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class User : IdentityUser<int>
{
    public int UserId { get; set; }

    public long? CitizenId { get; set; }

    public string? Email { get; set; }

    public string Password { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string? Gender { get; set; }

    public DateOnly? Dob { get; set; }

    public string? Address { get; set; }

    public string? AvatarUrl { get; set; }

    public bool? IsVerify { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual Doctor? Doctor { get; set; }

    public virtual ICollection<Patient> PatientGuardians { get; set; } = new List<Patient>();

    public virtual Patient? PatientPatientNavigation { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Receptionist? Receptionist { get; set; }

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

}
