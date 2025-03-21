using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Profiles
{
    public class ReservationProfile:Profile

    {
        public ReservationProfile()
        {
            
             CreateMap<Reservation,ReservationDTO>()
             .ForMember(dest => dest.ReservationId, opt => opt.MapFrom(src => src.ReservationId))
             .ForMember(dest => dest.PatientId, opt => opt.MapFrom(src => src.PatientId))
             .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.PatientNavigation.UserName))
             .ForMember(dest => dest.PatientPhone, opt => opt.MapFrom(src => src.Patient.PatientNavigation.Phone))
             .ForMember(dest => dest.PatientEmail, opt => opt.MapFrom(src => src.Patient.PatientNavigation.Email))
             .ForMember(dest => dest.AppointmentDate, opt => opt.MapFrom(src => src.AppointmentDate.HasValue? src.AppointmentDate.Value.ToString("dd/MM/yyyy"):""))
             .ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => src.UpdatedDate.ToString("dd/MM/yyyy hh:mm:ss ")))
             //.ForMember(dest => dest.ServiceImage, opt => opt.MapFrom(src => src.DoctorSchedule.Service.Image))
             //.ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.DoctorSchedule.Service.ServiceName))
             //.ForMember(dest => dest.ServicePrice, opt => opt.MapFrom(src => src.DoctorSchedule.Service.Price.ToString("N0")))
             //.ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.DoctorSchedule.Doctor.DoctorNavigation.UserName))
             //.ForMember(dest => dest.SlotStartTime, opt => opt.MapFrom(src => src.DoctorSchedule.Slot.SlotStartTime))
             //.ForMember(dest => dest.SlotEndTime, opt => opt.MapFrom(src => src.DoctorSchedule.Slot.SlotEndTime))
             //.ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.DoctorSchedule.Room.RoomName))
             //.ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.DoctorSchedule.Room.Location))
             .ForMember(dest => dest.Reason, opt => opt.MapFrom(src => src.Reason))
             .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))



             .ReverseMap();   
;
        }
    }
}
