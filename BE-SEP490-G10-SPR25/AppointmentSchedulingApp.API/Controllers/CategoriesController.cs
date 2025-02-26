using AppointmentSchedulingApp.Services.Services;
using AppointmentSchedulingApp.Services.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        private ICategoryService categoryService;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ICategoryService categoryService, ILogger<CategoriesController> logger)
        {
            this.categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            var categories = await categoryService.GetListCategory();
            return Ok(categories);  
        }

    }
}
