using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IPatientService
    {
        Task<List<PatientDTO>> GetPatientList();
        Task<PatientDetailDTO> GetPatientDetailById(int patientId);
        //Task<PatientDTO> UpdatePatientByReceptionist(PatientContactDTO dto);

        Task<bool> UpdateGuardianOfPatient(GuardianOfPatientDTO guardianOfPatientDTO);
        Task<bool> UpdatePatientInfor(PatientUpdateDTO patientUpdateDTO);
        Task<bool> UpdatePatientInFormation(PatientUpdateDTO patientUpdateDTO);

        Task<PatientDTO> AddPatient(AddedPatientDTO patient);
    }
}
