﻿using AppointmentSchedulingApp.Application.DTOs;
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
                .ForMember(dest => dest.MainCondition, opt => opt.MapFrom(src => src.Patient.MainCondition))
                .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.Patient.Rank))
                .ForMember(dest => dest.GuardianId, opt => opt.MapFrom(src => src.Patient.GuardianId))
                .ReverseMap();

            CreateMap<User, PatientDetailDTO>()
                .IncludeBase<User, PatientDTO>()                
                .ForMember(dest => dest.Guardian, opt => opt.MapFrom(src => src.Patient.Guardian.GuardianNavigation))
                .ForMember(dest => dest.Dependents, opt => opt.MapFrom(src => src.Guardian.Patients.Select(p=>p.PatientNavigation)))             
                .ForMember(dest => dest.MedicalRecords, opt => opt.MapFrom(src => src.Patient.Reservations.Where(r=>r.Status.Equals("Hoàn thành")).Select(r => r.MedicalRecord)))
                .ReverseMap();

            CreateMap<Patient, GuardianOfPatientDTO>()
                .ForMember(dest => dest.GuardianId, opt => opt.MapFrom(src => src.GuardianId))
                .ReverseMap();

        }
    }
}
