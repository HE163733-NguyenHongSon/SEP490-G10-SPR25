using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PatientContactDTO
    {
        public int UserId { get; set; }
        public string? Email { get; set; }
        public string Phone { get; set; } = null!;
        //public int? GuardianId { get; set; }

    }

    public class GuardianOfPatientDTO
    {
        public int PatientId { get; set; }

        public int? GuardianId { get; set; }

    }
}
