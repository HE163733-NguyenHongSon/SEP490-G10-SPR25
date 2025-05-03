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
            
             .ForMember(dest => dest.Patient, opt => opt.MapFrom(src => src.Patient.PatientNavigation))
             .ForMember(dest => dest.DoctorSchedule, opt => opt.MapFrom(src => src.DoctorSchedule))          
             .ForMember(dest => dest.PaymentStatus, opt => opt.MapFrom(src => src.Payment.PaymentStatus))          
             .ReverseMap();   


             CreateMap<Reservation, ReservationStatusDTO>()
             .ForMember(dest => dest.CancellationReason, opt => opt.MapFrom(src => src.CancellationReason))
             .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
             .ReverseMap();

            CreateMap<AddedReservationDTO, Reservation>().ReverseMap();



        }
    }
}