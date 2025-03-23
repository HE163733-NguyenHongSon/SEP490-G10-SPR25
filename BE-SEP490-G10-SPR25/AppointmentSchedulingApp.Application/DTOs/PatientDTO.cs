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

        //[JsonPropertyOrder(2)]
        //public int? UserId { get; set; }

        [JsonPropertyOrder(2)]
        public int? CitizenId { get; set; }

        [JsonPropertyOrder(3)]
        public string Email { get; set; }

        [JsonPropertyOrder(4)]
        public string UserName { get; set; }

        [JsonPropertyOrder(5)]
        public string Phone { get; set; }

        [JsonPropertyOrder(6)]
        public string Gender { get; set; }

        [JsonPropertyOrder(7)]
        public DateOnly? Dob { get; set; }

        [JsonPropertyOrder(8)]
        public string Address { get; set; }

        [JsonPropertyOrder(9)]
        public string AvatarUrl { get; set; }

    }
}
