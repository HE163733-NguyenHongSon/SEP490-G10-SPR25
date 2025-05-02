using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class ServiceDetailDTO : ServiceDTO
    {
        [JsonPropertyOrder(13)]
        public string SpecialtyName { get; set; }

        [JsonPropertyOrder(14)]
        public List<DoctorDTO> RelatedDoctors { get; set; }

        [JsonPropertyOrder(15)]
        public List<string> RequiredDevices { get; set; } = new List<string>();
    }
}
