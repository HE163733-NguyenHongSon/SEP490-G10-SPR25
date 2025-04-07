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
        public string? GuardianName { get; set; }
        public string? GuardianPhone { get; set; }
        public string? GuardianEmail { get; set; }

        public List<MedicalRecordDTO> MedicalRecords { get; set; } = new List<MedicalRecordDTO>();
    }
}
