using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IPatientService
    {
        Task<List<PatientDTO>> GetPatientList();
        Task<PatientDetailDTO> GetPatientDetailById(int patientId);
        //Task<PatientDTO> UpdatePatientByReceptionist(PatientContactDTO dto);

        Task<bool> UpdateGuardianOfPatientContact(GuardianOfPatientDTO guardianOfPatientDTO);
        Task<bool> UpdatePatientContact(PatientUpdateDTO patientUpdateDTO);
    }
}
