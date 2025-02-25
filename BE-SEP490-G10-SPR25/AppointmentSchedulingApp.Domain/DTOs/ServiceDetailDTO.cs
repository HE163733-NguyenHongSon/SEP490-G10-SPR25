using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.DTOs
{
    public  class ServiceDetailDTO:ServiceDTO
    {
        public string? Overview { get; set; }

        public string? Devices { get; set; }

        public string? Process { get; set; }

        public string? TreatmentTechniques { get; set; }


        public int CategoryId { get; set; }

        public string CategoryName { get; set; }
    }
}
