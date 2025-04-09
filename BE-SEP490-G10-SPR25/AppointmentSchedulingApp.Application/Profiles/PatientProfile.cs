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
    public class PatientProfile : Profile
    {
        public PatientProfile()
        {
            CreateMap<User, PatientDTO>()
                .IncludeBase<User, UserDTO>()

                //.ForMember(dest => dest.PatientId, opt => opt.MapFrom(src => src.PatientId))
                //.ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.UserNavigation.UserName))
                .ForMember(dest => dest.MainCondition, opt => opt.MapFrom(src => src.PatientNavigation.MainCondition))
                .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.PatientNavigation.Rank))
                .ForMember(dest => dest.GuardianId, opt => opt.MapFrom(src => src.PatientNavigation.GuardianId))
                .ReverseMap();

            CreateMap<User, PatientDetailDTO>()
                .IncludeBase<User, PatientDTO>()
                
                .ForMember(dest => dest.GuardianName, opt => opt.MapFrom(src => src.PatientNavigation.Guardian.UserName))
                .ForMember(dest => dest.GuardianPhone, opt => opt.MapFrom(src => src.PatientNavigation.Guardian.Phone))
                .ForMember(dest => dest.GuardianEmail, opt => opt.MapFrom(src => src.PatientNavigation.Guardian.Email))
                .ForMember(dest => dest.MedicalRecords, opt => opt.MapFrom(src => src.PatientNavigation.Reservations.Select(r => r.MedicalRecord)))
                .ReverseMap();

            CreateMap<Patient, GuardianOfPatientDTO>()
                .ForMember(dest => dest.GuardianId, opt => opt.MapFrom(src => src.GuardianId))
                .ReverseMap();

        }
    }
}
