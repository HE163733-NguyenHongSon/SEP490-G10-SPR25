using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AppointmentSchedulingApp.Application.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }

        public DoctorService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        public async Task<List<DoctorDTO>> GetDoctorList()
        {
            var query = unitOfWork.DoctorRepository.GetQueryable();

            return await query.ProjectTo<DoctorDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<DoctorDetailDTO> GetDoctorDetailById(int doctorId)
        {
            var query = unitOfWork.DoctorRepository.GetQueryable(d => d.DoctorId == doctorId);
            return await query.ProjectTo<DoctorDetailDTO>(mapper.ConfigurationProvider).FirstOrDefaultAsync();
        }

    }
}