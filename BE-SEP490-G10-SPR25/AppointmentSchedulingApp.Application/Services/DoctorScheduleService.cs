using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class DoctorScheduleService : IDoctorScheduleService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }
        private readonly AppointmentSchedulingDbContext _dbcontext;

        public DoctorScheduleService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbcontext)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            _dbcontext = dbcontext;
        }
        public async Task<List<DoctorScheduleDTO>> GetDoctorScheduleListByServiceId(int serviceId)
        {

            var query = unitOfWork.DoctorScheduleRepository.GetQueryable(ds => ds.ServiceId.Equals(serviceId));
            return await query.ProjectTo<DoctorScheduleDTO>(mapper.ConfigurationProvider).ToListAsync();

        }

        public async Task<List<DoctorScheduleDTO>> GetDoctorScheduleList()
        {
            var query = unitOfWork.DoctorScheduleRepository.GetQueryable();
            return await query.ProjectTo<DoctorScheduleDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        //public async Task<List<DoctorScheduleDTO>> GetDoctorScheduleList()
        //{
        //    try
        //    {
        //        var doctorSchedule = await _dbcontext.DoctorSchedules.Include(d => d.Doctor)
        //            .ThenInclude(u => u.DoctorNavigation)
        //            .Include(d => d.Slot)
        //            .Include(d => d.Service)
        //            .Include(d => d.Room)
        //            .Where(d => d.Doctor.DoctorNavigation.Roles.Any(r => r.RoleId.Equals(4)))
        //            .Select(d => new DoctorScheduleDTO
        //            {
        //                DoctorScheduleId = d.DoctorScheduleId,
        //                DoctorId = d.DoctorId,
        //                ServiceId = d.ServiceId,
        //                DayOfWeek = d.DayOfWeek,
        //                RoomId = d.RoomId,
        //                SlotId = d.SlotId,
        //                DoctorName = d.Doctor.DoctorNavigation.UserName,
        //                ServiceName = d.Service.ServiceName,
        //                RoomName = d.Room.RoomName,
        //                SlotStartTime = d.Slot.SlotStartTime,
        //                SlotEndTime = d.Slot.SlotEndTime
        //            })
        //            .ToListAsync();

        //        return doctorSchedule;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}

        public async Task<DoctorScheduleDTO> GetDoctorScheduleDetailById(int doctorScheduleId)
        {
            try
            {
                var doctorSchedule = await _dbcontext.DoctorSchedules.Include(d => d.Doctor)
                    .ThenInclude(u => u.DoctorNavigation)
                    .Include(d => d.Slot)
                    .Include(d => d.Service)
                    .Include(d => d.Room)
                    .Where(d => d.DoctorScheduleId == doctorScheduleId)
                    .Select(d => new DoctorScheduleDTO
                    {
                        DoctorScheduleId = d.DoctorScheduleId,
                        DoctorId = d.DoctorId,
                        ServiceId = d.ServiceId,
                        DayOfWeek = d.DayOfWeek,
                        RoomId = d.RoomId,
                        SlotId = d.SlotId,
                        DoctorName = d.Doctor.DoctorNavigation.UserName,
                        ServiceName = d.Service.ServiceName,
                        RoomName = d.Room.RoomName,
                        SlotStartTime = d.Slot.SlotStartTime,
                        SlotEndTime = d.Slot.SlotEndTime
                    })
                    .FirstOrDefaultAsync();

                return doctorSchedule;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<bool> UpdateDoctorSchedule(DoctorScheduleUpdateDTO doctorScheduleUpdateDTO)
        {
            try
            {
                var doctorSchedule = await _dbcontext.DoctorSchedules
                    .Where(d => d.DoctorScheduleId == doctorScheduleUpdateDTO.DoctorScheduleId)
                    .FirstOrDefaultAsync();
                if(doctorSchedule == null)
                {
                    return false;
                }
                
                doctorSchedule.DoctorId = doctorScheduleUpdateDTO.DoctorId;
                doctorSchedule.ServiceId = doctorScheduleUpdateDTO.ServiceId;
                doctorSchedule.DayOfWeek = doctorScheduleUpdateDTO.DayOfWeek;
                doctorSchedule.RoomId = doctorScheduleUpdateDTO.RoomId;
                doctorSchedule.SlotId = doctorScheduleUpdateDTO.SlotId;
                _dbcontext.DoctorSchedules.Update(doctorSchedule);
                await _dbcontext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<bool> AddDoctorSchedule(DoctorScheduleAddDTO doctorScheduleAddDTO)
        {
            try
            {
                var doctorSchedule = new DoctorSchedule
                {
                    DoctorId = doctorScheduleAddDTO.DoctorId,
                    ServiceId = doctorScheduleAddDTO.ServiceId,
                    DayOfWeek = doctorScheduleAddDTO.DayOfWeek,
                    RoomId = doctorScheduleAddDTO.RoomId,
                    SlotId = doctorScheduleAddDTO.SlotId
                };

                _dbcontext.DoctorSchedules.Add(doctorSchedule);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public async Task<List<DoctorScheduleDTO>> FilterAndSearchDoctorSchedule(string? doctorName,int? serviceId, string? day, int? roomId, int? slotId)
        {
            try
            {
                var query =  _dbcontext.DoctorSchedules.AsQueryable();

                if (!string.IsNullOrWhiteSpace(doctorName))
                {
                    var trimmedName = doctorName.Trim();
                    query = query.Where(ds =>
                        ds.Doctor.DoctorNavigation.UserName.Contains(trimmedName));
                }

                if (serviceId.HasValue)
                {
                    query = query.Where(ds => ds.ServiceId == serviceId.Value);
                }

                if (!string.IsNullOrEmpty(day))
                {
                    query = query.Where(ds => ds.DayOfWeek == day);
                }

                if (roomId.HasValue)
                {
                    query = query.Where(ds => ds.RoomId == roomId.Value);
                }

                if (slotId.HasValue)
                {
                    query = query.Where(ds => ds.SlotId == slotId.Value);
        }

                var doctorSchedules =  query.Include(d => d.Doctor)
                    .ThenInclude(u => u.DoctorNavigation)
                    .Include(d => d.Slot)
                    .Include(d => d.Service)
                    .Include(d => d.Room)
                    .Select(d => new DoctorScheduleDTO
                    {
                        DoctorScheduleId = d.DoctorScheduleId,
                        DoctorId = d.DoctorId,
                        ServiceId = d.ServiceId,
                        DayOfWeek = d.DayOfWeek,
                        RoomId = d.RoomId,
                        SlotId = d.SlotId,
                        DoctorName = d.Doctor.DoctorNavigation.UserName,
                        ServiceName = d.Service.ServiceName,
                        RoomName = d.Room.RoomName,
                        SlotStartTime = d.Slot.SlotStartTime,
                        SlotEndTime = d.Slot.SlotEndTime
                    }).ToListAsync();

                return await doctorSchedules;
            }
            catch (Exception ex)
        {
                throw;
            }
        }

        public async Task<List<DoctorScheduleDTO>> SearchDoctorScheduleByDoctorName(string? doctorName)
        {
            var query = _dbcontext.DoctorSchedules
                .Include(ds => ds.Doctor)
                    .ThenInclude(d => d.DoctorNavigation)
                .Include(ds => ds.Slot)
                .Include(ds => ds.Service)
                .Include(ds => ds.Room)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(doctorName))
            {
                query = query.Where(ds =>
                    ds.Doctor.DoctorNavigation.UserName.Contains(doctorName));
        }

            var doctorSchedules = await query.Select(d => new DoctorScheduleDTO
        {
                DoctorScheduleId = d.DoctorScheduleId,
                DoctorId = d.DoctorId,
                ServiceId = d.ServiceId,
                DayOfWeek = d.DayOfWeek,
                RoomId = d.RoomId,
                SlotId = d.SlotId,
                DoctorName = d.Doctor.DoctorNavigation.UserName,
                ServiceName = d.Service.ServiceName,
                RoomName = d.Room.RoomName,
                SlotStartTime = d.Slot.SlotStartTime,
                SlotEndTime = d.Slot.SlotEndTime
            }).ToListAsync();

            return doctorSchedules;
        }

    }
}
