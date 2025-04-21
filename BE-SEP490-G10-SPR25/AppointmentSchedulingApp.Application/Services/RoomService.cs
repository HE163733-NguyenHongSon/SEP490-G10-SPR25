using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.UnitOfWork;
using AutoMapper;

namespace AppointmentSchedulingApp.Application.Services
{
    public class RoomService : IRoomService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }
        private readonly AppointmentSchedulingDbContext _dbcontext;

        public RoomService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbcontext)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            _dbcontext = dbcontext;
        }
        public async Task<List<RoomDTO>> GetRoomList()
        {
            try
            {
                var rooms = await unitOfWork.RoomRepository.GetAll();
                return mapper.Map<List<RoomDTO>>(rooms);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<RoomDTO> GetRoomDetailById(int roomId)
        {
            try
            {
                var room = await unitOfWork.RoomRepository.Get(p => p.RoomId.Equals(roomId));
                if (room == null)
                {
                    return null;
                }
                return mapper.Map<RoomDTO>(room);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
    
}
