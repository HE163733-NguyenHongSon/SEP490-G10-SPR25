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
        [HttpPost("AddReservation")]
        public async Task<IActionResult> AddReservation([FromForm] AddedReservationDTO reservationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reservation = await reservationService.AddReservation(reservationDto);

            if (reservationDto.PriorExaminationImg != null)
            {
                var files = new List<IFormFile> { reservationDto.PriorExaminationImg };

                Func<IFormFile, string> renameFunc = (file) =>
                {
                    var fileExt = Path.GetExtension(file.FileName).ToLowerInvariant();
                    return $"lichhen{reservation.ReservationId}_benhnhan{reservation.PatientId}_phacdotruoc{fileExt}";
                };

                var uploadResults = await storageService.UploadFilesAsync(files, renameFunc);

                if (uploadResults.Any(r => r.StatusCode != 200))
                {
                    return BadRequest("File upload failed.");
                }


                await reservationService.UpdatePriorExaminationImg(reservation.ReservationId, uploadResults.FirstOrDefault()?.FileName);
            }

            return Ok(true);
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