using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.Contracts.UnitOfWork;
using AppointmentSchedulingApp.Domain.DTOs;
using AutoMapper;

namespace AppointmentSchedulingApp.Services
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
