using AppointmentSchedulingApp.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.Contracts.Services
{
    public interface IMedicalRecordService
    {
        Task<List<MedicalRecordDTO>> GetMedicalRecordList();
    }
}
