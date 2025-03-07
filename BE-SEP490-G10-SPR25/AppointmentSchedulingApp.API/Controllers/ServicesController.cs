using AppointmentSchedulingApp.Services.DTOs;
using Microsoft.AspNetCore.Mvc;
using AppointmentSchedulingApp.Services.IServices;

namespace AppointmentSchedulingApp.API.Controllers
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