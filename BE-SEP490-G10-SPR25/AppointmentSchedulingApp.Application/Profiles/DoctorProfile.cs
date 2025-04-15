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

           
            // Thêm mapping giữa Doctor và DoctorDTO
            CreateMap<Doctor, DoctorDTO>();
            
            // // Thêm mapping trực tiếp giữa DoctorDetailDTO và Doctor
            // CreateMap<DoctorDetailDTO, Doctor>()
            //     .ForMember(dest => dest.AcademicTitle, opt => opt.MapFrom(src => src.AcademicTitle))
            //     .ForMember(dest => dest.Degree, opt => opt.MapFrom(src => src.Degree))
            //     .ForMember(dest => dest.CurrentWork, opt => opt.MapFrom(src => src.CurrentWork))
            //     .ForMember(dest => dest.DoctorDescription, opt => opt.MapFrom(src => src.DoctorDescription))
            //     .ForMember(dest => dest.WorkExperience, opt => opt.MapFrom(src => src.WorkExperience))
            //     .ForMember(dest => dest.Organization, opt => opt.MapFrom(src => src.Organization))
            //     .ForMember(dest => dest.Prize, opt => opt.MapFrom(src => src.Prize))
            //     .ForMember(dest => dest.ResearchProject, opt => opt.MapFrom(src => src.ResearchProject))
            //     .ForMember(dest => dest.TrainingProcess, opt => opt.MapFrom(src => src.TrainingProcess))
            //     .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
            //     .ForMember(dest => dest.RatingCount, opt => opt.MapFrom(src => src.RatingCount))
            //     // Các thuộc tính collection sẽ được xử lý thủ công trong code
            //     .ForMember(dest => dest.DoctorSchedules, opt => opt.Ignore())
            //     .ForMember(dest => dest.Services, opt => opt.Ignore())
            //     .ForMember(dest => dest.Specialties, opt => opt.Ignore())
            //     .ForMember(dest => dest.Certifications, opt => opt.Ignore())
            //     .ForMember(dest => dest.Posts, opt => opt.Ignore())
            //     .ForMember(dest => dest.DoctorNavigation, opt => opt.Ignore());
            
            // // Thêm mapping từ Doctor sang DoctorDetailDTO
            // CreateMap<Doctor, DoctorDetailDTO>()
            //     .ForMember(dest => dest.AcademicTitle, opt => opt.MapFrom(src => src.AcademicTitle))
            //     .ForMember(dest => dest.Degree, opt => opt.MapFrom(src => src.Degree))
            //     .ForMember(dest => dest.CurrentWork, opt => opt.MapFrom(src => src.CurrentWork))
            //     .ForMember(dest => dest.DoctorDescription, opt => opt.MapFrom(src => src.DoctorDescription))
            //     .ForMember(dest => dest.WorkExperience, opt => opt.MapFrom(src => src.WorkExperience))
            //     .ForMember(dest => dest.Organization, opt => opt.MapFrom(src => src.Organization))
            //     .ForMember(dest => dest.Prize, opt => opt.MapFrom(src => src.Prize))
            //     .ForMember(dest => dest.ResearchProject, opt => opt.MapFrom(src => src.ResearchProject))
            //     .ForMember(dest => dest.TrainingProcess, opt => opt.MapFrom(src => src.TrainingProcess))
            //     .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
            //     .ForMember(dest => dest.RatingCount, opt => opt.MapFrom(src => src.RatingCount))
            //     // Các thuộc tính không có trong Doctor entity
            //     .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.DoctorId))
            //     .ForMember(dest => dest.SpecialtyNames, opt => opt.MapFrom(src => src.Specialties.Select(s => s.SpecialtyName).ToArray()))
            //     .ForMember(dest => dest.NumberOfService, opt => opt.MapFrom(src => src.Services.Count))
            //     .ForMember(dest => dest.NumberOfExamination, opt => opt.MapFrom(src => src.DoctorSchedules.
            //         SelectMany(ds => ds.Reservations.Where(r => r.Status.Equals("Hoàn thành"))).ToList().Count))
            //     .ForMember(dest => dest.Schedules, opt => opt.MapFrom(src => src.DoctorSchedules))
            //     .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.Services))
            //     .ForMember(dest => dest.Feedbacks, opt => opt.MapFrom(src => src.DoctorSchedules.SelectMany(ds => ds.Reservations).Where(r => r.Status.Equals("Hoàn thành") && r.Feedback != null).Select(r => r.Feedback)))
            //     .ForMember(dest => dest.RelevantDoctors, opt => opt.MapFrom(src => src.Specialties.SelectMany(sp => sp.Doctors).Where(dr => dr.DoctorId != src.DoctorId).Select(d=>d.DoctorNavigation)))
            //     // Các thuộc tính User sẽ được xử lý thủ công
            //     .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.DoctorNavigation.UserName))
            //     .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.DoctorNavigation.Email))
            //     .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.DoctorNavigation.Phone))
            //     .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.DoctorNavigation.Password))
            //     .ForMember(dest => dest.CitizenId, opt => opt.MapFrom(src => src.DoctorNavigation.CitizenId))
            //     .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.DoctorNavigation.Phone))
            //     .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.DoctorNavigation.Gender))
            //     .ForMember(dest => dest.Dob, opt => opt.MapFrom(src => src.DoctorNavigation.Dob.ToString("yyyy-MM-dd")))
            //     .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.DoctorNavigation.Address))
            //     .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.DoctorNavigation.AvatarUrl))
            //     .ForMember(dest => dest.IsVerify, opt => opt.MapFrom(src => src.DoctorNavigation.IsVerify))
            //     .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.DoctorNavigation.IsActive))
            //     .ForMember(dest => dest.RoleNames, opt => opt.MapFrom(src => "Doctor"))
            //     .ForMember(dest => dest.Roles, opt => opt.Ignore());

        }
    }
}  