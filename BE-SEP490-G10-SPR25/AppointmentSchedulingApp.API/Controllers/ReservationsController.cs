using AppointmentSchedulingApp.Services.Services;
using AppointmentSchedulingApp.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private IReservationService reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            this.reservationService = reservationService;
        }

        [HttpGet()]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok(await reservationService.GetListReservation());
        }

        [HttpGet("{status}/{sortBy}")]
        public async Task<IActionResult> GetListReservationByStatusAndSort( string? status = "pending", string? sortBy = "price_asc")
        {
            var reservations = await reservationService.GetListReservationByStatusAndSort(status, sortBy);
            return Ok(reservations);
        }



    }
}