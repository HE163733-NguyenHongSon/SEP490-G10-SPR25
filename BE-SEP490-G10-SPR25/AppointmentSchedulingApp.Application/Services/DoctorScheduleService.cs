using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System;
using System.Collections.Generic;
using System.Collections.Generic;
using System.Linq;
using System.Linq;
using System.Text;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AppointmentSchedulingApp.Application.Services
{
    public class DoctorScheduleService : IDoctorScheduleService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }
        private readonly AppointmentSchedulingDbContext _dbcontext;
        public IReservationService reservationService { get; set; }

        public DoctorScheduleService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbcontext, IReservationService reservationService)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            _dbcontext = dbcontext;
            this.reservationService = reservationService;
        }

        public async Task<List<DoctorScheduleDTO>> GetDoctorScheduleListByServiceId(int serviceId)
        {

            var query = unitOfWork.DoctorScheduleRepository.GetQueryable(ds => ds.ServiceId.Equals(serviceId));
            return await query.ProjectTo<DoctorScheduleDTO>(mapper.ConfigurationProvider).ToListAsync();

        }
        public async Task<List<AvailableScheduleDTO>> GetProposedDoctorSchedulesByServiceId(int serviceId)
        {

            var doctorSchedules = await GetDoctorScheduleListByServiceId(serviceId);
            int weeks = 1;

            var dayMap = new Dictionary<string, DayOfWeek>
            {
                ["Chủ Nhật"] = DayOfWeek.Sunday,
                ["Thứ Hai"] = DayOfWeek.Monday,
                ["Thứ Ba"] = DayOfWeek.Tuesday,
                ["Thứ Tư"] = DayOfWeek.Wednesday,
                ["Thứ Năm"] = DayOfWeek.Thursday,
                ["Thứ Sáu"] = DayOfWeek.Friday,
                ["Thứ Bảy"] = DayOfWeek.Saturday
            };

            var results = new List<AvailableScheduleDTO>();

            var today = DateTime.Today;

            foreach (var schedule in doctorSchedules)
            {
                if (!dayMap.TryGetValue(schedule.DayOfWeek, out var targetDay))
                    continue;

                for (int i = 0; i < weeks * 7; i++)
                {
                    var date = today.AddDays(i);

                    if (date.DayOfWeek == targetDay)
                    {
                        var fullDateTime = DateTime.SpecifyKind(
                            date.Add((schedule.SlotStartTime ?? TimeOnly.MinValue).ToTimeSpan()),
                            DateTimeKind.Unspecified
                        );


                        results.Add(new AvailableScheduleDTO
                        {
                            DoctorScheduleId = schedule.DoctorScheduleId,
                            DoctorId = schedule.DoctorId,
                            DoctorName = $"{schedule.Degree},{schedule.AcademicTitle},{schedule.DoctorName}",
                            AppointmentDate = fullDateTime,
                            SlotId = schedule.SlotId,
                            SlotStartTime = schedule.SlotStartTime,
                            SlotEndTime = schedule.SlotEndTime
                        });
                    }
                }
            }

            var sortedResults = results.OrderBy(r => r.AppointmentDate).ToList();


            return sortedResults;

        }
        public async Task<List<AvailableScheduleDTO>> GetAvailableSchedulesByServiceId(int serviceId)
        {
            var proposedSchedules = await GetProposedDoctorSchedulesByServiceId(serviceId);
            var activeReservation = await reservationService.GetActiveReservationsForThisWeek();

            var nowVN = DateTime.UtcNow.AddHours(12);
            var availableSchedules = proposedSchedules.Where(proposed =>
            {
                bool isNotOverlapping = !activeReservation.Any(active =>
                    active.DoctorSchedule.DoctorScheduleId == proposed.DoctorScheduleId &&
                    active.AppointmentDate == proposed.AppointmentDate
                );

                bool isAfterNowPlusFive = proposed.AppointmentDate > nowVN;

                return isNotOverlapping && isAfterNowPlusFive;
            }).ToList();

            return availableSchedules;

        }


        public async Task<List<DoctorScheduleDTO>> GetDoctorScheduleList()
        {
            var query = unitOfWork.DoctorScheduleRepository.GetQueryable();
            return await query.ProjectTo<DoctorScheduleDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

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
                if (doctorSchedule == null)
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

        public async Task<List<DoctorScheduleDTO>> FilterAndSearchDoctorSchedule(string? doctorName, int? serviceId, string? day, int? roomId, int? slotId)
        {
            try
            {
                var query = _dbcontext.DoctorSchedules.AsQueryable();

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

                var doctorSchedules = query.Include(d => d.Doctor)
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

        public async Task<List<DoctorScheduleDTO>> GetAlternativeDoctorList(int doctorScheduleId)
        {
            try
            {
                var doctorSchedule = unitOfWork.DoctorScheduleRepository.Get(d => d.DoctorScheduleId.Equals(doctorScheduleId)).Result;

                // danh sach bac si co the thay the
                var doctorSchedules = unitOfWork.DoctorScheduleRepository
                    .GetQueryable(d => d.DoctorId != doctorSchedule.DoctorId
                                && d.ServiceId == doctorSchedule.ServiceId
                                && d.DayOfWeek == doctorSchedule.DayOfWeek
                                && d.SlotId == doctorSchedule.SlotId
                                //&& d.RoomId != doctorSchedule.RoomId
                                );

                return await doctorSchedules.ProjectTo<DoctorScheduleDTO>(mapper.ConfigurationProvider).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<DoctorScheduleDTO>> IsDoctorBusyAtReservation(int reservationId)
        {
            try
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId.Equals(reservationId));

                if (reservation == null)
                {
                    return null;
                }

                // danh sach reservation cung ngay
                var listReservationSameDay = (await unitOfWork.ReservationRepository
                    .GetAll(d => d.AppointmentDate.Date == reservation.AppointmentDate.Date))
                    .ToList();

                // danh sach doctorschedule tuong tu voi doctor can thay the
                var listDoctorSchedule = GetAlternativeDoctorList(reservation.DoctorScheduleId).Result;

                // gan ket qua ban dau la toan bo danh sach
                var result = new List<DoctorScheduleDTO>(listDoctorSchedule);

                // duyet qua tung reservation cung ngay
                foreach (var r in listReservationSameDay)
                {
                    // neu trong danh sach result co phan tu trung doctorscheduleId thi loai
                    foreach(var ds in result)
                    {
                        if (ds.DoctorScheduleId == r.DoctorScheduleId)
                        {
                            result.Remove(ds);
                        }
                    }

                    //var existed = result.FirstOrDefault(ds => ds.DoctorScheduleId == r.DoctorScheduleId);
                    //if (existed != null)
                    //{
                    //    result.Remove(existed);
                    //}
                }

                return result;
            }
            catch
            {
                throw;
            }
        }

    }

}
