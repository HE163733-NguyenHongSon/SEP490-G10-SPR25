using AppointmentSchedulingApp.Application;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalRecordsController : ControllerBase
    {
        public MedicalRecordsController(IMedicalRecordService medicalRecordService)
        {
            this.medicalRecordService = medicalRecordService;
        }

        public IMedicalRecordService medicalRecordService { get; set; }
        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok(await medicalRecordService.GetMedicalRecordList());
        }


        [HttpGet("GetAllMedicalRecordByPatientId/{patientId}")]
        [EnableQuery]
        public async Task<IActionResult> GetAllMedicalRecordByPatientId(int patientId)
        {
            try
            {
                var medicalRecords = await medicalRecordService.GetAllMedicalRecordByPatientId(patientId);

                if (medicalRecords == null)
                {
                    return NotFound($"Bệnh nhân với ID={patientId} không có hồ sơ bệnh án nào cả!");
                }

                return Ok(medicalRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }
    }
}
