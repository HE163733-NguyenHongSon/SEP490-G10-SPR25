using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IRoomService
    {
        Task<List<RoomDTO>> GetRoomList();
        Task<RoomDTO> GetRoomDetailById(int roomId);

    }
}
