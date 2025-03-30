-- Chạy đoạn  này trước 
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Services]') AND name = 'Rating')
BEGIN
    ALTER TABLE [dbo].[Services] ADD Rating DECIMAL(18,2) NULL;
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Services]') AND name = 'RatingCount')
BEGIN
    ALTER TABLE [dbo].[Services] ADD RatingCount INT NULL;
END

-- Add ServiceId column to Feedbacks table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Feedbacks]') AND name = 'ServiceId')
BEGIN
    ALTER TABLE [dbo].[Feedbacks] ADD ServiceId INT NULL;
    
    -- Add foreign key constraint
    ALTER TABLE [dbo].[Feedbacks] ADD CONSTRAINT FK_Feedbacks_Service 
    FOREIGN KEY (ServiceId) REFERENCES Services(ServiceId);
END
-- chạy xong đoạn trên rồi mới chạy đoạn dưới đây 
-- Update ServiceId in Feedbacks based on relationship with Reservations and DoctorSchedules
-- This assumes Feedbacks are linked to Reservations which are linked to DoctorSchedules which have a ServiceId
UPDATE f
SET f.ServiceId = ds.ServiceId
FROM Feedbacks f
JOIN Reservations r ON f.ReservationId = r.ReservationId
JOIN DoctorSchedules ds ON r.DoctorScheduleId = ds.DoctorScheduleId
WHERE f.ServiceId IS NULL;

-- Update Rating and RatingCount in Services based on Feedback data
-- Calculate average rating and count for each service
UPDATE s
SET 
    s.Rating = (SELECT AVG(CAST(f.ServiceFeedbackGrade AS DECIMAL(18,2)))
               FROM Feedbacks f
               WHERE f.ServiceId = s.ServiceId
               AND f.ServiceFeedbackGrade IS NOT NULL),
    s.RatingCount = (SELECT COUNT(*)
                    FROM Feedbacks f
                    WHERE f.ServiceId = s.ServiceId
                    AND f.ServiceFeedbackGrade IS NOT NULL)
FROM Services s
WHERE EXISTS (SELECT 1 FROM Feedbacks f WHERE f.ServiceId = s.ServiceId AND f.ServiceFeedbackGrade IS NOT NULL);

-- For services without feedback, set default values
UPDATE Services
SET Rating = NULL, RatingCount = 0
WHERE Rating IS NULL; 