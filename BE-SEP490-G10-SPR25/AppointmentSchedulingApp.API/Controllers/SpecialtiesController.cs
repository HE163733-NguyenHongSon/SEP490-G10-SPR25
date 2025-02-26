using AppointmentSchedulingApp.Domain.Contracts.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialtiesController : ControllerBase
    {
        public ISpecialtyService specialtyService { get; set; }
        public SpecialtiesController(ISpecialtyService specialtyService)
        {
            this.specialtyService = specialtyService;
        }
        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok(await specialtyService.GetSpecialtyList());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialtyById(int id)
        {
            var specialtyDetail = await specialtyService.GetSpecialtyDetailById(id);
            if (specialtyDetail == null) { 
                return NotFound(); 
            }
            return Ok(specialtyDetail);
        }
    }
}
