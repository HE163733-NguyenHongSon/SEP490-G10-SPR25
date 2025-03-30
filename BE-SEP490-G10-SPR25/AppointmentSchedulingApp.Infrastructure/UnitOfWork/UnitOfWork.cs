﻿using AppointmentSchedulingApp.Domain.Repositories;
using AppointmentSchedulingApp.Domain.UnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.Repositories;

namespace AppointmentSchedulingApp.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppointmentSchedulingDbContext _dbContext;

        private IDoctorRepository _doctorRepository;
        private IMedicalRecordRepository _medicalRecordRepository;
        private IReservationRepository _reservationRepository;
        private IServiceRepository _serviceRepository;
        private ISpecialtyRepository _specialtyRepository;
        private IFeedbackRepository _feedbackRepository;

        public UnitOfWork(AppointmentSchedulingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IDoctorRepository DoctorRepository =>
            _doctorRepository ??= new DoctorRepository(_dbContext);

        public IMedicalRecordRepository MedicalRecordRepository =>
            _medicalRecordRepository ??= new MedicalRecordRepository(_dbContext);

        public IReservationRepository ReservationRepository =>
            _reservationRepository ??= new ReservationRepository(_dbContext);

        public IServiceRepository ServiceRepository =>
            _serviceRepository ??= new ServiceRepository(_dbContext);

        public ISpecialtyRepository SpecialtyRepository =>
            _specialtyRepository ??= new SpecialtyRepository(_dbContext);

        public IFeedbackRepository FeedbackRepository
        {
            get
            {
                if (_feedbackRepository == null)
                {
                    _feedbackRepository = new FeedbackRepository(_dbContext);
                }
                return _feedbackRepository;
            }
        }

        public void Commit() => _dbContext.SaveChanges();

        public async Task CommitAsync() => await _dbContext.SaveChangesAsync();

        public void Rollback() => _dbContext.Dispose();

        public async Task RollbackAsync() => await _dbContext.DisposeAsync();
    }
}
