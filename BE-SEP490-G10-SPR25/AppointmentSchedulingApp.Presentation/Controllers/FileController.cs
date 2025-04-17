using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.IServices;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public FileController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        // Upload file text và đọc nội dung
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);

            stream.Position = 0;
            using var reader = new StreamReader(stream);
            var content = await reader.ReadToEndAsync();

            return Ok(new { fileName = file.FileName, content });
        }

        // Tải xuống file .txt đơn giản
        [HttpGet("download-txt")]
        public IActionResult DownloadTextFile()
        {
            var content = "Đây là nội dung của file text được tạo từ API.";
            var bytes = Encoding.UTF8.GetBytes(content);

            return File(bytes, "text/plain", "sample.txt");
        }

        // Upload file Excel và đọc nội dung (Sheet đầu tiên)
        [HttpPost("upload-excel")]
        public async Task<IActionResult> UploadExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;
            var colCount = worksheet.Dimension.Columns;

            var data = new List<Dictionary<string, string>>();

            // Giả sử dòng đầu là header
            for (int row = 2; row <= rowCount; row++)
            {
                var rowData = new Dictionary<string, string>();
                for (int col = 1; col <= colCount; col++)
                {
                    var header = worksheet.Cells[1, col].Text;
                    var value = worksheet.Cells[row, col].Text;
                    rowData[header] = value;
                }
                data.Add(rowData);
            }

            return Ok(data);
        }

        // Export file Excel
        [HttpGet("export-excel")]
        public IActionResult ExportExcel()
        {
            // ⚠️ Set license trước khi dùng ExcelPackage
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Sample Sheet");
            worksheet.Cells["A1"].Value = "Hello";
            worksheet.Cells["B1"].Value = "World";

            var stream = new MemoryStream(package.GetAsByteArray());

            return File(stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "sample.xlsx");
        }


        [HttpGet("export-dashboard")]
        public IActionResult ExportDashboardToExcel()
        {
            using var workbook = new XLWorkbook();
            var dashboardData = _adminService.DashboardAdmin();
            var statistics = _adminService.GetStatisticsForLast12Months().Result;
            // Sheet 1: Tổng Quan Doanh Thu
            var worksheet = workbook.Worksheets.Add("Tổng Quan Doanh Thu");

            // Tiêu đề
            worksheet.Cell("A1").Value = "TỔNG QUAN DOANH THU THÁNG";
            worksheet.Range("A1:C1").Merge().Style
                .Font.SetBold().Font.FontSize = 16;
            worksheet.Row(1).Height = 25;
            worksheet.Cell("A1").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

            // Headers
            worksheet.Cell("A2").Value = "Chỉ tiêu";
            worksheet.Cell("B2").Value = "Giá trị (VND)";
            worksheet.Cell("C2").Value = "Ghi chú";

            worksheet.Range("A2:C2").Style
                .Font.SetBold()
                .Fill.SetBackgroundColor(XLColor.LightGray);

            // Dữ liệu
            worksheet.Cell("A3").Value = "Mục tiêu";
            worksheet.Cell("B3").Value = dashboardData.target;
            worksheet.Cell("C3").Value = "Mục tiêu đặt ra cho mỗi tháng";

            worksheet.Cell("A4").Value = "Doanh thu tháng trước";
            worksheet.Cell("B4").Value = dashboardData.lastMonthTotal;
            worksheet.Cell("C4").Value = "Tổng thu của tháng trước";

            worksheet.Cell("A5").Value = "Doanh thu tháng này";
            worksheet.Cell("B5").Value = dashboardData.monthTotal;
            worksheet.Cell("C5").Value = "Tổng thu của tháng hiện tại";

            worksheet.Cell("A6").Value = "Doanh thu hôm nay";
            worksheet.Cell("B6").Value = dashboardData.todayTotal;
            worksheet.Cell("C6").Value = "Số tiền kiếm được hôm nay";

            // Định dạng tiền VND
            worksheet.Range("B3:B6").Style.NumberFormat.Format = "#,##0 VND";

            // Auto-fit
            worksheet.Columns().AdjustToContents();

            // Sheet 2: Tổng quan thống kê khác
            var statsSheet = workbook.Worksheets.Add("Dashboard");

            statsSheet.Cell("A1").Value = "Thông số";
            statsSheet.Cell("B1").Value = "Số lượng";
            statsSheet.Cell("C1").Value = "Thay đổi so với tháng trước";

            statsSheet.Range("A1:C1").Style
                .Font.SetBold()
                .Fill.SetBackgroundColor(XLColor.LightGray);

            statsSheet.Cell("A2").Value = "Lịch hẹn khám";
            statsSheet.Cell("B2").Value = dashboardData.TotalAppointmentSchedule + " ca khám";
            statsSheet.Cell("C2").Value = dashboardData.AppointmentScheduleChangePercent + " %";

            statsSheet.Cell("A3").Value = "Bệnh nhân";
            statsSheet.Cell("B3").Value = dashboardData.TotalPatient + " bệnh nhân";
            statsSheet.Cell("C3").Value = dashboardData.PatientChangePercent + " %";

            statsSheet.Cell("A4").Value = "Bác sĩ";
            statsSheet.Cell("B4").Value = dashboardData.TotalDoctor + " bác sĩ";
            //statsSheet.Cell("C4").Value = "-";

            statsSheet.Cell("A5").Value = "Dịch vụ";
            statsSheet.Cell("B5").Value = dashboardData.TotalService + " dịch vụ";
            //statsSheet.Cell("C5").Value = "-";

            statsSheet.Columns().AdjustToContents();


           
            // Xuất file
            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            var content = stream.ToArray();

            var fileName = $"MonthlyDashboard_{DateTime.Now:yyyyMMddHHmmss}.xlsx";
            return File(content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        fileName);
        }

    }
}
