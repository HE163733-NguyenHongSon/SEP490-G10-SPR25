using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class CancellationResponseDTO
    {
        public int ReservationId { get; set; }
        public bool IsApproved { get; set; }
        public string? ReceptionistComment { get; set; }
    }
} 