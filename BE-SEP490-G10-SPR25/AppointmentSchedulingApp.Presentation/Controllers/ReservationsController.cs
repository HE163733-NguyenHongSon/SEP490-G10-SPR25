using AppointmentSchedulingApp.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using AppointmentSchedulingApp.Application.IServices;

namespace AppointmentSchedulingApp.Presentation.Controllers
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

        [HttpGet("{patientId}/{status}/{sortBy}")]
        public async Task<IActionResult> GetListReservationByFilter(int patientId, string? status = "Đang chờ", string? sortBy = "Giá dịch vụ tăng dần")
        {
            try
            {

                var reservations = await reservationService.GetListReservationByFilter(patientId, status, sortBy);
                if (reservations == null)
                {
                    return NotFound($"Bệnh nhân với Id={patientId} không tồn tại!");
                }
                if ( !reservations.Any()  )
                {
                    return Ok($"Lịch hẹn với trạng thái '{status}' của bệnh nhân Id={patientId} chưa có!");
                }
                return Ok(reservations);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);

            }
        }



    }
}