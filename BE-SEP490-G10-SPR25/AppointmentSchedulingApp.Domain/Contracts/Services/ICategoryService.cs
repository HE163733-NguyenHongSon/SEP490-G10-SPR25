



using AppointmentSchedulingApp.Domain.DTOs;

namespace AppointmentSchedulingApp.Domain.Contracts.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDTO>> GetListCategory();
        
    }
}
