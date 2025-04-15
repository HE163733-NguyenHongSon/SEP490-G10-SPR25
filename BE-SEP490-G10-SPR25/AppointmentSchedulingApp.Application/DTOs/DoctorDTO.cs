using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class DoctorDTO:UserDTO
    {
        
        [JsonPropertyOrder(15)]
        public string? AcademicTitle { get; set; }

        [JsonPropertyOrder(16)]
        public string Degree { get; set; }

        [JsonPropertyOrder(17)]
        public string? CurrentWork { get; set; }

        [JsonPropertyOrder(18)]
        public string DoctorDescription { get; set; }

        [JsonPropertyOrder(19)]
        public string[] SpecialtyNames { get; set; }

        [JsonPropertyOrder(20)]
        public int NumberOfService { get; set; }

        [JsonPropertyOrder(21)]
        public int NumberOfExamination { get; set; }
    
        [JsonPropertyOrder(22)]
        public double Rating { get; set; } = 0;

        [JsonPropertyOrder(23)]
        public int RatingCount { get; set; } = 0;
    }
}
