using AppointmentSchedulingApp.Domain.Contracts.Repositories;

namespace AppointmentSchedulingApp.Domain.Contracts.UnitOfWork
{
    public interface IUnitOfWork
    {
        ICategoryRepository CategoryRepository { get; }
        IDoctorRepository DoctorRepository { get; }
        IMedicalRecordRepository MedicalRecordRepository { get; }
        IReservationRepository ReservationRepository { get; }
        IServiceRepository ServiceRepository { get; }
        ISpecialtyRepository SpecialtyRepository { get; }

        void Commit();

        void Rollback();

        Task CommitAsync();

        Task RollbackAsync();


    }
}
