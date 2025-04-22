using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public PaymentService(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }

        public async Task<bool> AddPayment(PaymentDTO paymentDTO)
        {
            if (paymentDTO == null)
            {
                throw new ArgumentNullException(nameof(paymentDTO), "paymentDTO cannot be null");
            }

            var payment = new Payment
            {
                PayerId = paymentDTO.PayerId,
                Amount = paymentDTO.Amount,
                PaymentStatus = paymentDTO.PaymentStatus,
                TransactionId = paymentDTO.TransactionId,
                PaymentMethod = paymentDTO.PaymentMethod,
            };

            try
            {
                await unitOfWork.PaymentRepository.AddAsync(payment);
                await unitOfWork.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while adding checkout: {ex.Message}");
                throw;
            }
        }



        //public List<PaymentDTO> GetPaymentList()
        //{
        //    return mapper.Map<List<CheckoutDTO>>(unitOfWork.CheckoutRepository.GetListCheckoutByInclude().ToList());
        //}
    }
}


