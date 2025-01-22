using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.DTOs
{
    public class ReservationDTO
    {
        [Key]
        public int ReservationId { get; set; }
        public int PatientId { get; set; }
        public string PatientName { get; set; } = null!;
        public string PatientPhone { get; set; } = null!;
        public string? PatientEmail { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string ServiceName { get; set; } = null!;
        public decimal ServicePrice { get; set; }
        public string DoctorName { get; set; } = null!;
        public TimeOnly SlotStartTime { get; set; }
        public TimeOnly SlotEndTime { get; set; }
        public string RoomName { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string? Reason { get; set; }
    }

}