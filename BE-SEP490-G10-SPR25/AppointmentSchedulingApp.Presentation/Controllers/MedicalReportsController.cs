using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalReportsController : ControllerBase
    {
        private readonly IMedicalReportService medicalReportService;

        public MedicalReportsController(IMedicalReportService medicalReportService)
        {
            this.medicalReportService = medicalReportService;
        }

        [HttpGet("{patientId}")]
        [EnableQuery]
        public async Task<IActionResult> GetMedicalReportByPatientId(int patientId)
        {
            try
            {
                var medicalReport = await medicalReportService.GetMedicalReportByPatientId(patientId);
                if (medicalReport == null)
                {
                    return NotFound($"Không tìm thấy báo cáo y tế do bệnh nhân Id={patientId} không tồn tại!");
                }
                return Ok(await medicalReportService.GetMedicalReportByPatientId(patientId));
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
        [HttpGet("ExportPdf/{patientId}")]
        public async Task<IActionResult> ExportPatientReportAsync(int patientId)
        {
            var medicalReport = await medicalReportService.GetMedicalReportByPatientId(patientId);
            if (medicalReport == null)
            {
                return NotFound("Không tìm thấy báo cáo y tế.");
            }

            var pdfBytes = await medicalReportService.GenerateMedicalReportPdf(medicalReport);

            return File(pdfBytes, "application/pdf", $"BaoCaoYTe_{patientId}.pdf");
        }

    }
}
