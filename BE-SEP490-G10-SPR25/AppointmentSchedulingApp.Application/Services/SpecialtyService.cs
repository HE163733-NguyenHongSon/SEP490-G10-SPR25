using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;
using AppointmentSchedulingApp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace AppointmentSchedulingApp.Application.Services
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

        public async Task AddSpecialty(SpecialtyDTO specialtyDto)
        {
            try
            {
                // Ensure ID is 0 to let the database generate the ID
                specialtyDto.SpecialtyId = 0;
                
                var specialty = mapper.Map<Specialty>(specialtyDto);
                await unitOfWork.SpecialtyRepository.AddAsync(specialty);
                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                throw new Exception($"Error adding specialty: {ex.Message}", ex);
            }
        }

        public async Task UpdateSpecialty(SpecialtyDTO specialtyDto)
        {
            try
            {
                var existingSpecialty = await unitOfWork.SpecialtyRepository.Get(s => s.SpecialtyId == specialtyDto.SpecialtyId);
                if (existingSpecialty == null)
                {
                    throw new ValidationException($"Specialty with ID {specialtyDto.SpecialtyId} not found");
                }

                // Don't update the ID, it should remain the same
                // We're only mapping other properties from the DTO to the entity
                mapper.Map(specialtyDto, existingSpecialty);
                
                unitOfWork.SpecialtyRepository.Update(existingSpecialty);
                await unitOfWork.CommitAsync();
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                throw new Exception($"Error updating specialty: {ex.Message}", ex);
            }
        }

        public async Task DeleteSpecialty(int id)
        {
            try
            {
                var specialty = await unitOfWork.SpecialtyRepository.Get(s => s.SpecialtyId == id);
                if (specialty == null)
                {
                    throw new ValidationException($"Specialty with ID {id} not found");
                }

                unitOfWork.SpecialtyRepository.Remove(specialty);
                await unitOfWork.CommitAsync();
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                throw new Exception($"Error deleting specialty: {ex.Message}", ex);
            }
        }
    }
}
