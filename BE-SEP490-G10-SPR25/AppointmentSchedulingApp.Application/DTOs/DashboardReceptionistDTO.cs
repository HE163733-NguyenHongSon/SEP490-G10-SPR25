using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class DashboardReceptionistDTO
    {
        public int TotalReservationtoday { get; set; }
        public int ReservationChangePercent { get; set; }
        public int TotalDoctor { get; set; }
        public int TotalService { get; set; }
        public double AppointmentScheduleChangePercent { get; set; }
        public double PatientChangePercent { get; set; }


        public double todayTotal { get; set; }
        public double monthTotal { get; set; }
        public double lastMonthTotal { get; set; }
        public double percentChange { get; set; }
        public double target { get; set; }

    }
}
