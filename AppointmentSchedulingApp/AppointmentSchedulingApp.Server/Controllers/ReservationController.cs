using AppointmentSchedulingApp.Domain.Contracts.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private IReservationService reservationService;

        public ReservationController(IReservationService reservationService)
        {
            this.reservationService = reservationService;
        }

        [HttpGet("getListReservation")]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok(await reservationService.GetListReservation());
        }
    }
}
