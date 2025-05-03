using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VnPayController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly IPaymentService _paymentService;
        private readonly IReservationService _reservationService;

        public VnPayController(IVnPayService vnPayService, IPaymentService paymentService, IReservationService reservationService)
        {
            _vnPayService = vnPayService;
            _paymentService = paymentService;
            _reservationService = reservationService;
        }

        [HttpPost("payment")]
        public IActionResult StartPayment([FromBody] PaymentDTO payment)
        {
            if (payment.PaymentMethod != "VNPay")
                return BadRequest("Phương thức không được hỗ trợ");

            var paymentUrl = _vnPayService.CreatePaymentUrl(HttpContext, payment);
            return Ok(new { PaymentUrl = paymentUrl });
        }

        [HttpGet("callback")]
        public async Task<IActionResult> PaymentCallback()
        {
            var response = await _vnPayService.PaymentExecuteAsync(Request.Query);

            if (response == null || response.VnPayResponseCode != "00")
            {
                return Redirect($"http://localhost:3000/patient/appointment-booking/vnpay-return?status=fail&code={response?.VnPayResponseCode}");
            }

            return Redirect($"http://localhost:3000/patient/appointment-booking/vnpay-return?status=success" +
                $"&reservationId={response.ReservationId}" +
                $"&transactionId={response.TransactionId}" +
                $"&amount={response.Amount}" +
                $"&paymentMethod={response.PaymentMethod}" +
                $"&paymentStatus={Uri.EscapeDataString(response.PaymentStatus)}" +
                $"&code={response.VnPayResponseCode}");
        }

    }

}
