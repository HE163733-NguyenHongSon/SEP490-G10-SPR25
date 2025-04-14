

  select * from dbo.DoctorSchedules ds where ds.DoctorId=33; 

  -----------------------Medical report-----------------------------------------------------------
  select * from Reservations  r where  r.PatientId=23 AND r.Status = 'Hoàn thành';
  ----------------------numberOfVisited------------------------------

  SELECT COUNT(r.ReservationId) AS numberOfVisits
FROM Reservations r
WHERE r.PatientId = 23 AND r.Status = 'Hoàn thành';

SELECT r.PatientId, COUNT(r.ReservationId) AS numberOfVisits
FROM Reservations r
WHERE r.Status = 'Hoàn thành'
GROUP BY r.PatientId;
---------------------------Medical record---------------------------------------------------------------------
select mr.ReservationId,mr.Symptoms,mr.Diagnosis,mr.TreatmentPlan,mr.FollowUpDate,mr.Notes,mr.CreatedAt
from  MedicalRecords mr inner join  Reservations r on mr.ReservationId=r.ReservationId where  mr.ReservationId in
 (select r.ReservationId from Reservations r where r.PatientId=23 and r.Status='Hoàn thành' );


 select * from DoctorServices ds where ds.ServiceId=1


 ---------------------------Reservation---------------------------------------------------------
   select * from dbo.Reservations r where r.PatientId=23;
   ---------------------------------------------------------------
   UPDATE Reservations
     SET 
    Status = N'Đang chờ',
    CancellationReason = N'Lý do hủy từ khách hàng'
     WHERE 
    ReservationId = 11;