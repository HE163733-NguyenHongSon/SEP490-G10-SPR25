using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.IdentityModel.Tokens;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorSchedulesController : ControllerBase
    {
        public DoctorSchedulesController(IDoctorScheduleService doctorScheduleService)
        {
            this.doctorScheduleService = doctorScheduleService;
        }

        public  IDoctorScheduleService doctorScheduleService { get; set; }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            try
            {
                var doctorSchedules = await doctorScheduleService.GetDoctorScheduleList();

                if ( doctorSchedules.IsNullOrEmpty())
                {
                      return NoContent();
                }

                return Ok(doctorSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

            [HttpGet("{serviceId}")]
        [EnableQuery]
        public async Task<IActionResult> GetDoctorScheduleListByServiceId(int serviceId)
        {
            try
            {
                var doctorSchedules= await doctorScheduleService.GetDoctorScheduleListByServiceId(serviceId);

                if (doctorSchedules == null)
                {
                    return NotFound($"Dịch vụ với ID={serviceId} không tồn tại!");
                }

                return Ok(doctorSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
