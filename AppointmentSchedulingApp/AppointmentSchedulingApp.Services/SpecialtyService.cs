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
    public class SpecialtyService : ISpecialtyService
    {
        public readonly IMapper mapper;
        public readonly ISpecialtyRepository specialtyRepository;

        public SpecialtyService(IMapper mapper, ISpecialtyRepository specialtyRepository)
        {
            this.mapper = mapper;
            this.specialtyRepository = specialtyRepository;
        }

        public async Task<List<SpecialtyDTO>> GetSpecialtyList()
        {
            return mapper.Map<List<SpecialtyDTO>>(await specialtyRepository.GetAll());
        }

        public async Task<SpecialtyDetailDTO> GetSpecialtyDetailById(int id)
        {
            return mapper.Map<SpecialtyDetailDTO>(await specialtyRepository.Get(s => s.SpecialtyId.Equals(id)));
        }
    }
}
