using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.DTOs;
using AutoMapper;

namespace AppointmentSchedulingApp.Services.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper mapper;
        private readonly ICategoryRepository categoryRepository;

        public CategoryService(IMapper mapper, ICategoryRepository categoryRepository)
        {
            this.mapper = mapper;
            this.categoryRepository = categoryRepository;
        }

        public async Task<List<CategoryDTO>> GetListCategory()
        {
           return  mapper.Map<List<CategoryDTO>>(categoryRepository.GetAll());
        }
    }
}
