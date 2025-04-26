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
                .ForMember(dest => dest.DoctorImage, opt => opt.MapFrom(src => src.Doctor.DoctorNavigation.AvatarUrl))
                .ForMember(dest => dest.Degree, opt => opt.MapFrom(src => src.Doctor.Degree))
                .ForMember(dest => dest.AcademicTitle, opt => opt.MapFrom(src => src.Doctor.AcademicTitle))
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.Service.ServiceName))
                .ForMember(dest => dest.ServiceImage, opt => opt.MapFrom(src => src.Service.Image))
                .ForMember(dest => dest.ServicePrice, opt => opt.MapFrom(src => $"{src.Service.Price:N0} VNĐ"))
                .ForMember(dest => dest.IsPrepayment, opt => opt.MapFrom(src =>src.Service.IsPrepayment))
                .ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.Room.RoomName))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Room.Location))
                .ForMember(dest => dest.SlotStartTime, opt => opt.MapFrom(src => src.Slot.SlotStartTime))
                .ForMember(dest => dest.SlotEndTime, opt => opt.MapFrom(src => src.Slot.SlotEndTime)).ReverseMap();
        }
    }
}
