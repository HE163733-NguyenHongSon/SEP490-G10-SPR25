using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PatientDTO : UserDTO
    {
        [Key]
        public int PatientId { get; set; }
        //public int? UserId { get; set; }
        public int? CitizenId { get; set; }
        //public string? Email { get; set; }
        //public string UserName { get; set; }
        public string Phone { get; set; }
        //public string? Gender { get; set; }
        //public DateOnly? Dob { get; set; }
        public string? Address { get; set; }
        public string? AvatarUrl { get; set; }

    }
}
