using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using System;
using System.Threading.Tasks;

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
                return StatusCode(500, "Đã xảy ra lỗi nội bộ máy chủ!"); 
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
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!"); 
            }
        }
    }
}
