using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.DTOs
{
    public class ServiceDTO
    {
        public int ServiceId { get; set; }

        public string Name { get; set; } = null!;

        public int RegisterNumber { get; set; }


        public decimal Price { get; set; }


        

        

    }
}
