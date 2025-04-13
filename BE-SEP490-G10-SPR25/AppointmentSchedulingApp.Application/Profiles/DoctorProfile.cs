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
            CreateMap<Doctor, DoctorDTO>()
            .ForMember(dest => dest.DoctorId, opt => opt.MapFrom(src => src.DoctorId))
            .ForMember(dest => dest.AcademicTitle, opt => opt.MapFrom(src => src.AcademicTitle))
            .ForMember(dest => dest.Degree, opt => opt.MapFrom(src => src.Degree))
            .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.DoctorNavigation.UserName))
            .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.DoctorNavigation.AvatarUrl))
            .ForMember(dest => dest.CurrentWork, opt => opt.MapFrom(src => src.CurrentWork))
            .ForMember(dest => dest.BasicDescription, opt => opt.MapFrom(src => src.DoctorDescription != null ? new string(src.DoctorDescription.Take(50).ToArray()) : ""))
            .ForMember(dest => dest.SpecialtyNames, opt => opt.MapFrom(src => src.Specialties.Select(s => s.SpecialtyName).ToArray()))
            .ForMember(dest => dest.NumberOfService, opt => opt.MapFrom(src => src.Services.Count))

           .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.DoctorSchedules
           .SelectMany(ds => ds.Reservations)
                .Where(r => r != null && r.Status.Equals("Hoàn thành") && r.Feedback != null)
                .Select(r => (double?)r.Feedback.DoctorFeedbackGrade) 
                .DefaultIfEmpty(0)  
                .Average()))

               .ForMember(dest => dest.NumberOfExamination, opt => opt.MapFrom(src => src.DoctorSchedules.
               SelectMany(ds => ds.Reservations.Where(r => r.Status.Equals("Hoàn thành"))).ToList().Count))

            .ForMember(dest => dest.ExperienceYear, opt => opt.MapFrom(src =>
               Convert.ToInt32(System.Text.RegularExpressions.Regex.Match(src.WorkExperience, @"\d+").Value)))
            .ReverseMap();


            CreateMap<Doctor, DoctorDetailDTO>()
                .IncludeBase<Doctor, DoctorDTO>()
                .ForMember(dest => dest.DetailDescription, opt => opt.MapFrom(src => src.DoctorDescription))
                .ForMember(dest => dest.WorkExperience, opt => opt.MapFrom(src => src.WorkExperience))
                .ForMember(dest => dest.Organization, opt => opt.MapFrom(src => src.Organization))
                .ForMember(dest => dest.Prize, opt => opt.MapFrom(src => src.Prize))
                .ForMember(dest => dest.ResearchProject, opt => opt.MapFrom(src => src.ResearchProject))
                .ForMember(dest => dest.TrainingProcess, opt => opt.MapFrom(src => src.TrainingProcess));

            // Map từ DoctorDetailDTO sang Doctor (cho Create/Update)
            CreateMap<DoctorDetailDTO, Doctor>()
                .ForMember(dest => dest.DoctorId, opt => opt.MapFrom(src => src.DoctorId))
                .ForMember(dest => dest.AcademicTitle, opt => opt.MapFrom(src => src.AcademicTitle))
                .ForMember(dest => dest.Degree, opt => opt.MapFrom(src => src.Degree))
                .ForMember(dest => dest.CurrentWork, opt => opt.MapFrom(src => src.CurrentWork))
                .ForMember(dest => dest.DoctorDescription, opt => opt.MapFrom(src => src.DetailDescription))
                .ForMember(dest => dest.WorkExperience, opt => opt.MapFrom(src => src.WorkExperience))
                .ForMember(dest => dest.Organization, opt => opt.MapFrom(src => src.Organization))
                .ForMember(dest => dest.Prize, opt => opt.MapFrom(src => src.Prize))
                .ForMember(dest => dest.ResearchProject, opt => opt.MapFrom(src => src.ResearchProject))
                .ForMember(dest => dest.TrainingProcess, opt => opt.MapFrom(src => src.TrainingProcess))
                // Không cập nhật các mối quan hệ
                .ForMember(dest => dest.Specialties, opt => opt.Ignore())
                .ForMember(dest => dest.Services, opt => opt.Ignore())
                .ForMember(dest => dest.DoctorNavigation, opt => opt.Ignore())
                .ForMember(dest => dest.Certifications, opt => opt.Ignore())
                .ForMember(dest => dest.DoctorSchedules, opt => opt.Ignore())
                .ForMember(dest => dest.Posts, opt => opt.Ignore());
        }
    }
}