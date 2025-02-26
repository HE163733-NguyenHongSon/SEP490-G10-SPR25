﻿using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.Contracts.UnitOfWork;
using AppointmentSchedulingApp.Domain.DTOs;
using AutoMapper;

namespace AppointmentSchedulingApp.Services.Services
{
    public class SpecialtyService : ISpecialtyService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }

        public SpecialtyService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        public async Task<List<SpecialtyDTO>> GetSpecialtyList()
        {
            var specialties = await unitOfWork.SpecialtyRepository.GetAll();
            return mapper.Map<List<SpecialtyDTO>>(specialties);
        }

        public async Task<SpecialtyDetailDTO> GetSpecialtyDetailById(int id)
        {
            var specialty = await unitOfWork.SpecialtyRepository.Get(s => s.SpecialtyId == id);
            return mapper.Map<SpecialtyDetailDTO>(specialty);
        }
    }
}
