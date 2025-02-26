using AppointmentSchedulingApp.Domain.UnitOfWork;
using AppointmentSchedulingApp.Services.DTOs;
using AutoMapper;

namespace AppointmentSchedulingApp.Services.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }

        public CategoryService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        public async Task<List<CategoryDTO>> GetListCategory()
        {
           return  mapper.Map<List<CategoryDTO>>(unitOfWork.CategoryRepository.GetAll());
        }
    }
}
