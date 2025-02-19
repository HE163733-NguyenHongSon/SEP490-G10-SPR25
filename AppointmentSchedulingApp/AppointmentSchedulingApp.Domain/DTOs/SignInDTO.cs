using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.DTOs
{
    public class SignInDTO
    {
        [Required]
        //public string Email { get; set; }
        public string Phone { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
