using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.Profiles
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
            .ForMember(dest => dest.CurrentWork, opt => opt.MapFrom(src => src.CurrentWork))
            .ForMember(dest => dest.DoctorDescription, opt => opt.MapFrom(src => new string(src.DoctorDescription.Take(50).ToArray())))
            .ForMember(dest => dest.SpecialtyNames, opt => opt.MapFrom(src => string.Join(", ", src.Specialties.Select(s => s.SpecialtyName))))
            .ForMember(dest => dest.NumberOfService, opt => opt.MapFrom(src => src.Services.Count))
            .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.DoctorSchedules.

            SelectMany(ds => ds.Reservations).Where(r => r.Status.Equals("Completed"))
            .Average(r=>r.Feedback.DoctorFeedbackGrade)))

           .ForMember(dest => dest.NumberOfExamination, opt => opt.MapFrom(src => src.DoctorSchedules.
           SelectMany(ds=>ds.Reservations.Where(r=>r.Status.Equals("Completed"))).ToList().Count ))

            .ReverseMap();
             
        }
    }
}
