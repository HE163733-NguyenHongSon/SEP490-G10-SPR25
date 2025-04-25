using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class DoctorScheduleUpdateDTO
    {
        public int DoctorScheduleId { get; set; }

        public int DoctorId { get; set; }

        public int ServiceId { get; set; }
        
        public string DayOfWeek { get; set; } = null!;

        public int RoomId { get; set; }
        
        public int SlotId { get; set; }

        
    }
}
