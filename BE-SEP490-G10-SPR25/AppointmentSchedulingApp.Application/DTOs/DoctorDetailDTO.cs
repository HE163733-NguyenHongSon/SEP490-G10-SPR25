﻿using System.Text.Json.Serialization;

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

        [JsonPropertyOrder(19)]
        public List<DoctorScheduleDTO> Schedules { get; set; }

        [JsonPropertyOrder(20)]
        public List<ServiceDTO> Services { get; set; }

        [JsonPropertyOrder(21)]
        public List<FeedbackDTO> Feedbacks { get; set; }

        [JsonPropertyOrder(22)]
        public List<DoctorDTO> RelevantDoctors { get; set; }

        [JsonPropertyOrder(23)]
        public string Password { get; set; }

        [JsonPropertyOrder(24)]
        public string CitizenId { get; set; }

        [JsonPropertyOrder(25)]
        public string Phone { get; set; }

        [JsonPropertyOrder(26)]
        public string Gender { get; set; }

        [JsonPropertyOrder(27)]
        public DateTime DateOfBirth { get; set; }

        [JsonPropertyOrder(28)]
        public string Address { get; set; }
    }
}
