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
        public int ReservationId { get; set; }
        public PatientDTO Patient { get; set; }
        public string? AppointmentDate { get; set; }
        public string UpdatedDate { get; set; }
        public string ServiceImage { get; set; } = null!;
        public string ServiceName { get; set; } = null!;
        public string ServicePrice { get; set; }
        public string DoctorName { get; set; } = null!;
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string RoomName { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string? Reason { get; set; }
        public string? PriorExaminationImg { get; set; }
        public string Status { get; set; }
        public string? CancellationReason { get; set; }

    }

}