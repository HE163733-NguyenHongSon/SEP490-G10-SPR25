using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AutoMapper;

namespace AppointmentSchedulingApp.Application.Services
{
    public class SlotService : ISlotService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }
        private readonly AppointmentSchedulingDbContext _dbcontext;

        public SlotService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbcontext)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            _dbcontext = dbcontext;
        }
        public async Task<List<SlotDTO>> GetSlotList()
        {
            try
            {
                var slots = await unitOfWork.SlotRepository.GetAll();
                return mapper.Map<List<SlotDTO>>(slots);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<SlotDTO> GetSlotDetailById(int slotId)
        {
            try
            {
                var slot = await unitOfWork.SlotRepository.Get(p => p.SlotId.Equals(slotId));
                if (slot == null)
                {
                    return null;
                }
                return mapper.Map<SlotDTO>(slot);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
