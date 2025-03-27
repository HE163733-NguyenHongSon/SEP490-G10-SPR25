select * from  dbo.ReservationDoctorSchedules rds
inner join dbo.Reservations r on rds.ReservationId=r.ReservationId
  inner join  dbo.DoctorSchedules ds on  rds.DoctorScheduleId=ds.DoctorScheduleId 
  where  ds.DoctorScheduleId in (select ds.DoctorScheduleId from dbo.DoctorSchedules ds where ds.DoctorId=33) ;



  select * from dbo.DoctorSchedules ds where ds.DoctorId=33; 