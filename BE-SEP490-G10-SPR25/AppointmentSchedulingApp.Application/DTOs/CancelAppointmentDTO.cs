using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class CancelAppointmentDTO
    {
        public int ReservationId { get; set; }
        public string CancellationReason { get; set; }
    }
} 