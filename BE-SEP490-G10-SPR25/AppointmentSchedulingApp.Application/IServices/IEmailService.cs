﻿using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}
