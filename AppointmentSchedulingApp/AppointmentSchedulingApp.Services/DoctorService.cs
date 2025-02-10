using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.DTOs;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services
{
    public class DoctorService : IDoctorService
    {
        public readonly IMapper mapper;
        public readonly IDoctorRepository doctorRepository;

        public DoctorService(IMapper mapper, IDoctorRepository doctorRepository)
        {
            this.mapper = mapper;
            this.doctorRepository = doctorRepository;
        }

        public async Task<List<DoctorDTO>> GetDoctorList()
        {
            return mapper.Map<List<DoctorDTO>>(await doctorRepository.GetAll());
        }
    }
}
