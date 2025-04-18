using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class SpecialtyDetailDTO:SpecialtyDTO
    {
        [JsonPropertyOrder(4)]
        public string? SpecialtyDescription { get; set; }
        
        [JsonPropertyOrder(5)]
        public List<string> Devices { get; set; } = new List<string>();
        
        [JsonPropertyOrder(6)]
        public List<ServiceDTO> Services { get; set; } = new List<ServiceDTO>();
        
        [JsonPropertyOrder(7)]
        public List<DoctorDTO> Doctors { get; set; } = new List<DoctorDTO>();
    }
}