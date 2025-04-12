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
    public class DoctorProfile : Profile
    {
        public DoctorProfile()
        {
            CreateMap<Doctor, DoctorDTO>()
            .ForMember(dest => dest.DoctorId, opt => opt.MapFrom(src => src.DoctorId))
            .ForMember(dest => dest.AcademicTitle, opt => opt.MapFrom(src => src.AcademicTitle))
            .ForMember(dest => dest.Degree, opt => opt.MapFrom(src => src.Degree))
            .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.DoctorNavigation.UserName))
            .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.DoctorNavigation.AvatarUrl))
            .ForMember(dest => dest.CurrentWork, opt => opt.MapFrom(src => src.CurrentWork))
            .ForMember(dest => dest.BasicDescription, opt => opt.MapFrom(src => new string(src.DoctorDescription.Take(50).ToArray())))
            .ForMember(dest => dest.SpecialtyNames, opt => opt.MapFrom(src => src.Specialties.Select(s => s.SpecialtyName).ToArray()))
            .ForMember(dest => dest.NumberOfService, opt => opt.MapFrom(src => src.Services.Count))         
             .ForMember(dest => dest.NumberOfExamination, opt => opt.MapFrom(src => src.DoctorSchedules.
             SelectMany(ds => ds.Reservations.Where(r => r.Status.Equals("Hoàn thành"))).ToList().Count))         
            .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))         
            .ForMember(dest => dest.RatingCount, opt => opt.MapFrom(src => src.RatingCount))         
            .ReverseMap();


            CreateMap<Doctor, DoctorDetailDTO>()
                .IncludeBase<Doctor, DoctorDTO>()
                .ForMember(dest => dest.DetailDescription, opt => opt.MapFrom(src => src.DoctorDescription))
                .ForMember(dest => dest.WorkExperience, opt => opt.MapFrom(src => src.WorkExperience))
                .ForMember(dest => dest.Organization, opt => opt.MapFrom(src => src.Organization))
                .ForMember(dest => dest.Prize, opt => opt.MapFrom(src => src.Prize))
                .ForMember(dest => dest.ResearchProject, opt => opt.MapFrom(src => src.ResearchProject))
                .ForMember(dest => dest.TrainingProcess, opt => opt.MapFrom(src => src.TrainingProcess))
                .ForMember(dest => dest.Schedules, opt => opt.MapFrom(src => src.DoctorSchedules))
                .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.Services))
                .ForMember(dest => dest.Feedbacks, opt => opt.MapFrom(src => src.DoctorSchedules.SelectMany(ds => ds.Reservations).Where(r => r.Status.Equals("Hoàn thành") && r.Feedback != null).Select(r => r.Feedback)))
                .ForMember(dest => dest.RelevantDoctors, opt => opt.MapFrom(src => src.Specialties.SelectMany(sp=>sp.Doctors).Where(dr=>dr.DoctorId!=src.DoctorId)))
                .ReverseMap();
                 
               


        }
    }
}  