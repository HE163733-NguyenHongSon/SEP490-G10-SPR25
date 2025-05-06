using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IDoctorService
    {
        Task<List<DoctorDTO>> GetDoctorList();
        Task<DoctorDetailDTO> GetDoctorDetailById(int doctorId);
        Task<DoctorDetailDTO> UpdateDoctor(DoctorDetailDTO doctorDto);
        Task<bool> DeleteDoctor(int doctorId);
        
        // New methods for doctor appointments
        Task<List<ReservationDTO>> GetDoctorAppointments(int doctorId, string status = "Xác nhận");
    
        Task<MedicalRecordDTO> CreateMedicalRecord(int reservationId, MedicalRecordDTO medicalRecordDTO);
        Task<bool> IsFirstTimePatient(int patientId);
        Task<List<MedicalRecordDTO>> GetPatientPreviousMedicalRecords(int patientId);
        Task<IEnumerable<DoctorDTO>> GetDoctorListByServiceId(int serviceId);
        
        // Method to get doctors by specialty id
        Task<IEnumerable<DoctorDTO>> GetDoctorsBySpecialtyId(int specialtyId);
        
        // New method to get all medical records for a doctor
        Task<List<MedicalRecordDTO>> GetDoctorMedicalRecords(int doctorId);
        
        // New method to get medical records for a specific patient seen by a doctor
        Task<List<MedicalRecordDTO>> GetMedicalRecordsByPatientAndDoctorId(int doctorId, int patientId);

        Task<ReservationDTO> GetAppointmentById(int reservationId);
        Task<bool> RequestCancellation(int reservationId, string cancellationReason);
        Task<bool> CancelAppointment(int reservationId, string cancellationReason);
        
        // Thêm phương thức mới
        Task<bool> UpdateAppointmentStatus(int reservationId, string status);
    }
}