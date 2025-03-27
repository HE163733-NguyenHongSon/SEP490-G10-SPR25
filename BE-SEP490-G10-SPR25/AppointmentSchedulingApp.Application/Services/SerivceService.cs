using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.UnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;

namespace AppointmentSchedulingApp.Application.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public ServiceService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        public async Task<List<ServiceDTO>> GetListService()
        {
            var services = await unitOfWork.ServiceRepository.GetAll();
            return mapper.Map<List<ServiceDTO>>(services);
        }

        public async Task<ServiceDTO> GetServiceById(int id)
        {
            var service = await unitOfWork.ServiceRepository.GetById(id);
            return mapper.Map<ServiceDTO>(service);
        }

        public async Task AddService(ServiceDTO serviceDto)
        {
            var service = mapper.Map<Service>(serviceDto);
            await unitOfWork.ServiceRepository.Add(service);
            await unitOfWork.CommitAsync();
        }

        public async Task UpdateService(ServiceDTO serviceDto)
        {
            var service = mapper.Map<Service>(serviceDto);
            await unitOfWork.ServiceRepository.Update(service);
            await unitOfWork.CommitAsync();
        }

        public async Task DeleteService(int id)
        {
            await unitOfWork.ServiceRepository.Delete(id);
            await unitOfWork.CommitAsync();
        }
    }
}