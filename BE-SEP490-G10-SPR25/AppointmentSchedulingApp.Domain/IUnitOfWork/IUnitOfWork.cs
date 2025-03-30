using AppointmentSchedulingApp.Domain.IRepositories;
<<<<<<< HEAD:BE-SEP490-G10-SPR25/AppointmentSchedulingApp.Domain/IUnitOfWork/IUnitOfWork.cs
=======
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
>>>>>>> HE161511-DinhQuangTung:BE-SEP490-G10-SPR25/AppointmentSchedulingApp.Domain/UnitOfWork/IUnitOfWork.cs

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
