﻿using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PatientDTO : UserDTO
    {
        [JsonPropertyOrder(15)] 
        public string MainCondition { get; set; }

        [JsonPropertyOrder(16)]
        public string Rank { get; set; }

        [JsonPropertyOrder(17)]
        public int? GuardianId { get; set; }
    }
}