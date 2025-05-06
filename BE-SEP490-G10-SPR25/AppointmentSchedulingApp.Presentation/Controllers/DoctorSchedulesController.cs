using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.IdentityModel.Tokens;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorSchedulesController : ControllerBase
    {
        private readonly IDoctorScheduleService _doctorScheduleService;


        public DoctorSchedulesController(IDoctorScheduleService doctorScheduleService)
        {
            _doctorScheduleService = doctorScheduleService;

        }

        [HttpGet("GetAvailableSchedulesByServiceIdAndPatientId/{serviceId}/{patientId}")]
        [EnableQuery]
        public async Task<IActionResult> GetAvailableSchedulesByServiceIdAndPatientId(int serviceId,int patientId)
        {
            try
            {
                var availableSchedules = await _doctorScheduleService.GetAvailableSchedulesByServiceIdAndPatientId(serviceId,patientId);

                if (availableSchedules == null || !availableSchedules.Any())
                {
                    return NoContent();
                }

                return Ok(availableSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }




        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            try
            {
                var doctorSchedules = await _doctorScheduleService.GetDoctorScheduleList();

                if (doctorSchedules.IsNullOrEmpty())
                {
                    return NoContent();
                }

                return Ok(doctorSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("{serviceId}")]
        [EnableQuery]
        public async Task<IActionResult> GetDoctorScheduleListByServiceId(int serviceId)
        {
            try
            {
                var doctorSchedules = await _doctorScheduleService.GetDoctorScheduleListByServiceId(serviceId);

                if (doctorSchedules == null)
                {
                    return NotFound($"Dịch vụ với ID={serviceId} không tồn tại!");
                }

                return Ok(doctorSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetDoctorScheduleDetailById/{doctorScheduleId}")]
        [EnableQuery]
        public async Task<IActionResult> GetDoctorScheduleDetailById(int doctorScheduleId)
        {
            try
            {
                var doctorScheduleDetail = await _doctorScheduleService.GetDoctorScheduleDetailById(doctorScheduleId);

                if (doctorScheduleDetail == null)
                {
                    return NotFound($"Lịch trình với ID={doctorScheduleId} không tồn tại!");
                }

                return Ok(doctorScheduleDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

        [HttpPut]
        [EnableQuery]
        public async Task<IActionResult> UpdateDoctorSchedule(DoctorScheduleUpdateDTO doctorScheduleUpdateDTO)
        {
            try
            {
                var doctorSchedule = await _doctorScheduleService.GetDoctorScheduleDetailById(doctorScheduleUpdateDTO.DoctorScheduleId);

                if (doctorSchedule == null)
                {
                    return NotFound($"Lịch trình với ID={doctorScheduleUpdateDTO.DoctorScheduleId} không tồn tại!");
                }

                var isTrue = await _doctorScheduleService.UpdateDoctorSchedule(doctorScheduleUpdateDTO);

                return Ok(isTrue);
        }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

        [HttpPost]
        [EnableQuery]
        public async Task<IActionResult> AddDoctorSchedule(DoctorScheduleAddDTO doctorScheduleAddDTO)
        {
            try
            {
                var isTrue = await _doctorScheduleService.AddDoctorSchedule(doctorScheduleAddDTO);

                return Ok(isTrue);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }

        [HttpGet("filter&search")]
        [EnableQuery]
        public async Task<IActionResult> FilterAndSearchDoctorSchedule(string? doctorName, int? serviceId, string? day, int? roomId, int? slotId)
        {
            try
            {
                var doctorSchedules = await _doctorScheduleService.FilterAndSearchDoctorSchedule(doctorName, serviceId, day, roomId, slotId);
                if (doctorSchedules == null || !doctorSchedules.Any())
                {
                    return NoContent();
                }
                return Ok(doctorSchedules);
            }
            catch (Exception ex)
                {
                return StatusCode(500, ex.Message);
            }
                }

        [HttpGet("search")]
        [EnableQuery]
        public async Task<IActionResult> SearchDoctorScheduleByDoctorName(string? doctorName)
        {
            try
            {
                var doctorSchedules = await _doctorScheduleService.SearchDoctorScheduleByDoctorName(doctorName);
                if (doctorSchedules == null || !doctorSchedules.Any())
                {
                    return NoContent();
                }
                return Ok(doctorSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("GetAlternativeDoctorList/{reservationId}")]
        [EnableQuery]
        public async Task<IActionResult> GetAlternativeDoctorList(int reservationId)
        {
            try
            {
                var doctorSchedules = await _doctorScheduleService.IsDoctorBusyAtReservation(reservationId);


                return Ok(doctorSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
