using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PatientDetailDTO : PatientDTO
    {
        [JsonPropertyOrder(5)]
        public string CitizenId { get; set; }

        [JsonPropertyOrder(6)]
        public string? Email { get; set; }

        [JsonPropertyOrder(7)]
        public string? Phone { get; set; }

        [JsonPropertyOrder(8)]
        public string? Gender { get; set; }

        [JsonPropertyOrder(9)]
        public string? Dob { get; set; }
        //[JsonPropertyOrder(9)]
        //public DateOnly? Dob { get; set; }

        [JsonPropertyOrder(10)]
        public string? Address { get; set; }

        [JsonPropertyOrder(11)]
        public string? AvatarUrl { get; set; }

        [JsonPropertyOrder(12)]
        public int? GuardianId { get; set; }

        [JsonPropertyOrder(13)]
        public string? GuardianName { get; set; }

        [JsonPropertyOrder(14)]
        public string? GuardianPhone { get; set; }

        [JsonPropertyOrder(15)]
        public string? GuardianEmail { get; set; }
    }
}
