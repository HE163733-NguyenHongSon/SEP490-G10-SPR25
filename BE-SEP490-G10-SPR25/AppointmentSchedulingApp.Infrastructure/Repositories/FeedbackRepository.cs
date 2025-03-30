using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.Repositories;
using AppointmentSchedulingApp.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly AppointmentSchedulingDbContext _context;

        public FeedbackRepository(AppointmentSchedulingDbContext context)
        {
            _context = context;
        }

        public async Task<IQueryable<Feedback>> GetAll()
        {
            return _context.Feedbacks.AsQueryable();
        }

        public async Task<Feedback> GetById(int id)
        {
            return await _context.Feedbacks.FindAsync(id);
        }

        public async Task Add(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
        }

        public async Task Update(Feedback feedback)
        {
            _context.Feedbacks.Update(feedback);
        }

        public async Task Delete(int id)
        {
            var feedback = await GetById(id);
            if (feedback != null)
            {
                _context.Feedbacks.Remove(feedback);
            }
        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByServiceId(int serviceId)
        {
            // Direct approach using the ServiceId field
            var feedbacks = await _context.Feedbacks
                .Where(f => f.ServiceId == serviceId)
                .ToListAsync();

            // If no direct connections found, fallback to the relationship path
            if (!feedbacks.Any())
            {
                feedbacks = await _context.Feedbacks
                    .Include(f => f.Reservation)
                    .ThenInclude(r => r.DoctorSchedules)
                    .Where(f => f.Reservation.DoctorSchedules.Any(ds => ds.ServiceId == serviceId))
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