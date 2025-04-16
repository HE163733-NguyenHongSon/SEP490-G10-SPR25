using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

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
