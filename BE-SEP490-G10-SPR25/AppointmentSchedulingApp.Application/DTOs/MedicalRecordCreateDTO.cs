using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class MedicalRecordCreateDTO
    {
        [Required]
        [JsonPropertyOrder(1)]
        public int ReservationId { get; set; }

        [JsonPropertyOrder(2)]
        public string? Symptoms { get; set; }

        [JsonPropertyOrder(3)]
        public string? Diagnosis { get; set; }

        [JsonPropertyOrder(4)]
        public string? TreatmentPlan { get; set; }

        [JsonPropertyOrder(5)]
        public DateTime? FollowUpDate { get; set; }

        [JsonPropertyOrder(6)]
        public string? Notes { get; set; }
    }
} 