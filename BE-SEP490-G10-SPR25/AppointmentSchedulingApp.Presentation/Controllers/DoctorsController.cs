using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using AppointmentSchedulingApp.Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using AppointmentSchedulingApp.Presentation.Hubs;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        private readonly IHubContext<NotificationHub> _hubContext;

        public DoctorsController(IDoctorService doctorService, IHubContext<NotificationHub> hubContext)
        {
            _doctorService = doctorService;
            _hubContext = hubContext;
        }

        [HttpGet]
        [EnableQuery] 
        public async Task<IActionResult> Get()
        {
            try
            {
                var doctors = await _doctorService.GetDoctorList();

                if (doctors == null || !doctors.Any())
                {
                    return NoContent(); 
                }

                return Ok(doctors); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }
        [HttpGet("GetDoctorListByServiceId/{serviceId}")]
        public async Task<IActionResult> GetDoctorListByServiceId(int serviceId)
        {
            try
            {
                var doctors = await _doctorService.GetDoctorListByServiceId(serviceId);

                if (doctors == null || !doctors.Any())
                {
                    return NoContent();
                }

                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("GetDoctorsBySpecialtyId/{specialtyId}")]
        public async Task<IActionResult> GetDoctorsBySpecialtyId(int specialtyId)
        {
            try
            {
                var doctors = await _doctorService.GetDoctorsBySpecialtyId(specialtyId);

                if (doctors == null || !doctors.Any())
                {
                    return NoContent();
                }

                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("{doctorId}")]
        [EnableQuery] 
        public async Task<IActionResult> GetDoctorDetailById(int doctorId)
        {
            try
            {
                var doctorDetail = await _doctorService.GetDoctorDetailById(doctorId);

                if (doctorDetail == null)
                {
                    return NotFound($"Bác sĩ với ID={doctorId} không tồn tại!");
                }

                return Ok(doctorDetail); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); 
            }
        }
      

        [HttpPut("{doctorId}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDoctor(int doctorId, [FromBody] object requestData)
        {
            try
            {
                // Chuyển đổi từ dynamic object sang DoctorDetailDTO
                var options = new System.Text.Json.JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                };
                var jsonString = System.Text.Json.JsonSerializer.Serialize(requestData);
                var doctorDto = System.Text.Json.JsonSerializer.Deserialize<DoctorDetailDTO>(jsonString, options);
                
                if (doctorId != doctorDto.UserId)
                {
                    return BadRequest("ID bác sĩ không khớp");
                }

                // Đảm bảo RoleNames được thiết lập
                doctorDto.RoleNames = "Doctor";
                
                var updatedDoctor = await _doctorService.UpdateDoctor(doctorDto);
                if (updatedDoctor == null)
                {
                    return NotFound($"Không tìm thấy bác sĩ với ID={doctorId}");
                }

                return Ok(updatedDoctor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi khi cập nhật bác sĩ: {ex.Message}");
            }
        }

        [HttpDelete("{doctorId}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDoctor(int doctorId)
        {
            try
            {
                var result = await _doctorService.DeleteDoctor(doctorId);
                if (!result)
                {
                    return NotFound($"Không tìm thấy bác sĩ với ID={doctorId}");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi khi xóa bác sĩ: {ex.Message}");
            }
        }

        [HttpGet("{doctorId}/appointments")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> GetDoctorAppointments(int doctorId, [FromQuery] string status = "Xác nhận")
        {
            try
            {
                var appointments = await _doctorService.GetDoctorAppointments(doctorId, status);
                
                if (appointments == null || !appointments.Any())
                {
                    return NoContent();
                }
                
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi lấy danh sách lịch hẹn: {ex.Message}");
            }
        }       
        [HttpPost("appointments/{reservationId}/medicalrecord")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> CreateMedicalRecord(int reservationId, [FromBody] MedicalRecordDTO medicalRecordDTO)
        {
            try
            {
                if (medicalRecordDTO.ReservationId != reservationId.ToString())
                {
                    return BadRequest("ID lịch hẹn không khớp");
                }

                var result = await _doctorService.CreateMedicalRecord(reservationId, medicalRecordDTO);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi tạo bệnh án: {ex.Message}");
            }
        }

        [HttpGet("patients/{patientId}/isfirsttime")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> IsFirstTimePatient(int patientId)
        {
            try
            {
                var isFirstTime = await _doctorService.IsFirstTimePatient(patientId);
                
                return Ok(isFirstTime);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi kiểm tra bệnh nhân: {ex.Message}");
            }
        }

        [HttpGet("patients/{patientId}/medicalrecords")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> GetPatientMedicalHistory(int patientId)
        {
            try
            {
                var medicalRecords = await _doctorService.GetPatientPreviousMedicalRecords(patientId);
                
                if (medicalRecords == null || !medicalRecords.Any())
                {
                    return NoContent();
                }
                
                return Ok(medicalRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi lấy lịch sử khám bệnh: {ex.Message}");
            }
        }

        [HttpGet("{doctorId}/medicalrecords")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> GetDoctorMedicalRecords(int doctorId)
        {
            try
            {
                var medicalRecords = await _doctorService.GetDoctorMedicalRecords(doctorId);
                
                if (medicalRecords == null || !medicalRecords.Any())
                {
                    return NoContent();
                }
                
                return Ok(medicalRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi lấy danh sách bệnh án: {ex.Message}");
            }
        }

        [HttpGet("{doctorId}/patients/{patientId}/medicalrecords")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> GetMedicalRecordsByPatientAndDoctorId(int doctorId, int patientId)
        {
            try
            {
                var medicalRecords = await _doctorService.GetMedicalRecordsByPatientAndDoctorId(doctorId, patientId);
                
                if (medicalRecords == null || !medicalRecords.Any())
                {
                    return NoContent();
                }
                
                return Ok(medicalRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi lấy danh sách bệnh án: {ex.Message}");
            }
        }

        [HttpPost("appointments/{reservationId}/cancel-request")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> RequestAppointmentCancellation(int reservationId, [FromBody] CancellationRequestDTO request)
        {
            try
            {
                if (reservationId != request.ReservationId)
                {
                    return BadRequest("Reservation ID mismatch");
                }

                // Get reservation details
                var reservation = await _doctorService.GetAppointmentById(reservationId);
                if (reservation == null)
                {
                    return NotFound($"Appointment with ID={reservationId} not found");
                }

                // Chỉ lưu yêu cầu hủy lịch, KHÔNG hủy trực tiếp
                var updateResult = await _doctorService.RequestCancellation(reservationId, request.CancellationReason);
                if (!updateResult)
                {
                    return StatusCode(500, "Không thể gửi yêu cầu hủy lịch hẹn");
                }

                // Gửi thông báo đến lễ tân thông qua NotificationHub
                var notification = new CancellationNotificationDTO
                {
                    NotificationId = new Random().Next(1000, 9999), // Tạm thời sử dụng random ID
                    ReservationId = reservationId,
                    DoctorName = reservation.DoctorSchedule != null ? "Dr. " + reservation.DoctorSchedule.DoctorName : "Unknown Doctor",
                    PatientName = reservation.PatientName ?? "Unknown Patient",
                    AppointmentDate = reservation.AppointmentDate,
                    CancellationReason = request.CancellationReason,
                    RequestTime = DateTime.Now,
                    Status = "Pending" // Đang chờ xử lý, không phải đã hủy
                };

                // Gửi thông báo qua hub
                await _hubContext.Clients.All.SendAsync("ReceiveCancellationNotification", notification);
                
                return Ok(new { message = "Yêu cầu hủy lịch hẹn đã được gửi đến lễ tân", notification });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending cancellation request: {ex.Message}");
            }
        }

        // Tạo lại endpoint để chỉ cập nhật trạng thái
        [HttpPut("appointments/{reservationId}/status")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> UpdateAppointmentStatus(int reservationId, [FromBody] UpdateStatusDTO updateStatusDTO)
        {
            try
            {
                var result = await _doctorService.UpdateAppointmentStatus(reservationId, updateStatusDTO.Status);
                
                if (result)
                {
                    return Ok(result);
                }
                
                return NotFound("Không tìm thấy lịch hẹn");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi cập nhật trạng thái lịch hẹn: {ex.Message}");
            }
        }
    }

    // Thêm lại DTO đơn giản chỉ chứa trường Status chỉ để cập nhật Status 
    public class UpdateStatusDTO
    {
        public string Status { get; set; }
    }
}
