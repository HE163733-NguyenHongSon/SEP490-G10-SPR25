﻿
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.Repositories;

namespace AppointmentSchedulingApp.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppointmentSchedulingDbContext _dbContext;

        private IDoctorRepository _doctorRepository;
        private IPatientRepository _patientRepository;
        private IMedicalRecordRepository _medicalRecordRepository;
        private IReservationRepository _reservationRepository;
        private IServiceRepository _serviceRepository;
        private ISpecialtyRepository _specialtyRepository;
        private IUserRepository _userRepository;
        private IFeedbackRepository _feedbackRepository;
        public UnitOfWork(AppointmentSchedulingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IDoctorRepository DoctorRepository =>
            _doctorRepository ??= new DoctorRepository(_dbContext);

        public IPatientRepository PatientRepository =>
            _patientRepository ??= new PatientRepository(_dbContext);

        public IMedicalRecordRepository MedicalRecordRepository =>
            _medicalRecordRepository ??= new MedicalRecordRepository(_dbContext);

        public IReservationRepository ReservationRepository =>
            _reservationRepository ??= new ReservationRepository(_dbContext);

        public IServiceRepository ServiceRepository =>
            _serviceRepository ??= new ServiceRepository(_dbContext);

        public ISpecialtyRepository SpecialtyRepository =>
            _specialtyRepository ??= new SpecialtyRepository(_dbContext); 
        
        public IUserRepository UserRepository =>
            _userRepository ??= new UserRepository (_dbContext);
        
        public IFeedbackRepository  FeedbackRepository   =>
            _feedbackRepository ??= new FeedbackRepository (_dbContext);

        
                
        public void Commit() => _dbContext.SaveChanges();

        public async Task CommitAsync() => await _dbContext.SaveChangesAsync();

        public void Rollback() => _dbContext.Dispose();

        public async Task RollbackAsync() => await _dbContext.DisposeAsync();
    }
}
