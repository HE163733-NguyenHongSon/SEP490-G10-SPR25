using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotsController : ControllerBase
    {
        private readonly ISlotService _slotService;
        public SlotsController(ISlotService slotService)
        {
            _slotService = slotService;
        }
        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            try
            {
                var slots = await _slotService.GetSlotList();
                if (slots == null || !slots.Any())
                {
                    return NoContent();
                }
                return Ok(slots);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{slotId}")]
        [EnableQuery]
        public async Task<IActionResult> GetSlotDetailById(int slotId)
        {
            try
            {
                var slotDetail = await _slotService.GetSlotDetailById(slotId);
                if (slotDetail == null)
                {
                    return NotFound($"Slot with ID={slotId} does not exist!");
                }
                return Ok(slotDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
