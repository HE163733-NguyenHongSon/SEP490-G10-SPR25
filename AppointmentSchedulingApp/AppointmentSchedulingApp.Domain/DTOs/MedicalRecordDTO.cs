using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.DTOs
{
    public  class MedicalRecordDTO
    {
        [Key]
        public string MedicalRecordId { get; set; }

        public string AppointmentDate { get; set; }

        public string? Symptoms { get; set; }

        public string? Diagnosis { get; set; }

        public string? TreatmentPlan { get; set; }

        public string? FollowUpDate { get; set; }

        public string? Notes { get; set; }

    }
}
