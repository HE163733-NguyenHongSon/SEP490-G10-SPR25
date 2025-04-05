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
        [JsonPropertyOrder(1)]
        public int PatientId { get; set; }

        [JsonPropertyOrder(2)]
        [JsonPropertyName("patientName")]
        public string PatientName { get; set; }

        [JsonPropertyOrder(3)]
        public string MainCondition { get; set; }

        [JsonPropertyOrder(4)]
        public string Rank { get; set; }

    }
}
