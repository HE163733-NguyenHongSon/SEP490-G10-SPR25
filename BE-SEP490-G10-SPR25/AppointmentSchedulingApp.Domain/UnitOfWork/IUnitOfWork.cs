using AppointmentSchedulingApp.Domain.IRepositories;
<<<<<<< Updated upstream:BE-SEP490-G10-SPR25/AppointmentSchedulingApp.Domain/UnitOfWork/IUnitOfWork.cs
=======

>>>>>>> Stashed changes:BE-SEP490-G10-SPR25/AppointmentSchedulingApp.Domain/IUnitOfWork/IUnitOfWork.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
<<<<<<< Updated upstream:BE-SEP490-G10-SPR25/AppointmentSchedulingApp.Domain/UnitOfWork/IUnitOfWork.cs
=======

>>>>>>> Stashed changes:BE-SEP490-G10-SPR25/AppointmentSchedulingApp.Domain/IUnitOfWork/IUnitOfWork.cs

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
