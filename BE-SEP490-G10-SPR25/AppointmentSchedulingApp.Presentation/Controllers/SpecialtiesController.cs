using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Presentation.Controllers
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

        [HttpPost]
        public async Task<IActionResult> CreateSpecialty([FromBody] SpecialtyDTO specialtyDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Reset ID to 0 to ensure database generates a new ID
            specialtyDto.SpecialtyId = 0;
            
            await specialtyService.AddSpecialty(specialtyDto);
            
            // Get the list of specialties to find the newly created one
            var specialties = await specialtyService.GetSpecialtyList();
            var createdSpecialty = specialties.OrderByDescending(s => s.SpecialtyId).FirstOrDefault();
            
            return CreatedAtAction(nameof(GetSpecialtyById), new { id = createdSpecialty?.SpecialtyId }, createdSpecialty);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSpecialty(int id, [FromBody] SpecialtyDTO specialtyDto)
        {
            // Always use the ID from the URL, not from the request body
            specialtyDto.SpecialtyId = id;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await specialtyService.UpdateSpecialty(specialtyDto);
                return NoContent();
            }
            catch (System.ComponentModel.DataAnnotations.ValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecialty(int id)
        {
            try
            {
                await specialtyService.DeleteSpecialty(id);
                return NoContent();
            }
            catch (System.ComponentModel.DataAnnotations.ValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
