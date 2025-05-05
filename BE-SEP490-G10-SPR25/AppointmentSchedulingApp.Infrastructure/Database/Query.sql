

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
 (select r.ReservationId from Reservations r where r.PatientId=11 and r.Status='Hoàn thành' );


 select * from DoctorServices ds where ds.ServiceId=1


 ---------------------------Reservation---------------------------------------------------------
   select * from dbo.Reservations r where r.PatientId=23;
   ---------------------------------------------------------------
   UPDATE Reservations
     SET 
    Status = N'Đang chờ',
    CancellationReason = N'Lý do hủy từ khách hàng'
     WHERE 
    ReservationId in (15,5,11);

SELECT * FROM Reservations r WHERE r.DoctorScheduleId in (80, 40, 60, 20)

SELECT *
FROM Reservations r
WHERE r.Status = N'Đang chờ'
  AND CONVERT(DATE, r.CreatedDate) = CONVERT(DATE, GETDATE())
  AND DATEDIFF(HOUR, r.CreatedDate, GETDATE()) >= 2;


-----get doctor schedule active---------------
SELECT * 
FROM Reservations 
WHERE Status IN (N'Đang chờ', N'Xác nhận') and AppointmentDate>='2025-04-17' order by DoctorScheduleId

select * from DoctorSchedules ds where ds.ServiceId=1


-----------------------------invoice------------------------
select * from  dbo.Payments p where p.ReservationId in 
 (select r.ReservationId from Reservations r where r.PatientId=1) and p.PaymentStatus=N'Đã hoàn tiền';

