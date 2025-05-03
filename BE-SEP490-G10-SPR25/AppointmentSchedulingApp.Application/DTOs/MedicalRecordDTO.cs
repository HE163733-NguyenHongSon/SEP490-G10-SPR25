using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class MedicalRecordDTO
    {
        [Key]
        [JsonPropertyOrder(1)]
        public string ReservationId { get; set; }

        [JsonPropertyOrder(2)]
        public string AppointmentDate { get; set; }

        [JsonPropertyOrder(3)]
        public string? Symptoms { get; set; }

        [JsonPropertyOrder(4)]
        public string? Diagnosis { get; set; }

        [JsonPropertyOrder(5)]
        public string? TreatmentPlan { get; set; }

        [JsonPropertyOrder(6)]
        public DateTime? FollowUpDate { get; set; }

        [JsonPropertyOrder(7)]
        public string? Notes { get; set; }
        
        [JsonPropertyOrder(8)]
        public string? PatientName { get; set; }
        
        [JsonPropertyOrder(9)]
        public int? PatientId { get; set; }
        
        [JsonPropertyOrder(10)]
        public string? PatientGender { get; set; }
        
        [JsonPropertyOrder(11)]
        public string? PatientDob { get; set; }
    }
}
