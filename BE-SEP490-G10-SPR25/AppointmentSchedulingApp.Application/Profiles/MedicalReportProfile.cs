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
    public class MedicalReportProfile : Profile
    {
        public MedicalReportProfile()
        {
            CreateMap<User, MedicalReportDTO>()
                .ForMember(dest => dest.Patient, opt => opt.MapFrom(src => src))
                .ForMember(dest => dest.NumberOfVisits, opt => opt.MapFrom(src =>
                    src.Patient != null
                        ? src.Patient.Reservations.Count(r => r.Status.Equals("Hoàn thành"))
                        : 0))

                .ForMember(dest => dest.FirstVisit, opt => opt.MapFrom(src =>src.Patient.Reservations
                            .Where(r => r.Status.Equals("Hoàn thành"))
                            .OrderBy(r => r.AppointmentDate)
                            .Select(r => r.AppointmentDate)
                            .FirstOrDefault()))
                .AfterMap((src, dest) => {
                    if (dest.FirstVisit!=null)
                    {
                        dest.FirstVisitFormatted = dest.FirstVisit.Value.ToString("dd/MM/yyyy");
                    }
                })

                .ForMember(dest => dest.LastVisit, opt => opt.MapFrom(src => src.Patient.Reservations
                            .Where(r => r.Status.Equals("Hoàn thành"))
                            .OrderByDescending(r => r.AppointmentDate)
                            .Select(r => r.AppointmentDate)
                            .FirstOrDefault()))
                 .AfterMap((src, dest) => {
                     if (dest.LastVisit != null)
                     {
                         dest.LastVisitFormatted = dest.LastVisit.Value.ToString("dd/MM/yyyy");
                     }
                 })
                 
                 .ForMember(dest => dest.MedicalRecords, opt => opt.MapFrom(src => src.Patient.Reservations.
                    Where(r=>r.Status.Equals("Hoàn thành")).Select(r=>r.MedicalRecord)))

                .ReverseMap();   
        }
    }      

}
    