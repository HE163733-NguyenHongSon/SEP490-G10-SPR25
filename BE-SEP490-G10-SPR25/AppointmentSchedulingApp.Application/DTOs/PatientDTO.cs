using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PatientDTO 
    {
        [Key]
        public int PatientId { get; set; }
        public int? GuardianId { get; set; }
        public string? Rank { get; set; }

        // thua ke tu UserDTO - nhung UserDTO chua sua
        public int UserId { get; set; }
        public long? CitizenId { get; set; }
        public string? Email { get; set; }
        public string UserName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string? Gender { get; set; }
        public DateOnly? Dob { get; set; }
        public string? Address { get; set; }
        public string? AvatarUrl { get; set; }


    }
}
