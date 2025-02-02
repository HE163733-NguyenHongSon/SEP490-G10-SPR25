using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private ICategoryService categoryService;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(ICategoryService categoryService, ILogger<CategoryController> logger)
        {
            this.categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet("categories")]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            var categories = await categoryService.GetListCategory();
            return Ok(categories);  
        }

    }
}
