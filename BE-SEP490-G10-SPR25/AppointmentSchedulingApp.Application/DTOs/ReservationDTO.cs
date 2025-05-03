using AppointmentSchedulingApp.Domain.Entities;
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
        public DateTime AppointmentDate { get; set; }
        public PatientDTO Patient { get;set; }
        public DoctorScheduleDTO DoctorSchedule { get; set; }
        public string? Reason { get; set; }
        public string? PriorExaminationImg { get; set; }
        public string Status { get; set; }
        public string? CancellationReason { get; set; }

        public int CreatedByUserId { get; set; }
        public DateTime CreatedDate { get; set; }


        public DateTime UpdatedDate { get; set; }

        public int UpdatedByUserId { get; set; }

        public string? PaymentStatus { get; set; } = null!;
        
        public string? PatientName { get; set; }



    }

}