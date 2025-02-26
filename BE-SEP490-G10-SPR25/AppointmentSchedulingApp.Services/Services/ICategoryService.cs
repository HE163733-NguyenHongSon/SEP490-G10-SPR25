



using AppointmentSchedulingApp.Services.DTOs;

namespace AppointmentSchedulingApp.Services.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDTO>> GetListCategory();
        
    }
}
