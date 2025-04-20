using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class DoctorScheduleService : IDoctorScheduleService
    {
        public IUnitOfWork unitOfWork { get; set; }
        private readonly IMapper mapper;

        public DoctorScheduleService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<List<DoctorScheduleDTO>> GetDoctorScheduleListByServiceId(int serviceId)
        {

            var query = unitOfWork.DoctorScheduleRepository.GetQueryable(ds => ds.ServiceId.Equals(serviceId));
            return await query.ProjectTo<DoctorScheduleDTO>(mapper.ConfigurationProvider).ToListAsync();

        }

        public async Task<List<DoctorScheduleDTO>> GetDoctorScheduleList()
        {
            var query = unitOfWork.DoctorScheduleRepository.GetQueryable();
            return await query.ProjectTo<DoctorScheduleDTO>(mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
