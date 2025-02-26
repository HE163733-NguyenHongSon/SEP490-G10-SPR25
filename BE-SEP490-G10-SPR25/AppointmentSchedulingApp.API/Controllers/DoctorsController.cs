using AppointmentSchedulingApp.Services.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        public IDoctorService doctorService { get; set; }
        public DoctorsController(IDoctorService doctorService)
        {
            this.doctorService = doctorService;
        }


        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok(await doctorService.GetDoctorList());
        }

        [HttpGet("{doctorId}")]
        public async Task<IActionResult> GetDoctorDetailById(int doctorId)
        {

            return Ok(await doctorService.GetDoctorDetailById(doctorId));
        }
    }
}
