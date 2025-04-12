using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.Extensions.Logging;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientService _patientService;


        public PatientsController(IPatientService patientService)
        {
            _patientService = patientService;

        }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            try
            {
                var patients = await _patientService.GetPatientList();

                if (patients == null || !patients.Any())
                {
                    return NoContent();
                }

                return Ok(patients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message );
            }
        }

        [HttpGet("{patientId}")]
        [EnableQuery]
        public async Task<IActionResult> GetPatientDetailById(int patientId)
        {
            try
            {
                var patientDetail = await _patientService.GetPatientDetailById(patientId);

                if (patientDetail == null)
                {
                    return NotFound($"Bệnh nhân với ID={patientId} không tồn tại!");
                }

                return Ok(patientDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

        [HttpPut("UpdatePatientInforByReceptionist")]
        [EnableQuery]
        public async Task<IActionResult> UpdatePatientInforByReceptionist(PatientUpdateDTO patientUpdateDTO)
        {
            try
            {
                var patient = await _patientService.GetPatientDetailById(patientUpdateDTO.UserId);

                if (patient == null)
                {
                    return NotFound($"Bệnh nhân với ID={patientUpdateDTO.UserId} không tồn tại!");
                }
                var patietUpdate =  await _patientService.UpdatePatientInfor(patientUpdateDTO);
                return Ok(patietUpdate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

        [HttpPut("UpdateGuardianOfPatientByReceptionist")]
        [EnableQuery]
        public async Task<IActionResult> UpdateGuardianOfPatientByReceptionist(GuardianOfPatientDTO guardianOfPatientDTO)
        {
            try
            {
                var patientUpdate = await _patientService.UpdateGuardianOfPatient(guardianOfPatientDTO);
                return Ok(patientUpdate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

        [HttpPut("UpdatePatientInformationByReceptionist")]
        [EnableQuery]
        public async Task<IActionResult> UpdatePatientInformationByReceptionist(PatientUpdateDTO patientUpdateDTO)
        {
            try
            {
                var patient = await _patientService.GetPatientDetailById(patientUpdateDTO.UserId);

                if (patient == null)
                {
                    return NotFound($"Bệnh nhân với ID={patientUpdateDTO.UserId} không tồn tại!");
                }
                var patietUpdate = await _patientService.UpdatePatientInFormation(patientUpdateDTO);
                return Ok(patietUpdate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

    }
}
