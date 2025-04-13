using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface ISpecialtyService
    {
        Task<List<SpecialtyDTO>> GetSpecialtyList();
        Task<SpecialtyDetailDTO> GetSpecialtyDetailById(int id);
        Task AddSpecialty(SpecialtyDTO specialtyDto);
        Task UpdateSpecialty(SpecialtyDTO specialtyDto);
        Task DeleteSpecialty(int id);
    }
}
