using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class GuardianDTO:UserDTO
    {
        [JsonPropertyOrder(15)]
        public int GuardianId { get; set; }

        [JsonPropertyOrder(16)]
        public string Relationship { get; set; } = null!;


    }
}
