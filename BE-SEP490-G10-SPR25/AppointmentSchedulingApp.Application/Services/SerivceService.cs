using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.UnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;
using AppointmentSchedulingApp.Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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
            try
            {
                var services = await unitOfWork.ServiceRepository.GetAll();
                var serviceDTOs = mapper.Map<List<ServiceDTO>>(services);

                // Add ratings from feedback
                foreach (var serviceDTO in serviceDTOs)
                {
                    var ratingInfo = await unitOfWork.FeedbackRepository.GetServiceRatingInfo(serviceDTO.ServiceId);
                    serviceDTO.Rating = ratingInfo.AverageRating;
                    serviceDTO.RatingCount = ratingInfo.Count;
                }

                return serviceDTOs;
            }
            catch (Exception ex)
            {
                throw new ServiceException("Error retrieving services list", ex);
            }
        }

        public async Task<ServiceDTO> GetServiceById(int id)
        {
            try
            {
                var service = await unitOfWork.ServiceRepository.GetById(id);
                if (service == null)
                {
                    throw new NotFoundException($"Service with ID {id} not found");
                }
                
                var serviceDTO = mapper.Map<ServiceDTO>(service);
                
                // Add rating from feedback
                var ratingInfo = await unitOfWork.FeedbackRepository.GetServiceRatingInfo(id);
                serviceDTO.Rating = ratingInfo.AverageRating;
                serviceDTO.RatingCount = ratingInfo.Count;
                
                return serviceDTO;
            }
            catch (Exception ex)
            {
                throw new ServiceException($"Error retrieving service with ID {id}", ex);
            }
        }

        public async Task<ServiceDetailDTO> GetServiceDetailById(int id)
        {
            try
            {
                var service = await unitOfWork.ServiceRepository.GetById(id);
                if (service == null)
                {
                    throw new NotFoundException($"Service with ID {id} not found");
                }

                var serviceDetail = mapper.Map<ServiceDetailDTO>(service);
                
                // Safely populate related data with null checks
                serviceDetail.SpecialtyName = service.Specialty?.SpecialtyName ?? string.Empty;
                
                // Initialize empty collections to prevent null reference exceptions
                serviceDetail.RelatedDoctors = new List<string>();
                serviceDetail.RequiredDevices = new List<string>();
                
                // Safely add doctor information without accessing DoctorNavigation
                if (service.Doctors != null && service.Doctors.Any())
                {
                    // Just use the DoctorId instead of DoctorNavigation to avoid User entity
                    serviceDetail.RelatedDoctors = service.Doctors
                        .Select(d => $"Doctor {d.DoctorId}")
                        .ToList();
                }
                
                // Safely add devices if available
                if (service.Devices != null && service.Devices.Any())
                {
                    serviceDetail.RequiredDevices = service.Devices
                        .Where(d => d.Name != null)
                        .Select(d => d.Name)
                        .ToList();
                }
                    
                try
                {
                    // Add rating from feedback
                    var ratingInfo = await unitOfWork.FeedbackRepository.GetServiceRatingInfo(id);
                    serviceDetail.Rating = ratingInfo.AverageRating;
                    serviceDetail.RatingCount = ratingInfo.Count;
                }
                catch (Exception ratingEx)
                {
                    // If rating fetching fails, set default values but don't fail the whole request
                    Console.WriteLine($"Error fetching rating info: {ratingEx.Message}");
                    serviceDetail.Rating = null;
                    serviceDetail.RatingCount = 0;
                }

                return serviceDetail;
            }
            catch (NotFoundException)
            {
                // Rethrow NotFoundException to maintain 404 status code
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"DetailedError: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"InnerException: {ex.InnerException.Message}");
                }
                throw new ServiceException($"Error retrieving service detail with ID {id}", ex);
            }
        }

        public async Task AddService(ServiceDTO serviceDto)
        {
            try
            {
                if (serviceDto == null)
                {
                    throw new ValidationException("Service data cannot be null");
                }

                var service = mapper.Map<Service>(serviceDto);
                await unitOfWork.ServiceRepository.Add(service);
                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                throw new ServiceException("Error adding new service", ex);
            }
        }

        public async Task UpdateService(ServiceDTO serviceDto)
        {
            try
            {
                if (serviceDto == null)
                {
                    throw new ValidationException("Service data cannot be null");
                }

                var existingService = await unitOfWork.ServiceRepository.GetById(serviceDto.ServiceId);
                if (existingService == null)
                {
                    throw new NotFoundException($"Service with ID {serviceDto.ServiceId} not found");
                }

                var service = mapper.Map<Service>(serviceDto);
                await unitOfWork.ServiceRepository.Update(service);
                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                throw new ServiceException($"Error updating service with ID {serviceDto?.ServiceId}", ex);
            }
        }

        public async Task DeleteService(int id)
        {
            try
            {
                var service = await unitOfWork.ServiceRepository.GetById(id);
                if (service == null)
                {
                    throw new NotFoundException($"Service with ID {id} not found");
                }

                await unitOfWork.ServiceRepository.Delete(id);
                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                throw new ServiceException($"Error deleting service with ID {id}", ex);
            }
        }

        public async Task<List<ServiceDTO>> GetServicesBySpecialty(int specialtyId)
        {
            try
            {
                var services = await unitOfWork.ServiceRepository.GetServicesBySpecialty(specialtyId);
                var serviceDTOs = mapper.Map<List<ServiceDTO>>(services);
                
                // Add ratings from feedback
                foreach (var serviceDTO in serviceDTOs)
                {
                    var ratingInfo = await unitOfWork.FeedbackRepository.GetServiceRatingInfo(serviceDTO.ServiceId);
                    serviceDTO.Rating = ratingInfo.AverageRating;
                    serviceDTO.RatingCount = ratingInfo.Count;
                }
                
                return serviceDTOs;
            }
            catch (Exception ex)
            {
                throw new ServiceException($"Error retrieving services for specialty ID {specialtyId}", ex);
            }
        }

        public async Task<List<ServiceDTO>> GetServicesByCategory(int categoryId)
        {
            try
            {
                // Thay đổi cách lấy dịch vụ theo category - dùng service repository
                // Vì không có cột CategoryId trong database, sử dụng điều kiện tạm thời
                // Hoặc cài đặt dựa trên logic nghiệp vụ khác
                
                var allServices = await unitOfWork.ServiceRepository.GetAll();
                // Tạm thời, trả về tất cả dịch vụ thay vì lọc theo categoryId
                var serviceDTOs = mapper.Map<List<ServiceDTO>>(allServices);
                
                // Add ratings from feedback
                foreach (var serviceDTO in serviceDTOs)
                {
                    var ratingInfo = await unitOfWork.FeedbackRepository.GetServiceRatingInfo(serviceDTO.ServiceId);
                    serviceDTO.Rating = ratingInfo.AverageRating;
                    serviceDTO.RatingCount = ratingInfo.Count;
                }
                
                return serviceDTOs;
            }
            catch (Exception ex)
            {
                throw new ServiceException($"Error retrieving services for category ID {categoryId}", ex);
            }
        }

        public async Task<List<ServiceDTO>> GetServicesSortedByRating()
        {
            try
            {
                var services = await unitOfWork.ServiceRepository.GetAll();
                var servicesList = services.ToList();
                var serviceDTOs = mapper.Map<List<ServiceDTO>>(servicesList);
                
                // Cập nhật Rating cho mỗi dịch vụ từ Feedback
                foreach (var serviceDTO in serviceDTOs)
                {
                    var ratingInfo = await unitOfWork.FeedbackRepository.GetServiceRatingInfo(serviceDTO.ServiceId);
                    serviceDTO.Rating = ratingInfo.AverageRating;
                    serviceDTO.RatingCount = ratingInfo.Count;
                }
                
                // Sắp xếp theo rating giảm dần
                return serviceDTOs.OrderByDescending(s => s.Rating ?? 0).ToList();
            }
            catch (Exception ex)
            {
                throw new ServiceException("Error retrieving services sorted by rating", ex);
            }
        }

        public async Task<List<ServiceDTO>> GetServicesSortedByPrice(bool ascending = true)
        {
            try
            {
                var allServices = await unitOfWork.ServiceRepository.GetAll();
                var sortedServices = ascending
                    ? allServices.OrderBy(s => s.Price)
                    : allServices.OrderByDescending(s => s.Price);
                
                return mapper.Map<List<ServiceDTO>>(sortedServices);
            }
            catch (Exception ex)
            {
                throw new ServiceException($"Error retrieving services sorted by price", ex);
            }
        }
    }
}