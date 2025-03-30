using AppointmentSchedulingApp.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.UnitOfWork
{
    public interface IUnitOfWork
    {
        IDoctorRepository DoctorRepository { get; }
        IMedicalRecordRepository MedicalRecordRepository { get; }
        IReservationRepository ReservationRepository { get; }
        IServiceRepository ServiceRepository { get; }
        ISpecialtyRepository SpecialtyRepository { get; }
        IFeedbackRepository FeedbackRepository { get; }

        void Commit();

        void Rollback();

        Task CommitAsync();

        Task RollbackAsync();


    }
}
