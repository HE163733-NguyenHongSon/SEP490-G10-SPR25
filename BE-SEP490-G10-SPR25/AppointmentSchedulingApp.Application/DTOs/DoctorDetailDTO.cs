using System.Text.Json.Serialization;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class DoctorDetailDTO : DoctorDTO
    {
        [JsonPropertyOrder(13)]
        public string DetailDescription { get; set; }

        [JsonPropertyOrder(14)]
        public string? WorkExperience { get; set; }

        [JsonPropertyOrder(15)]
        public string? Organization { get; set; }

        [JsonPropertyOrder(16)]
        public string? Prize { get; set; }

        [JsonPropertyOrder(17)]
        public string? ResearchProject { get; set; }

        [JsonPropertyOrder(18)]
        public string? TrainingProcess { get; set; }
        
        // User account properties
        [JsonPropertyOrder(19)]
        public string UserName { get; set; }
        
        [JsonPropertyOrder(20)]
        public string Password { get; set; }
        
        // Additional User information
        [JsonPropertyOrder(21)]
        public long CitizenId { get; set; }
        
        [JsonPropertyOrder(22)]
        public string Phone { get; set; }
        
        [JsonPropertyOrder(23)]
        public string Gender { get; set; }
        
        [JsonPropertyOrder(24)]
        public DateTime DateOfBirth { get; set; }
        
        [JsonPropertyOrder(25)]
        public string Address { get; set; }
    }
}