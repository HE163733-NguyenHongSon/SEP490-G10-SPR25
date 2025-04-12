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
                .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor.DoctorNavigation.UserName)) 
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.Service.ServiceName))
                .ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.Room.RoomName))
                .ForMember(dest => dest.SlotStartTime, opt => opt.MapFrom(src => src.Slot.SlotStartTime))             
                .ForMember(dest => dest.SlotEndTime, opt => opt.MapFrom(src => src.Slot.SlotEndTime)).ReverseMap();
        }
    }
}
