using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PatientUpdateDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string? Gender { get; set; }
        public DateOnly Dob { get; set; }
        public string? Address { get; set; }

    }

    public class GuardianOfPatientDTO
    {
        public int PatientId { get; set; }

        public int? GuardianId { get; set; }

    }
}
