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


        public async Task<bool> UpdatePaymentStatusByReservationId(int reservationId, string status)
        {
            var payment = await unitOfWork.PaymentRepository.Get(x => x.ReservationId == reservationId);
            if (payment != null)
            {
                payment.PaymentStatus = status;
                unitOfWork.PaymentRepository.Update(payment);
                await unitOfWork.CommitAsync();
                return true;
            }
            return false;
        }
    }
}


