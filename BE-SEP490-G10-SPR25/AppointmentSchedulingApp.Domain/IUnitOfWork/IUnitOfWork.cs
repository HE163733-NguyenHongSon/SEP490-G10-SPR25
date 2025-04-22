using AppointmentSchedulingApp.Domain.IRepositories;

namespace AppointmentSchedulingApp.Domain.IUnitOfWork
{
    public interface IUnitOfWork
    {
        IDoctorRepository DoctorRepository { get; }
        IPatientRepository PatientRepository { get; }
        IMedicalRecordRepository MedicalRecordRepository { get; }
        IReservationRepository ReservationRepository { get; }
        IServiceRepository ServiceRepository { get; }
        ISpecialtyRepository SpecialtyRepository { get; }

        IPostRepository PostRepository { get; }
        ICommentRepository CommentRepository { get; }
        IUserRepository  UserRepository { get; }
        IRoleRepository RoleRepository { get; }
        IFeedbackRepository FeedbackRepository { get; }
        IDoctorScheduleRepository DoctorScheduleRepository { get; }

        IRoomRepository RoomRepository { get; }
        ISlotRepository SlotRepository { get; }

        IPaymentRepository PaymentRepository { get; }
        void Commit();

        void Rollback();

        Task CommitAsync();

        Task RollbackAsync();

        // Transaction methods
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
        Task<int> SaveAsync();
    }
}
