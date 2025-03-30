using AppointmentSchedulingApp.Domain.IRepositories;

namespace AppointmentSchedulingApp.Domain.IUnitOfWork
{
    public interface IUnitOfWork
    {
        IDoctorRepository DoctorRepository { get; }
        IMedicalRecordRepository MedicalRecordRepository { get; }
        IReservationRepository ReservationRepository { get; }
        IServiceRepository ServiceRepository { get; }
        ISpecialtyRepository SpecialtyRepository { get; }

        IUserRepository  UserRepository { get; }
        void Commit();

        void Rollback();

        Task CommitAsync();

        Task RollbackAsync();


    }
}
