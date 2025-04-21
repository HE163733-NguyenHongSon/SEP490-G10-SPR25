using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;
        public RoomsController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            try
            {
                var rooms = await _roomService.GetRoomList();

                if (rooms == null || !rooms.Any())
                {
                    return NoContent();
                }

                return Ok(rooms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{roomId}")]
        [EnableQuery]
        public async Task<IActionResult> GetRoomDetailById(int roomId)
        {
            try
            {
                var roomDetail = await _roomService.GetRoomDetailById(roomId);
                if (roomDetail == null)
                {
                    return NotFound($"Phòng với ID={roomId} không tồn tại!");
                }
                return Ok(roomDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}