using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore.Storage;

namespace AppointmentSchedulingApp.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppointmentSchedulingDbContext _dbContext;
        private IDbContextTransaction _transaction;

        private IDoctorRepository _doctorRepository;
        private IPatientRepository _patientRepository;
        private IMedicalRecordRepository _medicalRecordRepository;
        private IReservationRepository _reservationRepository;
        private IServiceRepository _serviceRepository;
        private ISpecialtyRepository _specialtyRepository;
        private IUserRepository _userRepository;
        private IFeedbackRepository _feedbackRepository;
        private IPostRepository _postRepository;
        private IRoleRepository _roleRepository;
        private ICommentRepository _commentRepository;
        private IDoctorScheduleRepository _doctorScheduleRepository;

        private IRoomRepository _roomRepository;
        private ISlotRepository _slotRepository;

        private IPaymentRepository _paymentRepository; 



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
            _userRepository ??= new UserRepository(_dbContext);

        public IFeedbackRepository FeedbackRepository =>
            _feedbackRepository ??= new FeedbackRepository(_dbContext);

        public IPostRepository PostRepository =>
            _postRepository ??= new PostRepository(_dbContext);

        public IRoleRepository RoleRepository =>
            _roleRepository ??= new RoleRepository(_dbContext);

        public ICommentRepository CommentRepository =>
            _commentRepository ??= new CommentRepository(_dbContext);

        public IDoctorScheduleRepository DoctorScheduleRepository =>
            _doctorScheduleRepository ??= new DoctorScheduleRepository(_dbContext);


        public IRoomRepository RoomRepository =>
           _roomRepository ??= new RoomRepository(_dbContext);

        public ISlotRepository SlotRepository =>
            _slotRepository ??= new SlotRepository(_dbContext); 
        
        
        public IPaymentRepository PaymentRepository =>
            _paymentRepository ??= new PaymentRepository(_dbContext);

        public void Commit() => _dbContext.SaveChanges();

        public async Task CommitAsync() => await _dbContext.SaveChangesAsync();

        public void Rollback() => _dbContext.Dispose();

        public async Task RollbackAsync() => await _dbContext.DisposeAsync();

        public async Task BeginTransactionAsync()
        {
            _transaction = await _dbContext.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            await _transaction.CommitAsync();
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                _transaction.Dispose();
            }
        }

        public Task<int> SaveAsync()
        {
            throw new NotImplementedException();
        }
    }
}
