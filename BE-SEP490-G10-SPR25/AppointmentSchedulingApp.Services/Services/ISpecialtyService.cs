using AppointmentSchedulingApp.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services.Services
{
    public interface ISpecialtyService
    {
        Task<List<SpecialtyDTO>> GetSpecialtyList();
        Task<SpecialtyDetailDTO> GetSpecialtyDetailById(int id);
    }
}
