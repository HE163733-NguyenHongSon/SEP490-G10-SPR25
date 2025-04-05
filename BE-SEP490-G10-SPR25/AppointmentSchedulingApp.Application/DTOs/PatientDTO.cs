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
        public string MainCondition { get; set; }

        public string Rank { get; set; }

        public int? GuardianId { get; set; }

    }
}
