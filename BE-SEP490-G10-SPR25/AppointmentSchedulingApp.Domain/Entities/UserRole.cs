using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.Entities
{
    public class UserRole : IdentityUserRole<int>
    {
        public int UserRoleId { get; set; } // Khóa chính

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
