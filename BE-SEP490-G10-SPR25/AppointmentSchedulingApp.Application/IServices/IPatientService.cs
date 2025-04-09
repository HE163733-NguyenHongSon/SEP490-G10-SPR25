using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IPatientService
    {
        Task<List<PatientDTO>> GetPatientList();
        Task<PatientDetailDTO> GetPatientDetailById(int patientId);
        //Task<PatientDTO> UpdatePatientByReceptionist(PatientContactDTO dto);

        Task<PatientDTO> UpdatePatientContact(PatientContactDTO patientContactDTO);
        Task<PatientDTO> UpdateGuardianOfPatientContact(GuardianOfPatientDTO guardianOfPatientDTO);
    }
}
