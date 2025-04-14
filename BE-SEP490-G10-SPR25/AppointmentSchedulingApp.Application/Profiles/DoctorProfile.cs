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
    public class DoctorProfile : Profile
    {
        public DoctorProfile()
        {
            CreateMap<User, DoctorDTO>()
            .IncludeBase<User, UserDTO>()
           .ForMember(dest => dest.AcademicTitle, opt => opt.MapFrom(src => src.Doctor.AcademicTitle))
           .ForMember(dest => dest.Degree, opt => opt.MapFrom(src => src.Doctor.Degree))
           .ForMember(dest => dest.CurrentWork, opt => opt.MapFrom(src => src.Doctor.CurrentWork))
           .ForMember(dest => dest.DoctorDescription, opt => opt.MapFrom(src => src.Doctor.DoctorDescription))
           .ForMember(dest => dest.SpecialtyNames, opt => opt.MapFrom(src => src.Doctor.Specialties.Select(s => s.SpecialtyName).ToArray()))
           .ForMember(dest => dest.NumberOfService, opt => opt.MapFrom(src => src.Doctor.Services.Count))
            .ForMember(dest => dest.NumberOfExamination, opt => opt.MapFrom(src => src.Doctor.DoctorSchedules.
            SelectMany(ds => ds.Reservations.Where(r => r.Status.Equals("Hoàn thành"))).ToList().Count))
           .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Doctor.Rating))
           .ForMember(dest => dest.RatingCount, opt => opt.MapFrom(src => src.Doctor.RatingCount))
           .ReverseMap();


            CreateMap<User, DoctorDetailDTO>()
                .IncludeBase<User, DoctorDTO>()
                .ForMember(dest => dest.WorkExperience, opt => opt.MapFrom(src => src.Doctor.WorkExperience))
                .ForMember(dest => dest.Organization, opt => opt.MapFrom(src => src.Doctor.Organization))
                .ForMember(dest => dest.Prize, opt => opt.MapFrom(src => src.Doctor.Prize))
                .ForMember(dest => dest.ResearchProject, opt => opt.MapFrom(src => src.Doctor.ResearchProject))
                .ForMember(dest => dest.TrainingProcess, opt => opt.MapFrom(src => src.Doctor.TrainingProcess))
                .ForMember(dest => dest.Schedules, opt => opt.MapFrom(src => src.Doctor.DoctorSchedules))
                .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.Doctor.Services))
                .ForMember(dest => dest.Feedbacks, opt => opt.MapFrom(src => src.Doctor.DoctorSchedules.SelectMany(ds => ds.Reservations).Where(r => r.Status.Equals("Hoàn thành") && r.Feedback != null).Select(r => r.Feedback)))
                .ForMember(dest => dest.RelevantDoctors, opt => opt.MapFrom(src => src.Doctor.Specialties.SelectMany(sp => sp.Doctors).Where(dr => dr.DoctorId != src.UserId).Select(d=>d.DoctorNavigation)))
                .ReverseMap();

           

            CreateMap<Doctor, DoctorDTO>();




        }
    }
}  