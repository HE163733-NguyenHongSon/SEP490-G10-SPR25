﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.Entities;

namespace AppointmentSchedulingApp.Domain.Repositories
{
    public interface IServiceRepository 
    {
        Task<IQueryable<Service>> GetAll();
        Task<Service> GetById(int id);
        Task Add(Service service);
        Task Update(Service service);
        Task Delete(int id);
    }
}
