using System.Text.Json.Serialization;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class DoctorDetailDTO : DoctorDTO
    {
        [JsonPropertyOrder(11)]
        public string DetailDescription { get; set; }

        [JsonPropertyOrder(12)]
        public string? WorkExperience { get; set; }

        [JsonPropertyOrder(13)]
        public string? Organization { get; set; }

        [JsonPropertyOrder(14)]
        public string? Prize { get; set; }

        [JsonPropertyOrder(15)]
        public string? ResearchProject { get; set; }

        [JsonPropertyOrder(16)]
        public string? TrainingProcess { get; set; }
    }
}
