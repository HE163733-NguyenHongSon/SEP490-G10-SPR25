using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }

        public FeedbackService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        public async Task<List<FeedbackDTO>> GetFeedbackList()
        {

            return mapper.Map<List<FeedbackDTO>>(await unitOfWork.FeedbackRepository.GetAll());
        }
    }
}
