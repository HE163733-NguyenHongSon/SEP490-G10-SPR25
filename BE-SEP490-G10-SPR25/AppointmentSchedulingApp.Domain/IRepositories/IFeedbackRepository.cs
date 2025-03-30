using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.Entities;

namespace AppointmentSchedulingApp.Domain.IRepositories
{
    public interface IFeedbackRepository
    {
        Task<IQueryable<Feedback>> GetAll();
        Task<Feedback> GetById(int id);
        Task Add(Feedback feedback);
        Task Update(Feedback feedback);
        Task Delete(int id);
        Task<IEnumerable<Feedback>> GetFeedbacksByServiceId(int serviceId);
        Task<(decimal? AverageRating, int Count)> GetServiceRatingInfo(int serviceId);
    }
} 