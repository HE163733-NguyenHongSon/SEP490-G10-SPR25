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
    public class MedicalRecordProfile :Profile
    {
        public MedicalRecordProfile()
        {
            CreateMap<MedicalRecord, MedicalRecordDTO>()
         .ForMember(dest => dest.MedicalRecordId, opt => opt.MapFrom(src => src.MedicalRecordId))
         .ForMember(dest => dest.AppointmentDate, opt => opt.MapFrom(src => src.Reservation.AppointmentDate.HasValue ? src.Reservation.AppointmentDate.Value.ToString("dd/MM/yyyy") : null))
         .ForMember(dest => dest.Symptoms, opt => opt.MapFrom(src => src.Symptoms))
         .ForMember(dest => dest.Diagnosis, opt => opt.MapFrom(src => src.Diagnosis))
         .ForMember(dest => dest.TreatmentPlan, opt => opt.MapFrom(src => src.TreatmentPlan))
         .ForMember(dest => dest.FollowUpDate, opt => opt.MapFrom(src => src.FollowUpDate.HasValue ? src.FollowUpDate.Value.ToString("dd/MM/yyyy  hh:mm:sss") : null))
         .ForMember(dest => dest.Notes, opt => opt.MapFrom(src => src.Notes))
          .ReverseMap();
        }
    }
}
