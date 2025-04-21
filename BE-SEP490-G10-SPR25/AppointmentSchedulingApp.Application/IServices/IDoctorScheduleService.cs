using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IDoctorScheduleService
    {
        Task<List<DoctorScheduleDTO>> GetDoctorScheduleList();
        Task<DoctorScheduleDTO> GetDoctorScheduleDetailById(int doctorScheduleId);

        Task<bool> UpdateDoctorSchedule(DoctorScheduleUpdateDTO doctorScheduleUpdateDTO);
        Task<bool> AddDoctorSchedule(DoctorScheduleAddDTO doctorScheduleAddDTO);

        Task<List<DoctorScheduleDTO>> FilterAndSearchDoctorSchedule(string? doctorName, int? serviceId,string? day ,int? roomId ,int? slotId);

        Task<List<DoctorScheduleDTO>> SearchDoctorScheduleByDoctorName(string? doctorName);
    }
}
