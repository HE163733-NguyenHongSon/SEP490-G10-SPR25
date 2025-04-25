
using AppointmentSchedulingApp.Application.DTOs;
using Microsoft.AspNetCore.Http;

namespace AppointmentSchedulingApp.Application.IServices

{
    public interface IVnPayService
    {
        string CreatePaymentUrl(HttpContext context, PaymentDTO model);
        Task<PaymentDTO> PaymentExecuteAsync(IQueryCollection collections);
    }
}