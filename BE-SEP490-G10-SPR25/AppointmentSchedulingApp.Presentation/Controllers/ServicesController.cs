using AppointmentSchedulingApp.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using AppointmentSchedulingApp.Application.IServices;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetServices()
        {
            var services = await _serviceService.GetListService();
            return Ok(services);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceById(int id)
        {
            var service = await _serviceService.GetServiceById(id);
            if (service == null)
            {
                return NotFound();
            }
            return Ok(service);
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetServiceDetailById(int id)
        {
            var serviceDetail = await _serviceService.GetServiceDetailById(id);
            if (serviceDetail == null)
            {
                return NotFound();
            }
            return Ok(serviceDetail);
        }

        [HttpGet("specialty/{specialtyId}")]
        public async Task<IActionResult> GetServicesBySpecialty(int specialtyId)
        {
            var services = await _serviceService.GetServicesBySpecialty(specialtyId);
            return Ok(services);
        }

        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetServicesByCategory(int categoryId)
        {
            var services = await _serviceService.GetServicesByCategory(categoryId);
            return Ok(services);
        }

        [HttpGet("sort/rating")]
        public async Task<IActionResult> GetServicesSortedByRating()
        {
            var services = await _serviceService.GetServicesSortedByRating();
            return Ok(services);
        }

        [HttpGet("sort/price")]
        public async Task<IActionResult> GetServicesSortedByPrice([FromQuery] bool ascending = true)
        {
            var services = await _serviceService.GetServicesSortedByPrice(ascending);
            return Ok(services);
        }

        [HttpPost]
        public async Task<IActionResult> AddService(ServiceDTO serviceDto)
        {
            await _serviceService.AddService(serviceDto);
            return CreatedAtAction(nameof(GetServiceById), new { id = serviceDto.ServiceId }, serviceDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, ServiceDTO serviceDto)
        {
            if (id != serviceDto.ServiceId)
            {
                return BadRequest();
            }

            await _serviceService.UpdateService(serviceDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            await _serviceService.DeleteService(id);
            return NoContent();
        }
    }
}