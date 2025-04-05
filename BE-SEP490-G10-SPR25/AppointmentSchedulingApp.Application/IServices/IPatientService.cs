using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IPatientService
    {
        Task<List<PatientDTO>> GetPatientList();
        Task<PatientDetailDTO> GetPatientDetailById(int patientId);
    }
}
