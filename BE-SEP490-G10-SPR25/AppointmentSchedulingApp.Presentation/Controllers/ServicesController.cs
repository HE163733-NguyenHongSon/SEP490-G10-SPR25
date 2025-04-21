using AppointmentSchedulingApp.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.OData.Query;
using System.ComponentModel.DataAnnotations;

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
        [EnableQuery]
        public async Task<IActionResult> Get()
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
        [EnableQuery]
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
        //GET http://localhost:5220/api/Services?$orderby=Rating desc dung odata ko can viet ham 
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
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> AddService([FromBody] ServiceDTO serviceDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { success = false, message = "Invalid model state", errors = ModelState });
            }

            try
            {
                await _serviceService.AddService(serviceDto);
                return Ok(new { success = true, message = "Service created successfully" });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error adding service: {ex.Message}");
                if (ex.InnerException != null) 
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                
                return StatusCode(500, new { 
                    success = false, 
                    message = "An error occurred while creating the service", 
                    error = ex.Message 
                });
            }
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