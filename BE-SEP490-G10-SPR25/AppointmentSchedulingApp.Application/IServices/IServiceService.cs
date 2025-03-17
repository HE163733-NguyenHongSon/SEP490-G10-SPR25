﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IServiceService
    {
        Task<List<ServiceDTO>> GetListService();
        Task<ServiceDTO> GetServiceById(int id);
        Task AddService(ServiceDTO serviceDto);
        Task UpdateService(ServiceDTO serviceDto);
        Task DeleteService(int id);
    }
}
