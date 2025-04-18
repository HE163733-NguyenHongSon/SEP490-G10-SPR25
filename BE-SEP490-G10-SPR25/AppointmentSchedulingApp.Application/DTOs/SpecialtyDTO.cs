using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class SpecialtyDTO
    {
        [Key]
        [JsonPropertyOrder(1)]
        public int SpecialtyId { get; set; }
        [JsonPropertyOrder(2)]
        public string SpecialtyName { get; set; } = null!;
        [JsonPropertyOrder(3)]
        public string? Description { get; set; }
        [JsonPropertyOrder(4)]
        public string? Image { get; set; }
    }
}