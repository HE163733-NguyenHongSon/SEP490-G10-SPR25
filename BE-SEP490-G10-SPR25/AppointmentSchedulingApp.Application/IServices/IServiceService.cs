using System;
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
        Task<ServiceDetailDTO> GetServiceDetailById(int id);
        Task AddService(ServiceDTO serviceDto);
        Task UpdateService(ServiceDTO serviceDto);
        Task DeleteService(int id);
        Task<List<ServiceDTO>> GetServicesBySpecialty(int specialtyId);
        Task<List<ServiceDTO>> GetServicesByCategory(int categoryId);
        Task<List<ServiceDTO>> GetServicesSortedByRating();
        Task<List<ServiceDTO>> GetServicesSortedByPrice(bool ascending = true);
    }
}