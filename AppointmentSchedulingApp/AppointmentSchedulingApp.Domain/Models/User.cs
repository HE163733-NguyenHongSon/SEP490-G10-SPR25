using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Models;

public partial class User
{
    public int UserId { get; set; }

    public long CitizenId { get; set; }

    public string? Email { get; set; }

    public string Password { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public DateOnly Dob { get; set; }

    public string Address { get; set; } = null!;

    public string Role { get; set; } = null!;

    public string? AvatarUrl { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }
}
