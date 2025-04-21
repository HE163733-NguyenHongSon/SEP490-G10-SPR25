using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class RoomDTO
    {
        public int RoomId { get; set; }

        public string RoomName { get; set; } = null!;

        public string RoomType { get; set; } = null!;

        public string Location { get; set; } = null!;
    }
}
