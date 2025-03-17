using AppointmentSchedulingApp.Domain.Repositories;

namespace AppointmentSchedulingApp.Domain.UnitOfWork
{
    public interface IUnitOfWork
    {
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
