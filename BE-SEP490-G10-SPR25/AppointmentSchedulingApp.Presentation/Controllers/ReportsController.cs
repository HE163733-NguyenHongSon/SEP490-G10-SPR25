using AppointmentSchedulingApp.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    // Controllers/ReportsController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly PdfReportService _pdfService;

        public ReportsController(PdfReportService pdfService)
        {
            _pdfService = pdfService;
        }

        [HttpGet("patients/{patientId}/export")]
        public IActionResult ExportPatientReport(int patientId)
        {
            // Lấy dữ liệu từ database (đây là dữ liệu mẫu)
            var reportData = new MedicalReportData
            {
                PatientInfo = new PatientInfo
                {
                    FullName = "Văn An Lưu Hồi",
                    DateOfBirth = new DateTime(1980, 1, 1),
                    Gender = "Nữ",
                    PhoneNumber = "0901234567",
                    Email = "giamho.benhnhan.user1@example.com",
                    Address = "12 Trần Phú, Quận 5, TP.HCM",
                    IsInsuranceVerified = true
                },
                MedicalSummary = new MedicalSummary
                {
                    TotalVisits = "10/01/2025 → 25/01/2025",
                    LastVisitDate = new DateTime(2025, 1, 25),
                    MainCondition = "Không có bệnh lý chính",
                    ProgressStatus = "Tiến triển tốt"
                },
                MedicalRecords = new List<MedicalRecord>
            {
                new MedicalRecord
                {
                    Id = 1,
                    AppointmentDate = new DateTime(2025, 1, 10, 12, 0, 0),
                    Symptoms = "Khát nước nhiều, đi tiểu thường xuyên, mệt mỏi",
                    Diagnosis = "Tiểu đường type 2",
                    Treatment = "Dùng thuốc Metformin 500mg 2 lần/ngày, kiểm tra đường huyết hàng ngày",
                    FollowUpDate = new DateTime(2025, 2, 10, 12, 0, 0),
                    Notes = "Bệnh nhân cần giảm 5kg và tập thể dục 30 phút/ngày"
                },
                // Thêm các bản ghi khác
            }
            };

            // Tạo PDF
            var pdfBytes = _pdfService.GenerateMedicalReport(reportData);

            // Trả về file
            return File(pdfBytes, "application/pdf", $"BaoCaoYTe_{patientId}.pdf");
        }
    }
}
