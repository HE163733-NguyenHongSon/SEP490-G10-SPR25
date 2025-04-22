using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IMedicalRecordService
    {
        Task<List<MedicalRecordDTO>> GetMedicalRecordList();

        Task<List<MedicalRecordDTO>> GetAllMedicalRecordByPatientId(int patientId);
        Task<MedicalRecordDetailDTO> GetMedicalRecordDetailById(int Id);
        
        // New methods
        Task<MedicalRecordDTO> CreateMedicalRecord(MedicalRecordCreateDTO medicalRecordDTO);
        Task<bool> CheckIfPatientHasPreviousMedicalRecords(int patientId);
        Task<List<MedicalRecordDTO>> GetPatientMedicalHistoryByPatientId(int patientId);
    }
}
