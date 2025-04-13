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
    public class FeedbackProfile : Profile
    {
        public FeedbackProfile()
        {
            CreateMap<Feedback, FeedbackDTO>()
           .ForMember(dest => dest.FeedbackId, opt => opt.MapFrom(src => src.FeedbackId))
           .ForMember(dest => dest.ReservationId, opt => opt.MapFrom(src => src.ReservationId))
           .ForMember(dest => dest.PatientId, opt => opt.MapFrom(src => src.Reservation.PatientId))
           .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Reservation.Patient.PatientNavigation.UserName))
           .ForMember(dest => dest.PatientImage, opt => opt.MapFrom(src => src.Reservation.Patient.PatientNavigation.AvatarUrl))
           .ForMember(dest => dest.ServiceId, opt => opt.MapFrom(src => src.Reservation.DoctorSchedule.ServiceId))
           .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.Reservation.DoctorSchedule.Service.ServiceName))
           .ForMember(dest => dest.ServiceFeedbackGrade, opt => opt.MapFrom(src => src.ServiceFeedbackGrade))
           .ForMember(dest => dest.ServiceFeedbackContent, opt => opt.MapFrom(src => src.ServiceFeedbackContent))
           .ForMember(dest => dest.DoctorId, opt => opt.MapFrom(src => src.Reservation.DoctorSchedule.DoctorId))
           .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Reservation.DoctorSchedule.Doctor.DoctorNavigation.UserName))
           .ForMember(dest => dest.DoctorFeedbackGrade, opt => opt.MapFrom(src => src.DoctorFeedbackGrade))
           .ForMember(dest => dest.DoctorFeedbackContent, opt => opt.MapFrom(src => src.DoctorFeedbackContent))
            .ForMember(dest => dest.FeedbackDate, opt => opt.MapFrom(src => src.FeedbackDate))
           .ReverseMap();

        }
    }
}
