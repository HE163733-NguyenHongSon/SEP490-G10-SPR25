using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.DTOs
{
    public class SpecialtyDTO
    {
        [Key]
        public int SpecialtyId { get; set; }

        public string SpecialtyName { get; set; } = null!;


        public string? Image { get; set; }
    }
}
