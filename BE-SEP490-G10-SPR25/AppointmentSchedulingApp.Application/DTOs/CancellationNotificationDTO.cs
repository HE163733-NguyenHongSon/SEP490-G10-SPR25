using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class CancellationNotificationDTO
    {
        public int NotificationId { get; set; }
        public int ReservationId { get; set; }
        public string DoctorName { get; set; }
        public string PatientName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string CancellationReason { get; set; }
        public DateTime RequestTime { get; set; } = DateTime.Now;
        public bool IsRead { get; set; } = false;
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
    }
} 