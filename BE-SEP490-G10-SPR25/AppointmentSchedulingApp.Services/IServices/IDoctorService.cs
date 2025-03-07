using AppointmentSchedulingApp.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services.IServices
{
    public interface IDoctorService
    {
        Task<List<DoctorDTO>> GetDoctorList();
        Task<DoctorDetailDTO> GetDoctorDetailById(int doctorId);
    }
}
