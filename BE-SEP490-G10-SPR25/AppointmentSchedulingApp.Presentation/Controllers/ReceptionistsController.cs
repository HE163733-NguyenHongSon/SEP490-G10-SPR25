using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Presentation.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceptionistsController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly IHubContext<NotificationHub> _hubContext;

        public ReceptionistsController(IReservationService reservationService, 
            IHubContext<NotificationHub> hubContext)
        {
            _reservationService = reservationService;
            _hubContext = hubContext;
        }

        [HttpPost("appointments/{reservationId}/handle-cancellation")]
        //[Authorize(Roles = "Lễ tân")]
        public async Task<IActionResult> HandleCancellationRequest(int reservationId, [FromBody] CancellationResponseDTO request)
        {
            try
            {
                if (reservationId != request.ReservationId)
                {
                    return BadRequest("Reservation ID mismatch");
                }

                // Get the reservation details
                var reservation = await _reservationService.GetReservationById(reservationId);
                if (reservation == null)
                {
                    return NotFound($"Appointment with ID={reservationId} not found");
                }

                // Update the reservation status based on the receptionist's decision
                var statusDTO = new ReservationStatusDTO
                {
                    ReservationId = reservationId,
                    Status = request.IsApproved ? "Hủy" : "Xác nhận", // Set to "Cancelled" if approved, keep as "Confirmed" if rejected
                    CancellationReason = reservation.CancellationReason, // Keep the original reason
                    UpdatedByUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0"),
                    UpdatedDate = DateTime.Now
                };

                var result = await _reservationService.UpdateReservationStatus(statusDTO);
                
                if (!result)
                {
                    return StatusCode(500, "Failed to update reservation status");
                }

                // Notify all clients about the status update
                await _hubContext.Clients.All.SendAsync("CancellationStatusUpdated", 
                    reservationId, 
                    request.IsApproved ? "Approved" : "Rejected");

                return Ok(new { 
                    message = $"Cancellation request {(request.IsApproved ? "approved" : "rejected")} successfully", 
                    status = request.IsApproved ? "Hủy" : "Xác nhận" 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error handling cancellation request: {ex.Message}");
            }
        }

        [HttpPost("appointments/{reservationId}/cancel")]
        //[Authorize(Roles = "Lễ tân")]
        public async Task<IActionResult> CancelAppointment(int reservationId, [FromBody] CancelAppointmentDTO request)
        {
            try
            {
                if (reservationId != request.ReservationId)
                {
                    return BadRequest("Reservation ID mismatch");
                }

                // Get the reservation details
                var reservation = await _reservationService.GetReservationById(reservationId);
                if (reservation == null)
                {
                    return NotFound($"Appointment with ID={reservationId} not found");
                }

                // Cập nhật trạng thái lịch hẹn thành "Hủy"
                var statusDTO = new ReservationStatusDTO
                {
                    ReservationId = reservationId,
                    Status = "Hủy",
                    CancellationReason = request.CancellationReason,
                    UpdatedByUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0"),
                    UpdatedDate = DateTime.Now
                };

                var result = await _reservationService.UpdateReservationStatus(statusDTO);
                
                if (!result)
                {
                    return StatusCode(500, "Không thể hủy lịch hẹn");
                }

                // Thông báo cho tất cả clients về việc cập nhật trạng thái
                await _hubContext.Clients.All.SendAsync("CancellationStatusUpdated", 
                    reservationId, 
                    "Approved");

                return Ok(new { 
                    message = "Lịch hẹn đã được hủy thành công", 
                    status = "Hủy" 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi hủy lịch hẹn: {ex.Message}");
            }
        }

        [HttpPost("appointments/{reservationId}/reject-cancellation")]
        //[Authorize(Roles = "Lễ tân")]
        public async Task<IActionResult> RejectCancellationRequest(int reservationId, [FromBody] RejectCancellationDTO request)
        {
            try
            {
                if (reservationId != request.ReservationId)
                {
                    return BadRequest("Reservation ID mismatch");
                }

                // Get the reservation details
                var reservation = await _reservationService.GetReservationById(reservationId);
                if (reservation == null)
                {
                    return NotFound($"Appointment with ID={reservationId} not found");
                }

                // Giữ nguyên trạng thái "Xác nhận", chỉ cập nhật metadata
                var statusDTO = new ReservationStatusDTO
                {
                    ReservationId = reservationId,
                    Status = "Xác nhận", // Giữ nguyên trạng thái
                    CancellationReason = null, // Xóa lý do hủy
                    UpdatedByUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0"),
                    UpdatedDate = DateTime.Now
                };

                var result = await _reservationService.UpdateReservationStatus(statusDTO);
                
                if (!result)
                {
                    return StatusCode(500, "Không thể từ chối yêu cầu hủy lịch");
                }

                // Thông báo cho tất cả clients về việc cập nhật trạng thái
                await _hubContext.Clients.All.SendAsync("CancellationStatusUpdated", 
                    reservationId, 
                    "Rejected");

                return Ok(new { 
                    message = "Đã từ chối yêu cầu hủy lịch", 
                    status = "Xác nhận" 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi từ chối yêu cầu hủy lịch: {ex.Message}");
            }
        }
    }
} 