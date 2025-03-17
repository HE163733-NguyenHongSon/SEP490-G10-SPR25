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
        public string Image { get; set; }
        public int CategoryId { get; set; }
        public int SpecialtyId { get; set; }
    }
}
