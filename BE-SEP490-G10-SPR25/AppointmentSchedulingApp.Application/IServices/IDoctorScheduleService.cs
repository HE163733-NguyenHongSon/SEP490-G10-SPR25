﻿using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public  interface IDoctorScheduleService
    {
        Task<List<DoctorScheduleDTO>> GetDoctorScheduleListByServiceId(int serviceId);
        Task<List<DoctorScheduleDTO>> GetDoctorScheduleList();

    }
}
