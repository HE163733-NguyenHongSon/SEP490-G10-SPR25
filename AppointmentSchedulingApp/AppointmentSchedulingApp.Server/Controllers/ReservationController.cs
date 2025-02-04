using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.Models;
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

        [HttpGet("ReservationList/All")] 
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok(await reservationService.GetListReservation());
        }

        [HttpGet("ReservationList/Filter")] 
        public async Task<IActionResult> GetReservations(
            [FromQuery] string? status = "Pending",
            [FromQuery] string? sortBy = "ServicePriceAscending",
            [FromQuery] int pageIndex = 1)
        {
            var reservations = await reservationService.GetListReservationByFilterAndSort(status, sortBy, pageIndex);
            return Ok(reservations);
        }



    }
}