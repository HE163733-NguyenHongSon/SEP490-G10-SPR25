﻿using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.IRepositories
{
    public interface IPaymentRepository :IGenericRepository<Payment>
    {
    }
}
