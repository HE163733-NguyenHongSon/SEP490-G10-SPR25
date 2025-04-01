using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class FeedbackRepository :GenericRepository<Feedback>, IFeedbackRepository
    {

        public FeedbackRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }

        
        public async Task<IEnumerable<Feedback>> GetFeedbacksByServiceId(int serviceId)
        {
            // Direct approach using the ServiceId field
            var feedbacks = await _entitySet
                .Where(f => f.Reservation.DoctorSchedule.ServiceId == serviceId)
                .ToListAsync();

            // If no direct connections found, fallback to the relationship path
            if (!feedbacks.Any())
            {
                feedbacks = await _entitySet
                    .Include(f => f.Reservation)
                    .ThenInclude(r => r.DoctorSchedule)
                    .Where(f => f.Reservation.DoctorSchedule.Service.ServiceId == serviceId) 
                    .ToListAsync();
            }

            return feedbacks;
        }

        public async Task<(decimal? AverageRating, int Count)> GetServiceRatingInfo(int serviceId)
        {
            var feedbacks = await GetFeedbacksByServiceId(serviceId);
            
            // Filter feedbacks that have a grade for the service
            var validFeedbacks = feedbacks.Where(f => f.ServiceFeedbackGrade.HasValue);
            var count = validFeedbacks.Count();
            
            if (count == 0)
            {
                return (null, 0);
            }
            
            // Calculate the average rating
            var averageRating = (decimal)validFeedbacks.Average(f => f.ServiceFeedbackGrade.Value);
            return (averageRating, count);
        }
    }
} 