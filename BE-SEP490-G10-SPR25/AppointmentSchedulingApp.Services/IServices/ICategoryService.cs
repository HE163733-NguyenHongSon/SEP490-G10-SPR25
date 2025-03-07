using AppointmentSchedulingApp.Services.DTOs;

namespace AppointmentSchedulingApp.Services.IServices
{
    public interface ICategoryService
    {
        Task<List<CategoryDTO>> GetListCategory();

    }
}
