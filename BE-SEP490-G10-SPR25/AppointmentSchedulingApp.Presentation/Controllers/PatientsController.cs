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
        private readonly ILogger<PatientsController> _logger;


        public PatientsController(IPatientService patientService, ILogger<PatientsController> logger)
        {
            _patientService = patientService;
            _logger = logger;
          _logger = logger;

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
                _logger.LogError(ex, "Error occurred while fetching patient details for ID={patientId}", patientId);
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

    }
}
