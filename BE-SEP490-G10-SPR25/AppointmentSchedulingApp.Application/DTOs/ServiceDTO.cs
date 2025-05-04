using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class ServiceDTO
    {
        [Key]
        [JsonPropertyOrder(1)]
        public int ServiceId { get; set; }

        [JsonPropertyOrder(2)]
        public string ServiceName { get; set; }

        [JsonPropertyOrder(3)]
        public string? Overview { get; set; }

        [JsonPropertyOrder(4)]
        public string? Process { get; set; }

        [JsonPropertyOrder(5)]
        public string? TreatmentTechniques { get; set; }

        [JsonPropertyOrder(6)]
        public decimal Price { get; set; }

        [JsonPropertyOrder(7)]
        public string Image { get; set; }

        [JsonPropertyOrder(8)]
        public int SpecialtyId { get; set; }

        [JsonPropertyOrder(9)]
        public double Rating { get; set; } 

        [JsonPropertyOrder(10)]
        public int RatingCount { get; set; } 

        [JsonPropertyOrder(11)]
        public string? EstimatedTime { get; set; }

        [JsonPropertyOrder(12)]
        public bool? IsPrepayment { get; set; }
    }



}
