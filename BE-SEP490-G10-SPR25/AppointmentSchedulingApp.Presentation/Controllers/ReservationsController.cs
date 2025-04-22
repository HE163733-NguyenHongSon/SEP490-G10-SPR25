using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

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
        [HttpPost("AddReservation")]
        public async Task<IActionResult> AddReservation([FromBody] AddedReservationDTO reservationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await reservationService.AddReservation(reservationDto);

            if (result == null)
            {
                return BadRequest("Không thể tạo lịch hẹn.");
            }

            return Ok(result);
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

        [HttpGet("{reservationId}")]
        [EnableQuery]
        public async Task<IActionResult> GetReservationById(int reservationId)
        {
            try
            {
                var reservation = await reservationService.GetReservationById(reservationId);

                if (reservation == null)
                {
                    return NotFound($"Cuộc hẹn với ID={reservationId} không tồn tại!");
                }

                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

        [HttpPut("UpdateReservationStatus")]
        [EnableQuery]
        public async Task<IActionResult> UpdateReservationStatus([FromBody] ReservationStatusDTO reservationStatusDTO)
        {
            try
            {
                var reservation = await reservationService.GetReservationById(reservationStatusDTO.ReservationId);

                if (reservation == null)
                {
                    return NotFound($"Cuộc hẹn với ID={reservationStatusDTO.ReservationId} không tồn tại!");
                }
                var isTrue = await reservationService.UpdateReservationStatus(reservationStatusDTO);
                return Ok(isTrue);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("ViewReason{reservationId}")]
        [EnableQuery]
        public async Task<IActionResult> ViewCancellationReason(int reservationId)
        {
            try
            {
                var reservation = await reservationService.ViewCancellationReason(reservationId);

                if (reservation == null)
                {
                    return NotFound($"Cuộc hẹn với ID={reservationId} không tồn tại!");
                }

                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }
        [HttpGet("GetActiveReservationsForThisWeek")]
        public async Task<IActionResult> GetActiveReservationsForThisWeek()
        {
            var reservations = await reservationService.GetActiveReservationsForThisWeek();

            if (reservations == null || !reservations.Any())
            {
                return NoContent();
            }

            return Ok(reservations);
        }
    }
}