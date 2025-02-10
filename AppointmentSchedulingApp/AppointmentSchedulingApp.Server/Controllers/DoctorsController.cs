using AppointmentSchedulingApp.Domain.Contracts.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        public DoctorsController(IDoctorService doctorService)
        {
            this.doctorService = doctorService;
        }

        public IDoctorService doctorService { get; set; }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok(await doctorService.GetDoctorList());
        }
    }
}
