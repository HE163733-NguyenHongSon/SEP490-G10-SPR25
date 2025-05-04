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
        private IStorageService storageService;

        public ReservationsController(IReservationService reservationService, IStorageService storageService) 
        {
            this.reservationService = reservationService;
            this.storageService = storageService;
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
                if (!reservations.Any())
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
        [HttpPut("UpdateReservationStatusList")]
        public async Task<IActionResult> UpdateReservationStatusList([FromBody] List<ReservationStatusDTO> reservations)
        {
            if (reservations == null || !reservations.Any())
            {
                return BadRequest("Danh sách không được để trống.");
            }

            try
            {
                var result = await reservationService.UpdateReservationStatusList(reservations);
                return Ok(result);
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

        [HttpGet("UpcomingReservationsAndMarkReminded")]
        public async Task<IActionResult> GetUpcomingReservationsAndMarkReminded()
        {
            try
            {
                var result = await reservationService.GetUpcomingReservationsAndMarkReminded();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }



        [HttpPut("ReplaceDoctor")]
        [EnableQuery]
        public async Task<IActionResult> ReplaceDoctor(int reservationId, int doctorScheduleId)
        {
            try
            {
                var reservation = await reservationService.GetReservationById(reservationId);

                if (reservation == null)
                {
                    return NotFound($"Cuộc hẹn với ID={reservationId} không tồn tại!");
                }
                var isTrue = await reservationService.ReplaceDoctor(reservationId, doctorScheduleId);
                return Ok(isTrue);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}