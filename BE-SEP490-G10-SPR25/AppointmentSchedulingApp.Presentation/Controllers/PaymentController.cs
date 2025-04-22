using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IPaymentService paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }

        [HttpGet("getListCheckout")]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            return Ok();
        }
        [HttpPost("addCheckout")]
        public async Task<IActionResult> AddCheckout([FromBody]PaymentDTO payment)
        {
            //paymentService.AddCheckout(checkout);
            return Ok();
        }
    }
}
