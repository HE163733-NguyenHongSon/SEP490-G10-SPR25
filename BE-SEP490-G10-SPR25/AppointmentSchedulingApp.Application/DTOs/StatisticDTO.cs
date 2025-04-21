using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class StatisticDTO
    {
        public string Time { get; set; } 
        public int AppointmentCount { get; set; }
        public int Year { get; set; }
        public decimal Revenue { get; set; }
    }
}
