using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class DoctorDTO
    {
        [Key]
        [JsonPropertyOrder(1)]
        public int  DoctorId { get; set; }

        [JsonPropertyOrder(2)]
        public string? AcademicTitle { get; set; }

        [JsonPropertyOrder(3)]
        public string Degree { get; set; }

        [JsonPropertyOrder(4)]
        public string DoctorName { get; set; }

        [JsonPropertyOrder(5)]
        public string AvatarUrl { get; set; }

        [JsonPropertyOrder(6)]
        public string? CurrentWork { get; set; }

        [JsonPropertyOrder(7)]
        public string BasicDescription { get; set; }

        [JsonPropertyOrder(8)]
        public string[] SpecialtyNames { get; set; }

        [JsonPropertyOrder(9)]
        public int  NumberOfService { get; set; }

        [JsonPropertyOrder(10)]
        public int NumberOfExamination { get; set; }

        [JsonPropertyOrder(11)]
        public double Rating { get; set; } = 0;

        [JsonPropertyOrder(12)]
        public int RatingCount { get; set; } = 0;


    }
}