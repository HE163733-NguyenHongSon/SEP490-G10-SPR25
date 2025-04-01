using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private IPatientService _patientService;

        public PatientsController(IPatientService patientService)
        {
            this._patientService = patientService;
        }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok(await _patientService.GetPatientList());
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

    }
}
