using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class User : IdentityUser<int>
{
    //[Key]
    //public int UserId { get; set; }

    public long CitizenId { get; set; }

    //public string Email { get; set; }

    //public string Password { get; set; } = null!;

    // sua username
    public string Name { get; set; } = null!;

    //public string Phone { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public DateOnly Dob { get; set; }

    public string Address { get; set; } = null!;

    //public string Role { get; set; } = null!;

    public string? AvatarUrl { get; set; }

    public bool IsVerify { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }

    //public string themmoi { get; set; } = null!;
    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();


}
