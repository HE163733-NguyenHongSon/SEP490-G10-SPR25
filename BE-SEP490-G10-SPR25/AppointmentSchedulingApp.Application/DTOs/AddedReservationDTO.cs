using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class AddedReservationDTO
    {
        public int PatientId { get; set; }

        public int DoctorScheduleId { get; set; }

        public string? Reason { get; set; }

        //public IFormFile? PriorExaminationImg { get; set; }

        public DateTime AppointmentDate { get; set; }

        public int CreatedByUserId { get; set; }

        public int UpdatedByUserId { get; set; }
    }
}
