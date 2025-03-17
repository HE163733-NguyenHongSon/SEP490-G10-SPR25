using AppointmentSchedulingApp.Domain.UnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;

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
            var doctors = await unitOfWork.DoctorRepository.GetAll();
            return mapper.Map<List<DoctorDTO>>(doctors);
        }

        public async Task<DoctorDetailDTO> GetDoctorDetailById(int doctorId)
        {
            var doctor = await unitOfWork.DoctorRepository.Get(d => d.DoctorId.Equals(doctorId));

            if (doctor == null)
            {
                return null;
            }

            return mapper.Map<DoctorDetailDTO>(doctor);
        }
    }
}
