using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private IPaymentService paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }

        [HttpGet("GetPaymentList")]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok();
        }
        [HttpPut("UpdateStatus")]
        public async Task<IActionResult> UpdatePaymentStatusByReservationId(int reservationId, string status)
        {
            try
            {
                var isUpdateSuccess = await paymentService.UpdatePaymentStatusByReservationId(reservationId, status);
                if (isUpdateSuccess)
                {
                    return Ok(new { message = "Payment status updated successfully." });
                }
                else
                {
                    return NotFound(new { message = "Payment not found" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


    }
}
