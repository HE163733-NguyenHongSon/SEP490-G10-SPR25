using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("accounts")]
        public async Task<ActionResult<List<UserDTO>>> GetAllAccounts()
        {
            var accounts = await _adminService.GetAllAccounts();
            return Ok(accounts);
        }

        [HttpGet("accounts/by-type")]
        public async Task<ActionResult<Dictionary<string, List<UserDTO>>>> GetAccountsByType()
        {
            try
            {
                var accounts = await _adminService.GetAccountsByType();
                return Ok(accounts);
            }
            catch (Microsoft.Data.SqlClient.SqlException sqlEx)
            {
                // Bắt cụ thể lỗi SQL - bao gồm lỗi "Invalid column name"
                return StatusCode(500, new { message = "Lỗi truy vấn cơ sở dữ liệu", error = sqlEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi khi lấy danh sách tài khoản", error = ex.Message });
            }
        }

        [HttpPost("accounts/doctor")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<ActionResult<UserDTO>> CreateDoctorAccount([FromBody] AdminDTO adminDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newAccount = await _adminService.CreateDoctorAccount(adminDTO);
                return Ok(newAccount);
            }
            catch (System.ComponentModel.DataAnnotations.ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the doctor account", error = ex.Message });
            }
        }

        [HttpPost("accounts/receptionist")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<ActionResult<UserDTO>> CreateReceptionistAccount([FromBody] AdminDTO adminDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newAccount = await _adminService.CreateReceptionistAccount(adminDTO);
                return Ok(newAccount);
            }
            catch (System.ComponentModel.DataAnnotations.ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the receptionist account", error = ex.Message });
            }
        }

        [HttpPut("accounts/{userId}")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<ActionResult<UserDTO>> UpdateAccount(int userId, [FromBody] AdminDTO adminDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedAccount = await _adminService.UpdateAccount(userId, adminDTO);
                return Ok(updatedAccount);
            }
            catch (System.ComponentModel.DataAnnotations.ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the account", error = ex.Message });
            }
        }

        [HttpDelete("accounts/{userId}")]
        public async Task<ActionResult<bool>> DeleteAccount(int userId)
        {
            var result = await _adminService.DeleteAccount(userId);
            return Ok(result);
        }

        [HttpPatch("accounts/{userId}/status")]
        public async Task<ActionResult<bool>> ToggleAccountStatus(int userId, [FromQuery] bool isActive)
        {
            var result = await _adminService.ToggleAccountStatus(userId, isActive);
            return Ok(result);
        }

        [HttpGet("roles")]
        public async Task<ActionResult<List<RoleDTO>>> GetAllRoles()
        {
            var roles = await _adminService.GetAllRoles();
            return Ok(roles);
        }

        [HttpPost("accounts/{userId}/roles/{roleId}")]
        public async Task<ActionResult<bool>> AssignRole(int userId, int roleId)
        {
            var result = await _adminService.AssignRole(userId, roleId);
            return Ok(result);
        }

        [HttpDelete("accounts/{userId}/roles/{roleId}")]
        public async Task<ActionResult<bool>> RemoveRole(int userId, int roleId)
        {
            var result = await _adminService.RemoveRole(userId, roleId);
            return Ok(result);
        }


        [HttpGet("Dashboard")]
        public IActionResult GetDashboardData()
        {
            var dashboardData = _adminService.DashboardAdmin();
            return Ok(dashboardData);
        }

        [HttpGet("statistics/last-12-months")]
        public async Task<ActionResult<List<StatisticDTO>>> GetStatisticsForLast12Months()
        {
            try
            {
                var statistics = await _adminService.GetStatisticsForLast12Months();
                return Ok(statistics);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching statistics", error = ex.Message });
            }
        }

    }
}