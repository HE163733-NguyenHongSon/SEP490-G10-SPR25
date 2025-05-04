using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public  interface IPaymentService
    {
        Task<bool> UpdatePaymentStatusByReservationId(int reservationId, string status);
    }
}
