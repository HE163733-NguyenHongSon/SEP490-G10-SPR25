using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PatientDetailDTO : PatientDTO
    {
        [JsonPropertyOrder(18)]
        public UserDTO? Guardian { get; set; }

        [JsonPropertyOrder(19)]
        public List<PatientDTO>? Dependents { get; set; }

        [JsonPropertyOrder(20)]
        public List<MedicalRecordDTO>? MedicalRecords { get; set; } = new List<MedicalRecordDTO>();
    }
}
