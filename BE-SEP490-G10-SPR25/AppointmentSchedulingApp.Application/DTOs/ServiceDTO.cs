using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class ServiceDTO
    {
        [Key]
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string? Overview { get; set; }
        public string? Process { get; set; }
        public string? TreatmentTechniques { get; set; }
        public decimal Price { get; set; }
        public string? Image { get; set; }
        public int SpecialtyId { get; set; }
        public decimal? Rating { get; set; }
        public int? RatingCount { get; set; }
        public string? EstimatedTime { get; set; }
        public bool? IsPrepayment { get; set; }
    }

    public class ServiceDetailDTO : ServiceDTO
    {
        public string SpecialtyName { get; set; }
        public List<string> RelatedDoctors { get; set; } = new List<string>();
        public List<string> RequiredDevices { get; set; } = new List<string>();
    }
}
