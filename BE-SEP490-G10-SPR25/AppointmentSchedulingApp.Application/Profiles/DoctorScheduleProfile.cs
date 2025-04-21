using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using AutoMapper;

namespace AppointmentSchedulingApp.Application.Profiles
{
    public class DoctorScheduleProfile : Profile
    {
        public DoctorScheduleProfile()
        {
            CreateMap<DoctorSchedule, DoctorScheduleDTO>()
                //.ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor.DoctorNavigation.UserName)) 
                //.ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.Service.ServiceName))
                //.ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.Room.RoomName))
                //.ForMember(dest => dest.SlotStartTime, opt => opt.MapFrom(src => src.Slot.SlotStartTime))             
                //.ForMember(dest => dest.SlotEndTime, opt => opt.MapFrom(src => src.Slot.SlotEndTime))

                .ForMember(dest => dest.DoctorScheduleId, opt => opt.MapFrom(src => src.DoctorScheduleId))
                .ForMember(dest => dest.DoctorId, opt => opt.MapFrom(src => src.DoctorId))
                .ForMember(dest => dest.ServiceId, opt => opt.MapFrom(src => src.ServiceId))
                .ForMember(dest => dest.DayOfWeek, opt => opt.MapFrom(src => src.DayOfWeek))
                .ForMember(dest => dest.RoomId, opt => opt.MapFrom(src => src.RoomId))
                .ForMember(dest => dest.SlotId, opt => opt.MapFrom(src => src.SlotId))
                .ReverseMap();
        }
    }
}
