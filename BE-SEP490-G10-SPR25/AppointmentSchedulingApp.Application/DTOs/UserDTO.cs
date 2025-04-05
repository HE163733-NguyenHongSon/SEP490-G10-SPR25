using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class UserDTO
    {
        [Key]
        public int UserId { get; set; }

        public long? CitizenId { get; set; }

        public string? Email { get; set; }

        public string Password { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string Phone { get; set; } = null!;
        
        public string? PhoneNumber { get; set; }

        public string? Gender { get; set; }

        public string? Dob { get; set; }

        public string? Address { get; set; }
        
        public string? AvatarUrl { get; set; }

        public List<RoleInformation> RoleInformations { get; set; } = new List<RoleInformation>();
    }
}