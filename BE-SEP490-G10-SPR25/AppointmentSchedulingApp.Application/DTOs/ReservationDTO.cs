using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class ReservationDTO
    {
        [Key]
        public string ReservationId { get; set; }
        public string PatientId { get; set; }
        public string PatientName { get; set; } = null!;
        public string PatientPhone { get; set; } = null!;
        public string? PatientEmail { get; set; }
        public string? AppointmentDate { get; set; }
        public string UpdatedDate { get; set; }
        public string ServiceImage { get; set; } = null!;
        public string ServiceName { get; set; } = null!;
        public string ServicePrice { get; set; }
        public string DoctorName { get; set; } = null!;
        public string SlotStartTime { get; set; }
        public string SlotEndTime { get; set; }
        public string RoomName { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string? Reason { get; set; }
        public string Status { get; set; }
    }

}