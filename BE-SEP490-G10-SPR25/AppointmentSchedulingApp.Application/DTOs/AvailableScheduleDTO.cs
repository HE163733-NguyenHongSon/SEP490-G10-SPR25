using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class AvailableScheduleDTO
    {
        public int DoctorScheduleId { get; set; }
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public int SlotId { get; set; }
        public TimeOnly? SlotStartTime { get; set; }
        public TimeOnly? SlotEndTime { get; set; }
    }
}

