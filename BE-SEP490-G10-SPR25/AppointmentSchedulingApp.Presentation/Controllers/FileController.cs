using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
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

    }
}
