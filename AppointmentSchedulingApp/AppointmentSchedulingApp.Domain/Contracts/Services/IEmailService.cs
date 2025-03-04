using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.DTOs;

namespace AppointmentSchedulingApp.Domain.Contracts.Services
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}
