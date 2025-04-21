using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface ISlotService
    {
        Task<List<SlotDTO>> GetSlotList();
        Task<SlotDTO> GetSlotDetailById(int slotId);
    }
}
