using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public  class AddedPatientDTO
    {
        public string UserName { get; set; } = null!;
        public string Phone { get; set; }

        public DateOnly Dob { get; set; }

        public string Gender { get; set; }
        public long CitizenId { get; set; }


        public string Address { get; set; }

        public string? Relationship { get; set; }

        public int? GuardianId { get; set; }

    }
}
