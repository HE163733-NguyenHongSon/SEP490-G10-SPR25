using System.Text.Json.Serialization;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class DoctorDetailDTO : DoctorDTO
    {
        [JsonPropertyOrder(24)]
        public string? WorkExperience { get; set; }

        [JsonPropertyOrder(25)]
        public string? Organization { get; set; }

        [JsonPropertyOrder(26)]
        public string? Prize { get; set; }

        [JsonPropertyOrder(27)]
        public string? ResearchProject { get; set; }

        [JsonPropertyOrder(28)]
        public string? TrainingProcess { get; set; }

        [JsonPropertyOrder(29)]
        public List<DoctorScheduleDTO> Schedules { get; set; }

        [JsonPropertyOrder(30)]
        public List<ServiceDTO> Services { get; set; }

        [JsonPropertyOrder(31)]
        public List<FeedbackDTO> Feedbacks { get; set; }

        [JsonPropertyOrder(32)]
        public List<DoctorDTO> RelevantDoctors { get; set; }
    }
}
