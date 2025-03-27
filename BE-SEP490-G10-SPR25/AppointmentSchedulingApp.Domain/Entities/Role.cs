using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace AppointmentSchedulingApp.Domain.Entities;

public class Role 
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();


}
