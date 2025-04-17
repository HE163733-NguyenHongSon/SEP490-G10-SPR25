using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorsController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet]
        [EnableQuery] 
        public async Task<IActionResult> Get()
        {
            try
            {
                var doctors = await _doctorService.GetDoctorList();

                if (doctors == null || !doctors.Any())
                {
                    return NoContent(); 
                }

                return Ok(doctors); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }

        [HttpGet("{doctorId}")]
        [EnableQuery] 
        public async Task<IActionResult> GetDoctorDetailById(int doctorId)
        {
            try
            {
                var doctorDetail = await _doctorService.GetDoctorDetailById(doctorId);

                if (doctorDetail == null)
                {
                    return NotFound($"Bác sĩ với ID={doctorId} không tồn tại!");
                }

                return Ok(doctorDetail); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); 
            }
        }
      

        [HttpPut("{doctorId}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDoctor(int doctorId, [FromBody] object requestData)
        {
            try
            {
                // Chuyển đổi từ dynamic object sang DoctorDetailDTO
                var options = new System.Text.Json.JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                };
                var jsonString = System.Text.Json.JsonSerializer.Serialize(requestData);
                var doctorDto = System.Text.Json.JsonSerializer.Deserialize<DoctorDetailDTO>(jsonString, options);
                
                if (doctorId != doctorDto.UserId)
                {
                    return BadRequest("ID bác sĩ không khớp");
                }

                // Đảm bảo RoleNames được thiết lập
                doctorDto.RoleNames = "Doctor";
                
                var updatedDoctor = await _doctorService.UpdateDoctor(doctorDto);
                if (updatedDoctor == null)
                {
                    return NotFound($"Không tìm thấy bác sĩ với ID={doctorId}");
                }

                return Ok(updatedDoctor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi khi cập nhật bác sĩ: {ex.Message}");
            }
        }

        [HttpDelete("{doctorId}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDoctor(int doctorId)
        {
            try
            {
                var result = await _doctorService.DeleteDoctor(doctorId);
                if (!result)
                {
                    return NotFound($"Không tìm thấy bác sĩ với ID={doctorId}");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi khi xóa bác sĩ: {ex.Message}");
            }
        }
    }
}
