using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class SlotDTO
    {
        public int SlotId { get; set; }

        public TimeOnly? SlotStartTime { get; set; }

        public TimeOnly? SlotEndTime { get; set; }

    }
}
