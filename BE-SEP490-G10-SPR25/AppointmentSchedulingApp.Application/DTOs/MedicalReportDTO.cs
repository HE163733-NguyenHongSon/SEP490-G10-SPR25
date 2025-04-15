using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public  class MedicalReportDTO
    {
        [Key]
        public PatientDTO Patient { get; set; } 
        public int NumberOfVisits { get; set; } = 0;

        [JsonIgnore]
        public DateTime? FirstVisit { get; set; }
        public string FirstVisitFormatted { get; set; }

        [JsonIgnore]
        public DateTime? LastVisit { get; set; }
        public string LastVisitFormatted { get; set; }


        public List<MedicalRecordDTO> MedicalRecords { get; set; } 

    }
}
