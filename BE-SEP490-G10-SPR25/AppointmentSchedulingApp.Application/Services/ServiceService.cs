using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;
using AppointmentSchedulingApp.Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;

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
                var query = unitOfWork.ServiceRepository.GetQueryable();
                return await query.ProjectTo<ServiceDTO>(mapper.ConfigurationProvider).ToListAsync();

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
                var service = await unitOfWork.ServiceRepository.Get(s=>s.ServiceId.Equals(id));
                if (service == null)
                {
                    throw new NotFoundException($"Service with ID {id} not found");
                }
                
                var serviceDTO = mapper.Map<ServiceDTO>(service);
                
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
                var service = await unitOfWork.ServiceRepository.Get(s => s.ServiceId.Equals(id));
                if (service == null)
                {
                    throw new NotFoundException($"Service with ID {id} not found");
                }

                var serviceDetail = mapper.Map<ServiceDetailDTO>(service);
                
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

                // Validate that the SpecialtyId exists in the database
                var specialty = await unitOfWork.SpecialtyRepository.Get(s => s.SpecialtyId == serviceDto.SpecialtyId);
                if (specialty == null)
                {
                    throw new ValidationException($"Specialty with ID {serviceDto.SpecialtyId} does not exist. Please select a valid specialty.");
                }

                // Additional validations
                if (string.IsNullOrWhiteSpace(serviceDto.ServiceName))
                {
                    throw new ValidationException("Service name is required");
                }

                if (serviceDto.Price <= 0)
                {
                    throw new ValidationException("Price must be greater than zero");
                }

                var service = mapper.Map<Service>(serviceDto);
                unitOfWork.ServiceRepository.Add(service);
                await unitOfWork.CommitAsync();
            }
            catch (ValidationException)
            {
                // Just rethrow validation exceptions
                throw;
            }
            catch (Exception ex)
            {
                unitOfWork.Rollback();
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

                var existingService = await unitOfWork.ServiceRepository.Get(s => s.ServiceId.Equals(serviceDto.ServiceId));
                if (existingService == null)
                {
                    throw new NotFoundException($"Service with ID {serviceDto.ServiceId} not found");
                }

                // Map DTO values to existing entity
                mapper.Map(serviceDto, existingService);
                
                // Update the existing entity
                unitOfWork.ServiceRepository.Update(existingService);
                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                unitOfWork.Rollback();
                throw new ServiceException($"Error updating service with ID {serviceDto?.ServiceId}", ex);
            }
        }
                                 
        public async Task DeleteService(int id)     
        { 
            try
            {
                // Get service
                var service = await unitOfWork.ServiceRepository.Get(s => s.ServiceId.Equals(id));
                if (service == null)
                {
                    throw new NotFoundException($"Service with ID {id} not found");
                }

                // Get all reservations for this service
                var reservations = await unitOfWork.ReservationRepository.GetAll(
                    r => r.DoctorSchedule != null && 
                         r.DoctorSchedule.ServiceId == id
                );

                // Check for active reservations
                var hasActiveReservations = reservations.Any(r => 
                    r.Status != "Cancelled" && 
                    r.Status != "Completed"
                );

                if (hasActiveReservations)
                {
                    throw new ValidationException("Cannot delete service with active reservations");
                }

                // Get all doctors that provide this service
                var doctors = await unitOfWork.DoctorRepository.GetAll();
                foreach (var doctor in doctors)
                {
                    // Remove service from doctor's services
                    if (doctor.Services.Any(s => s.ServiceId == id))
                    {
                        var serviceToRemove = doctor.Services.First(s => s.ServiceId == id);
                        doctor.Services.Remove(serviceToRemove);
                        unitOfWork.DoctorRepository.Update(doctor);
                    }

                    // Remove service from doctor's schedules
                    var schedulesToRemove = doctor.DoctorSchedules.Where(ds => ds.ServiceId == id).ToList();
                    foreach (var schedule in schedulesToRemove)
                    {
                        doctor.DoctorSchedules.Remove(schedule);
                    }
                    if (schedulesToRemove.Any())
                    {
                        unitOfWork.DoctorRepository.Update(doctor);
                    }
                }

                // Delete all related reservations
                foreach (var reservation in reservations)
                {
                    unitOfWork.ReservationRepository.Remove(reservation);
                }

                // Finally delete the service
                unitOfWork.ServiceRepository.Remove(service);
                await unitOfWork.CommitAsync();
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                throw new ServiceException($"Error deleting service with ID {id}", ex);
            }
        }

        public async Task<List<ServiceDTO>> GetServicesBySpecialty(int specialtyId)
        {
            try
            {
                var query = unitOfWork.ServiceRepository.GetQueryable(s=>s.SpecialtyId.Equals(specialtyId));
                return await query.ProjectTo<ServiceDTO>(mapper.ConfigurationProvider).ToListAsync();
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
                // Since we don't have a CategoryId column, we'll return all services for now
                var allServices = await unitOfWork.ServiceRepository.GetAll();
                var serviceDTOs = mapper.Map<List<ServiceDTO>>(allServices);
                
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
                var serviceDTOs = mapper.Map<List<ServiceDTO>>(services);
                
                // Sort by rating in descending order
                return serviceDTOs.OrderByDescending(s => s.Rating).ToList();
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
                var services = await unitOfWork.ServiceRepository.GetAll();
                var serviceDTOs = mapper.Map<List<ServiceDTO>>(services);

                // Sort by price
                return ascending 
                    ? serviceDTOs.OrderBy(s => s.Price).ToList() 
                    : serviceDTOs.OrderByDescending(s => s.Price).ToList();
            }
            catch (Exception ex)
            {
                throw new ServiceException("Error retrieving services sorted by price", ex);
            }
        }
    }
} 