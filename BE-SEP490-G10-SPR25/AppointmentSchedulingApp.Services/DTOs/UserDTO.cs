using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services.DTOs
{
    public class UserDTO
    //:RegistrationDTO
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Name { get; set; } = null!;
        public string Password { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public DateOnly? Dob { get; set; }
        //public string Role { get; set; } = null!;

        public List<RoleInformation> RoleInformations { get; set; }

    }
}
