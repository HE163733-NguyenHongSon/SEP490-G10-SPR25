using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class ReservationStatusDTO
    {
        [Key]
        public int ReservationId { get; set; }
        public string? CancellationReason { get; set; }
        public string Status { get; set; }

        public int? UpdatedByUserId { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
