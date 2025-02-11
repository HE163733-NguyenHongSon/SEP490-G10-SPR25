CREATE DATABASE AppointmentSchedulingDB;
GO

USE AppointmentSchedulingDB;
GO


CREATE TABLE Users (
  UserId INT NOT NULL IDENTITY(1,1),
  CitizenId BIGINT  NOT NULL,
  Email VARCHAR(30)  NULL,
  Password VARCHAR(20) NOT NULL,
  UserName VARCHAR(50) NOT NULL ,
  Phone VARCHAR(12) NOT NULL,
  Gender VARCHAR(6) NOT NULL,
  Dob DATE NOT NULL,
  Address VARCHAR(100) NOT NULL,
  Role VARCHAR(20) NOT NULL,
  AvatarUrl VARCHAR(200) NULL,
  IsVerify BIT NOT NULL DEFAULT 0,  
  PRIMARY KEY (UserId),
  CONSTRAINT CitizenId_Unique UNIQUE (CitizenId),
  CONSTRAINT Email_Unique UNIQUE (Email),
  CONSTRAINT Phone_Unique UNIQUE (Phone),
  CONSTRAINT User_CheckGender CHECK (Gender IN ('Male', 'Female'))
);

INSERT INTO Users (CitizenId, Email, Password, UserName, Phone, Gender, Dob, Address, Role, AvatarUrl, IsVerify)
VALUES
-- 1-20 -- bác sĩ (Doctors)
(035002005151, 'doctor1@example.com', 'DoctorPass1', 'Dr. John', '0912345671', 'Male', '1980-03-10', '12 Health Lane', 'Doctor', 'https://example.com/avatars/doctor1.jpg', 0),
(035002005152, 'doctor2@example.com', 'DoctorPass2', 'Dr. Mary', '0912345672', 'Female', '1985-07-25', '34 Health Lane', 'Doctor', 'https://example.com/avatars/doctor2.jpg', 0),
(035002005153, 'doctor3@example.com', 'DoctorPass3', 'Dr. Smith', '0912345673', 'Male', '1990-11-12', '56 Health Lane', 'Doctor', 'https://example.com/avatars/doctor3.jpg', 0),
(035002005154, 'doctor4@example.com', 'DoctorPass4', 'Dr. Lisa', '0912345674', 'Female', '1983-09-14', '78 Health Lane', 'Doctor', 'https://example.com/avatars/doctor4.jpg', 0),
(035002005155, 'doctor5@example.com', 'DoctorPass5', 'Dr. Alan', '0912345675', 'Male', '1992-02-22', '90 Health Lane', 'Doctor', 'https://example.com/avatars/doctor5.jpg', 0),
(035002005156, 'doctor6@example.com', 'DoctorPass6', 'Dr. Sophia', '0912345676', 'Female', '1989-06-08', '23 Medical Blvd', 'Doctor', 'https://example.com/avatars/doctor6.jpg', 0),
(035002005157, 'doctor7@example.com', 'DoctorPass7', 'Dr. Henry', '0912345677', 'Male', '1978-11-18', '11 Clinic Street', 'Doctor', 'https://example.com/avatars/doctor7.jpg', 0),
(035002005158, 'doctor8@example.com', 'DoctorPass8', 'Dr. Olivia', '0912345678', 'Female', '1986-01-05', '14 Doctor Avenue', 'Doctor', 'https://example.com/avatars/doctor8.jpg', 0),
(035002005159, 'doctor9@example.com', 'DoctorPass9', 'Dr. Ethan', '0912345679', 'Male', '1993-03-15', '17 Medical Street', 'Doctor', 'https://example.com/avatars/doctor9.jpg', 0),
(035002005160, 'doctor10@example.com', 'DoctorPass10', 'Dr. Grace', '0912345680', 'Female', '1982-12-12', '29 Health Boulevard', 'Doctor', 'https://example.com/avatars/doctor10.jpg', 0),
(035002005161, 'doctor11@example.com', 'DoctorPass11', 'Dr. Chris', '0912345681', 'Male', '1981-04-21', '34 Clinic Road', 'Doctor', 'https://example.com/avatars/doctor11.jpg', 0),
(035002005162, 'doctor12@example.com', 'DoctorPass12', 'Dr. Sarah', '0912345682', 'Female', '1984-05-13', '55 Medical Park', 'Doctor', 'https://example.com/avatars/doctor12.jpg', 0),
(035002005163, 'doctor13@example.com', 'DoctorPass13', 'Dr. Jack', '0912345683', 'Male', '1991-07-09', '76 Doctor Square', 'Doctor', 'https://example.com/avatars/doctor13.jpg', 0),
(035002005164, 'doctor14@example.com', 'DoctorPass14', 'Dr. Emily', '0912345684', 'Female', '1988-12-19', '87 Clinic Lane', 'Doctor', 'https://example.com/avatars/doctor14.jpg', 0),
(035002005165, 'doctor15@example.com', 'DoctorPass15', 'Dr. Liam', '0912345685', 'Male', '1986-03-17', '44 Health Avenue', 'Doctor', 'https://example.com/avatars/doctor15.jpg', 0),
(035002005166, 'doctor16@example.com', 'DoctorPass16', 'Dr. Mia', '0912345686', 'Female', '1990-10-05', '67 Medical Street', 'Doctor', 'https://example.com/avatars/doctor16.jpg', 0),
(035002005167, 'doctor17@example.com', 'DoctorPass17', 'Dr. Noah', '0912345687', 'Male', '1987-08-23', '88 Clinic Road', 'Doctor', 'https://example.com/avatars/doctor17.jpg', 0),
(035002005168, 'doctor18@example.com', 'DoctorPass18', 'Dr. Ava', '0912345688', 'Female', '1989-06-11', '99 Medical Lane', 'Doctor', 'https://example.com/avatars/doctor18.jpg', 0),
(035002005169, 'doctor19@example.com', 'DoctorPass19', 'Dr. James', '0912345689', 'Male', '1983-11-08', '22 Health Park', 'Doctor', 'https://example.com/avatars/doctor19.jpg', 0),
(035002005170, 'doctor20@example.com', 'DoctorPass20', 'Dr. Charlotte', '0912345690', 'Female', '1982-01-15', '33 Clinic Avenue', 'Doctor', 'https://example.com/avatars/doctor20.jpg', 0),

-- 21-22 -- lễ tân (Receptionists)
(035002005171, 'receptionist1@example.com', 'RecepPass1', 'Receptionist One', '0912345691', 'Female', '1995-02-18', '22 Office Road', 'Receptionist', 'https://example.com/avatars/receptionist1.jpg', 0),
(035002005172, 'receptionist2@example.com', 'RecepPass2', 'Receptionist Two', '0912345692', 'Male', '1997-06-30', '33 Office Road', 'Receptionist', 'https://example.com/avatars/receptionist2.jpg', 0),

-- 23-26 -- bệnh nhân (Patients)
(035002005173, 'patient1@example.com', 'PatientPass1', 'Patient One', '0912345693', 'Male', '1990-04-15', '101 Patient Street', 'Patient', 'https://example.com/avatars/patient1.jpg', 0),
(035002005174, 'patient2@example.com', 'PatientPass2', 'Patient Two', '0912345694', 'Female', '1995-08-20', '102 Patient Avenue', 'Patient', 'https://example.com/avatars/patient2.jpg', 0),
(035002005175, 'patient3@example.com', 'PatientPass3', 'Patient Three', '09123456954', 'Female', '1995-08-20', '103 Patient Avenue', 'Patient', 'https://example.com/avatars/patient2.jpg', 0),
(035002005176, 'patient4@example.com', 'PatientPass4', 'Patient Four', '0912345696', 'Female', '1995-08-20', '104 Patient Avenue', 'Patient', 'https://example.com/avatars/patient2.jpg', 0);

-----------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Categories (
  CategoryId INT NOT NULL IDENTITY(1,1),
  CategoryName VARCHAR(30) NOT NULL,
  Image NVARCHAR(200) NOT NULL ,
  PRIMARY KEY (CategoryId)
) ;
INSERT INTO Categories (CategoryName, Image) 
VALUES 
('General Medicine', 'https://example.com/general_medicine.jpg'),
('Surgery', 'https://example.com/surgery.jpg'),
('Pediatrics', 'https://example.com/pediatrics.jpg'),
('Dermatology', 'https://example.com/dermatology.jpg'),
('Ophthalmology', 'https://example.com/ophthalmology.jpg');

--------------------------------------------------------------------------
CREATE TABLE Devices (
    DeviceId INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(255) NOT NULL,             
    Description TEXT,                      
    Functionality TEXT                      
);
INSERT INTO Devices (Name, Description, Functionality)
VALUES
    ('MRI Scanner', 'Magnetic Resonance Imaging device', 'Provides detailed imaging of internal organs'),
    ('X-Ray Machine', 'Standard X-ray imaging device', 'Produces X-ray images for diagnostic purposes'),
    ('ECG Machine', 'Electrocardiogram device', 'Monitors and records the electrical activity of the heart'),
    ('Ultrasound Machine', 'Used for non-invasive imaging', 'Creates real-time images of internal organs'),
    ('Stethoscope', 'Standard diagnostic tool', 'Used for auscultation of heart and lungs'),
    ('Blood Pressure Monitor', 'Measures blood pressure', 'Monitors systolic and diastolic pressure'),
    ('Ophthalmoscope', 'Eye examination tool', 'Used to inspect the retina and other parts of the eye'),
    ('Dental Tools', 'Specialized tools for dental exams', 'Includes scaler, mirror, and probe');

----------------------------------------------------------------------------------


CREATE TABLE Specialties (
  SpecialtyId INT NOT NULL IDENTITY(1,1),
  SpecialtyName VARCHAR(100) NOT NULL,
  SpecialtyDescription TEXT,
  Image VARCHAR(200)  NULL default 'https://th.bing.com/th/id/OIP.5kVbDAdvd-TbbhL31d-2sgHaE4?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  PRIMARY KEY (SpecialtyId)
);
INSERT INTO Specialties (SpecialtyName, SpecialtyDescription)
VALUES
  ('General Internal Medicine', 'Treats non-surgical diseases and manages general health conditions of the body.'),
  ('Cardiology', 'Specializes in diseases related to the heart and blood vessels.'),
  ('Endocrinology', 'Treats diseases related to hormones and the endocrine glands (such as diabetes, hypothyroidism).'),
  ('Gastroenterology', 'Specializes in issues related to the digestive system, such as the stomach, intestines, and liver.'),
  ('General Surgery', 'Surgeries related to internal organs.'),
  ('Neurosurgery', 'Treats neurological diseases that require surgery, such as brain and spinal cord surgeries.'),
  ('Orthopedic Surgery', 'Specializes in treating bone and joint injuries.'),
  ('Obstetrics', 'Treats issues related to pregnancy and childbirth.'),
  ('Gynecology', 'Treats diseases related to the female reproductive system.'),
  ('Pediatrics', 'Specializes in the health and care of children from newborns to adolescents.'),
  ('Ophthalmology', 'Treats diseases related to the eyes and vision.'),
  ('ENT (Ear, Nose, and Throat)', 'Specializes in diseases related to the ears, nose, and throat.'),
  ('Dermatology', 'Treats skin, nail, and hair diseases.'),
  ('Psychiatry', 'Treats mental health disorders and psychiatric conditions.'),
  ('Laboratory Medicine', 'Performs clinical laboratory tests such as blood, urine tests, and imaging studies.'),
  ('Intensive Care Medicine', 'Treats critically ill patients or those requiring special care.');
  -----------------------------------------------------------------------------------------------------------------------
  CREATE TABLE DeviceSpecialties (
    SpecialtyId INT NOT NULL,            
    DeviceId INT NOT NULL,               
    PRIMARY KEY (SpecialtyId, DeviceId), 
    FOREIGN KEY (SpecialtyId) REFERENCES Specialties(SpecialtyId),
    FOREIGN KEY (DeviceId) REFERENCES Devices(DeviceId),
       
);
INSERT INTO DeviceSpecialties (SpecialtyId, DeviceId)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 1),
    (2, 2),
    (2, 3);

---------------------------------------------------------------------------------------------------------------------
CREATE TABLE Doctors (
    DoctorId INT NOT NULL,
    CurrentWork TEXT,
    DoctorDescription TEXT,
    Organization TEXT,
    Prize TEXT,
    ResearchProject TEXT,
    TrainingProcess TEXT,
    WorkExperience TEXT,
    AcademicTitle VARCHAR(50),
    Degree VARCHAR(50),
    PRIMARY KEY (DoctorId),
    CONSTRAINT Doctor_FK FOREIGN KEY (DoctorId) REFERENCES Users (UserId)
);
INSERT INTO Doctors (DoctorId, CurrentWork, DoctorDescription, Organization, Prize, ResearchProject, TrainingProcess, WorkExperience, AcademicTitle, Degree)
VALUES 
(1, 'Cardiologist at City Hospital', 'Cardiologist with 10 years of experience', 'City Hospital', 'Best Cardiologist 2020', 'Heart disease research project', 'Completed residency at City Medical School', '10 years of experience in cardiology', 'PGS.TS', 'BS.CKII'),
(2, 'Pediatric specialist at HealthCare Clinic', 'Pediatric specialist', 'HealthCare Clinic', 'Top Pediatrician of the Year', 'Child development research project', 'Trained at Pediatric Health University', '8 years of pediatric experience', 'PGS', 'BS.CKI'),
(3, 'Dermatologist at Skin Care Center', 'Dermatologist with expertise in skin treatment', 'Skin Care Center', 'Best Dermatologist Award', 'Skin care research project', 'Internship at Skin Health Institute', '5 years of dermatology experience', 'GS.TS', 'BS.CKII'),
(4, 'Orthopedic surgeon at Bone & Joint Hospital', 'Orthopedic surgeon specializing in joint replacements', 'Bone & Joint Hospital', 'Orthopedic Excellence Award', 'Joint replacement surgery research', 'Trained at Bone Institute', '7 years of orthopedic surgery experience', 'PGS.TS', 'BS.CKII'),
(5, 'Neurologist at NeuroCare Center', 'Neurologist focusing on brain disorders', 'NeuroCare Center', 'Neurology Researcher of the Year', 'Brain disorders research project', 'Neurology residency at Neuro Institute', '12 years in neurology', 'GS.TS', 'BS.CKII'),
(6, 'Ophthalmologist at Vision Eye Clinic', 'Ophthalmologist for advanced eye care', 'Vision Eye Clinic', 'Eye Care Innovator', 'Ophthalmology research project', 'Ophthalmology residency at Eye Health Institute', '6 years of ophthalmology experience', 'PGS', 'BS.CKI'),
(7, 'ENT specialist at ENT Specialty Hospital', 'ENT specialist treating ear, nose, and throat', 'ENT Specialty Hospital', 'ENT Expert of the Year', 'Ear care research project', 'ENT training at Medical University', '9 years of ENT experience', 'GS.TS', 'BS.CKII'),
(8, 'Oncologist at Oncology Center', 'Oncologist specializing in cancer treatment', 'Oncology Center', 'Oncology Researcher of the Year', 'Cancer treatment research project', 'Trained at Cancer Care Institute', '8 years in oncology', 'PGS.TS', 'BS.CKII'),
(9, 'Psychiatrist at MindCare Hospital', 'Psychiatrist experienced in mental health therapy', 'MindCare Hospital', 'Mental Health Advocate', 'Mental health therapy research project', 'Psychiatry residency at Mental Health University', '10 years of psychiatry experience', 'GS.TS', 'BS.CKII'),
(10, 'Family physician at Community Health Clinic', 'Family physician providing primary care', 'Community Health Clinic', 'Top Family Doctor of the Year', 'Primary care research project', 'Family medicine residency at Health School', '6 years in family medicine', 'PGS', 'BS.CKI'),
(11, 'Cardiac surgeon at Heart Institute', 'Cardiac surgeon with expertise in heart surgery', 'Heart Institute', 'Best Cardiac Surgeon', 'Heart surgery research project', 'Cardiology residency at Heart Institute', '15 years in heart surgery', 'GS.TS', 'BS.CKII'),
(12, 'Endocrinologist at EndoCare Center', 'Endocrinologist specializing in hormone disorders', 'EndoCare Center', 'Endocrinology Research Award', 'Diabetes and hormonal imbalance research', 'Endocrinology residency at Medical Institute', '10 years in endocrinology', 'PGS.TS', 'BS.CKII'),
(13, 'Nephrologist at Kidney Health Center', 'Nephrologist specializing in kidney diseases', 'Kidney Health Center', 'Best Nephrology Researcher', 'Chronic kidney disease research project', 'Nephrology training at National Medical University', '9 years of nephrology experience', 'GS.TS', 'BS.CKII'),
(14, 'Gastroenterologist at Digestive Health Clinic', 'Gastroenterologist with expertise in digestive disorders', 'Digestive Health Clinic', 'Gastroenterology Excellence Award', 'Gut microbiome research project', 'Gastroenterology training at Health Science University', '11 years in gastroenterology', 'PGS.TS', 'BS.CKII'),
(15, 'Pulmonologist at Lung Care Hospital', 'Pulmonologist specializing in lung diseases', 'Lung Care Hospital', 'Top Pulmonologist of the Year', 'Lung cancer research project', 'Pulmonology residency at Medical Science Institute', '8 years in pulmonology', 'PGS', 'BS.CKI'),
(16, 'Hematologist at Blood Health Institute', 'Hematologist specializing in blood disorders', 'Blood Health Institute', 'Best Hematologist Award', 'Leukemia and anemia research', 'Hematology training at National Medical School', '7 years in hematology', 'GS.TS', 'BS.CKII'),
(17, 'Rheumatologist at Joint Care Clinic', 'Rheumatologist focusing on arthritis and autoimmune diseases', 'Joint Care Clinic', 'Rheumatology Research Excellence', 'Autoimmune disease research', 'Rheumatology residency at Health Science Center', '9 years in rheumatology', 'PGS.TS', 'BS.CKII'),
(18, 'Urologist at Urology Care Hospital', 'Urologist specializing in urinary tract and kidney disorders', 'Urology Care Hospital', 'Best Urology Specialist', 'Prostate cancer research project', 'Urology training at National University', '10 years in urology', 'PGS.TS', 'BS.CKII'),
(19, 'Allergist at Allergy Relief Clinic', 'Allergist specializing in allergy and immunology', 'Allergy Relief Clinic', 'Allergy Treatment Innovator', 'Asthma and allergy research', 'Allergy and immunology training at Medical University', '6 years in allergy and immunology', 'PGS', 'BS.CKI'),
(20, 'Geriatrician at Senior Care Center', 'Geriatrician focusing on elderly healthcare', 'Senior Care Center', 'Top Geriatric Doctor of the Year', 'Aging and geriatric care research', 'Geriatric medicine residency at Health Science University', '12 years in geriatric medicine', 'GS.TS', 'BS.CKII');

-----------------------------------------------------------------------------------------------------------------

CREATE TABLE DoctorSpecialties (
  DoctorId INT NOT NULL,
  SpecialtyId INT NOT NULL,
  PRIMARY KEY (DoctorId, SpecialtyId),
  FOREIGN KEY (DoctorId) REFERENCES Doctors(DoctorId),
  FOREIGN KEY (SpecialtyId) REFERENCES Specialties(SpecialtyId)
);
INSERT INTO DoctorSpecialties (DoctorId, SpecialtyId)
VALUES
  (1, 1),(1, 2),(1, 3),(4, 1), (5, 1),(6, 1),(7, 1), (8, 1),(9, 1),(10, 1)
  ,(11, 2),(12, 2),(13, 2),(14, 2),(15, 2),(16, 2),(17, 2),(19, 2),(20, 2);

  ---------------------------------------------------------------------------------------------------
CREATE TABLE Certifications (
  CertificationId INT NOT NULL IDENTITY(1,1),
  DoctorId INT NOT NULL,
  CertificationUrl VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (CertificationId),
  CONSTRAINT Certification_FK FOREIGN KEY (DoctorId) REFERENCES Doctors (DoctorId)
) ;
INSERT INTO Certifications (DoctorId, CertificationUrl)
VALUES
  (1, 'https://ysidakhoa.net/wp-content/uploads/2020/06/chungchihanhngheysidakhoa.jpg'),
  (2, 'https://ysidakhoa.net/wp-content/uploads/2020/06/chungchihanhngheysidakhoa.jpg'),
  (3, 'https://ysidakhoa.net/wp-content/uploads/2020/06/chungchihanhngheysidakhoa.jpg');
---------------------------------------------------------------------------------------------------------
CREATE TABLE Patients (
  PatientId INT NOT NULL,
  Rank VARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (PatientId),
  CONSTRAINT Patient_FK FOREIGN KEY (PatientId) REFERENCES Users (UserId)

) ;
INSERT INTO Patients (PatientId, Rank)
VALUES 
(23, 'Silver'),
(24, 'Gold'),
(25, 'Bronze'),
(26, 'Silver');

-------------------------------------------------------------------------------------------
CREATE TABLE Slots (
  SlotId int  NOT NULL,
  SlotStartTime time DEFAULT NULL,
  SlotEndTime time DEFAULT NULL,
  PRIMARY KEY (SlotId)
) ;
INSERT INTO Slots (SlotId, SlotStartTime, SlotEndTime)
VALUES
('1', '07:30:00', '08:30:00'),
('2', '08:40:00', '09:40:00'),
('3', '09:50:00', '10:50:00'),
('4', '11:00:00', '12:00:00'),
('5', '13:00:00', '14:00:00'),
('6', '14:10:00', '15:10:00'),
('7', '15:20:00', '16:20:00'),
('8', '16:30:00', '17:30:00');


---------------------------------------------------------------------------------------------
CREATE TABLE Rooms (
    RoomId INT PRIMARY KEY IDENTITY(1,1), 
    RoomName VARCHAR(100) NOT NULL,        
    RoomType VARCHAR(50) NOT NULL,        
    Location VARCHAR(255) NOT NULL 

);

INSERT INTO Rooms (RoomName, RoomType, Location)
VALUES
('Room 101', 'Examination', 'Floor 1, Zone A'),
('Room 102', 'Ultrasound', 'Floor 1, Zone A'),
('Room 201', 'Laboratory', 'Floor 2, Zone B'),
('Room 202', 'Examination', 'Floor 2, Zone B'),
('Room 301', 'Surgery', 'Floor 3, Zone C');

-----------------------------------------------------------------------
CREATE TABLE Services (
  ServiceId INT NOT NULL IDENTITY(1,1),
  ServiceName VARCHAR(30) NOT NULL,
  Overview TEXT,
  Process TEXT,
  TreatmentTechniques TEXT,
  Price DECIMAL(18, 2) NOT NULL,
  Image VARCHAR(200) NOT NULL DEFAULT 'https://th.bing.com/th/id/OIP.ITpfvpcflBQwxt--PL_WegHaEc?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  CategoryId INT NOT NULL,
  SpecialtyId INT NOT NULL,
  PRIMARY KEY (ServiceId),
  CONSTRAINT CategoryId_FK FOREIGN KEY (CategoryId) REFERENCES Categories (CategoryId),
  CONSTRAINT SpecialtyId_FK FOREIGN KEY (SpecialtyId) REFERENCES Specialties (SpecialtyId)
);

INSERT INTO Services (ServiceName, Overview, Process, TreatmentTechniques, Price, CategoryId, SpecialtyId)
VALUES
('General Consultation', 'Basic health consultation', 'Patient history, physical exam', 'No special technique', 500000, 1, 1),
('Dental Checkup', 'Routine dental exam', 'Examine teeth and gums', 'Scaling, cleaning', 700000, 2, 2),
('Eye Exam', 'Comprehensive eye exam', 'Check vision, retina health', 'Laser therapy for retinal problems', 800000, 3, 3),
('Physical Therapy', 'Rehabilitation for mobility issues', 'Strength exercises, massage', 'Manual therapy, electrotherapy', 600000, 4, 4),
('Lab Test', 'Routine laboratory testing', 'Collection of samples, testing', 'Blood glucose test, lipid profile', 300000, 5, 5),
('Psychological Consultation', 'Mental health checkup', 'Talk therapy, stress management', 'Cognitive Behavioral Therapy (CBT)', 400000, 1, 6),
('Pediatric Consultation', 'Health check for children', 'Growth tracking, vaccination', 'Vaccinations, growth monitoring', 600000, 2, 7),
('Ultrasound', 'Imaging for various medical conditions', 'Non-invasive imaging', 'Guided ultrasound for treatment', 1000000, 3, 8),
('Dermatology Consultation', 'Consultation for skin issues', 'Examine skin conditions', 'Cryotherapy, laser treatments', 700000, 4, 9),
('Nutritional Counseling', 'Diet and nutrition planning', 'Diet evaluation and planning', 'Nutritional supplements, weight loss guidance', 500000, 5, 10),
('Vaccination', 'Routine and travel vaccinations', 'Injection of vaccines', 'Immunization, post-vaccination observation', 200000, 2, 11),
('Chiropractic Consultation', 'Spinal health checkup', 'Spinal manipulation, assessment', 'Spinal realignment', 800000, 1, 12),
('Hearing Test', 'Testing hearing levels', 'Test sound perception, hearing thresholds', 'Hearing aids, speech therapy', 600000, 3, 13),
('Cardiology Checkup', 'Heart health checkup', 'Heart check, blood pressure monitoring', 'Stress test, ECG', 900000, 4, 14),
('Orthopedic Consultation', 'Bone and joint health checkup', 'Examine joints, bones', 'Casting, joint replacement', 850000, 5, 15),
('Fertility Consultation', 'Consultation for fertility issues', 'Blood tests, ultrasound for fertility', 'IVF, fertility medications', 1200000, 2, 16),
('Diabetes Consultation', 'Diabetes care and management', 'Blood glucose testing, health monitoring', 'Insulin therapy, dietary changes', 450000, 3, 1),
('Respiratory Therapy', 'Treatment for respiratory issues', 'Breathing exercises, medication administration', 'Nebulization, oxygen therapy', 700000, 4, 2),
('Gastroenterology Consultation', 'Digestive health checkup', 'Examine digestive system', 'Gastroscopy, colonoscopy', 1100000, 5, 3),
('Emergency Care', 'Emergency treatment for injuries', 'First aid, trauma care', 'Surgical intervention, pain management', 1500000, 1, 4);

-------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE DoctorSchedules (
  DoctorScheduleId INT NOT NULL IDENTITY(1,1),
  DoctorId INT NOT NULL,
  ServiceId INT NOT NULL,
  DayOfWeek VARCHAR(10) NOT NULL,  
  RoomId INT NOT NULL,
  SlotId INT NOT NULL,  
  PRIMARY KEY (DoctorScheduleId),
  CONSTRAINT DoctorId_FK FOREIGN KEY (DoctorId) REFERENCES Doctors (DoctorId),
  CONSTRAINT ServiceId_FK FOREIGN KEY (ServiceId) REFERENCES Services (ServiceId),
  CONSTRAINT RoomId_FK FOREIGN KEY (RoomId) REFERENCES Rooms (RoomId),
  CONSTRAINT SlotId_FK FOREIGN KEY (SlotId) REFERENCES Slots (SlotId)
);
INSERT INTO DoctorSchedules (DoctorId, ServiceId, DayOfWeek, SlotId, RoomId)
VALUES 
(1, 1, 'Monday', 1, 1), 
(1, 2, 'Monday', 2, 1),
(1, 3, 'Wednesday', 1, 2),
(1, 4, 'Wednesday', 2, 2),
(1, 5, 'Friday', 1, 1),

(2, 6, 'Tuesday', 1, 1),
(2, 7, 'Tuesday', 2, 1),
(2, 8, 'Thursday', 3, 1),

(3, 9, 'Monday', 3, 1),
(3, 10, 'Wednesday', 3, 2),
(3, 11, 'Friday', 2, 1),

(4, 12, 'Tuesday', 3, 1),
(4, 13, 'Thursday', 2, 1);
---------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE DeviceServices (
    ServiceId INT NOT NULL,
    DeviceId INT NOT NULL,
    PRIMARY KEY (ServiceId, DeviceId),
    FOREIGN KEY (ServiceId) REFERENCES Services(ServiceId) ON DELETE CASCADE,
    FOREIGN KEY (DeviceId) REFERENCES Devices(DeviceId) ON DELETE CASCADE
);
INSERT INTO DeviceServices (ServiceId, DeviceId)
VALUES
    (1, 5),
    (1, 6),
    (2, 2),
    (2, 8),
    (3, 7),
    (4, 4),
    (5, 6),
    (6, 5),
    (7, 5),
    (8, 4),
    (9, 7),
    (10, 6),
    (11, 6),
    (12, 5),
    (13, 1),
    (14, 3),
    (15, 2),
    (16, 4),
    (17, 6),
    (18, 4),
    (19, 1),
    (20, 4);

---------------------------------------------------------------------------------------------------------------

CREATE TABLE DoctorServices (
  ServiceId INT NOT NULL,
  DoctorId INT NOT NULL,
  PRIMARY KEY (DoctorId, ServiceId),
  FOREIGN KEY (DoctorId) REFERENCES Doctors(DoctorId),
  FOREIGN KEY (ServiceId) REFERENCES Services(ServiceId)
);
INSERT INTO DoctorServices (ServiceId, DoctorId)
VALUES
(1, 1),  
(1, 2), 
(1, 3), 
(2, 1),  
(3, 1),  
(4, 1), 

(2, 5),  
(2, 6),  
(2, 7),  

(8, 8),  
(9, 9),  
(10, 10), 
(11, 11), 
(12, 12), 
(13, 13), 
(14, 14), 
(15, 15), 
(16, 16), 
(17, 17), 
(18, 18), 
(19, 19), 
(20, 20);


-------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Reservations (
  ReservationId int NOT NULL IDENTITY(1,1),
  PatientId int NOT NULL,
  DoctorScheduleId int NOT NULL,
  Reason Text,
  PriorExaminationImg VARCHAR(200) NULL,
  AppointmentDate datetime,
  Status varchar(20) NOT NULL,
  CancellationReason varchar(255) NULL, 
  UpdatedDate datetime NOT NULL DEFAULT GETDATE(), 
  PRIMARY KEY (ReservationId),
  CONSTRAINT PatientId_FK FOREIGN KEY (PatientId) REFERENCES Patients (PatientId),
  CONSTRAINT DoctorScheduleId_FK FOREIGN KEY (DoctorScheduleId) REFERENCES DoctorSchedules (DoctorScheduleId)
);

INSERT INTO Reservations (PatientId, DoctorScheduleId, Reason, PriorExaminationImg, AppointmentDate, Status, CancellationReason, UpdatedDate)
VALUES
(23, 10, 'Diabetes consultation', 'http://example.com/prior_exam_17', '2025-01-10 09:15:00', 'Completed', NULL, '2025-01-10 09:15:00'),
(23, 1, 'Routine checkup', 'http://example.com/prior_exam_1', '2025-01-15 09:00:00', 'Completed', NULL, '2025-01-15 09:00:00'),
(23, 1, 'Routine checkup', 'http://example.com/prior_exam_2', '2025-01-20 10:00:00', 'Pending', NULL, '2025-01-20 10:00:00'),
(23, 5, 'Eye examination', 'http://example.com/prior_exam_5', '2025-01-19 11:00:00', 'Confirmed', NULL, '2025-01-19 11:00:00'),
(23, 10, 'Hearing test', 'http://example.com/prior_exam_13', '2025-01-27 14:00:00', 'Confirmed', NULL, '2025-01-27 14:00:00'),
(23, 9, 'Dermatology consultation', NULL, '2025-01-23 09:30:00', 'Confirmed', NULL, '2025-01-23 09:30:00'),
(25, 3, 'Follow-up for diabetes management', NULL, '2025-01-17 14:30:00', 'Confirmed', NULL, '2025-01-17 14:30:00'),
(26, 4, 'General health check', 'http://example.com/prior_exam_4', '2025-01-18 08:30:00', 'Cancelled', 'Patient canceled', '2025-01-18 08:30:00'),
(24, 6, 'Psychological consultation', 'http://example.com/prior_exam_6', '2025-01-20 13:00:00', 'No-show', NULL, '2025-01-20 13:00:00'),
(25, 7, 'Pediatric consultation', NULL, '2025-01-21 15:00:00', 'Confirmed', NULL, '2025-01-21 15:00:00'),
(26, 8, 'Ultrasound check', 'http://example.com/prior_exam_8', '2025-01-22 16:30:00', 'Pending', NULL, '2025-01-22 16:30:00'),
(24, 1, 'Nutritional counseling', 'http://example.com/prior_exam_10', '2025-01-24 10:45:00', 'Cancelled', 'Patient canceled', '2025-01-24 10:45:00'),
(25, 2, 'Vaccination', NULL, '2025-01-25 12:00:00', 'Completed', NULL, '2025-01-25 12:00:00'),
(26, 3, 'Chiropractic consultation', 'http://example.com/prior_exam_12', '2025-01-26 11:00:00', 'No-show', NULL, '2025-01-26 11:00:00'),
(24, 4, 'Cardiology checkup', NULL, '2025-01-28 08:00:00', 'Confirmed', NULL, '2025-01-28 08:00:00'),
(25, 5, 'Orthopedic consultation', 'http://example.com/prior_exam_15', '2025-01-29 13:30:00', 'Completed', NULL, '2025-01-29 13:30:00'),
(26, 6, 'Fertility consultation', NULL, '2025-01-30 15:00:00', 'Confirmed', NULL, '2025-01-30 15:00:00'),
(24, 8, 'Respiratory therapy', 'http://example.com/prior_exam_18', '2025-02-02 11:30:00', 'Cancelled', 'Patient canceled', '2025-02-02 11:30:00'),
(25, 9, 'Gastroenterology consultation', NULL, '2025-02-03 14:45:00', 'No-show', NULL, '2025-02-03 14:45:00'),
(26, 10, 'Emergency care', 'http://example.com/prior_exam_20', '2025-02-04 08:30:00', 'Confirmed', NULL, '2025-02-04 08:30:00');




-------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE MedicalRecords (
  MedicalRecordId INT NOT NULL IDENTITY(1,1),
  ReservationId INT NOT NULL,
  Symptoms TEXT, 
  Diagnosis TEXT, 
  TreatmentPlan TEXT, 
  FollowUpDate DATETIME NULL, 
  Notes TEXT NULL, 
  CreatedAt DATETIME NOT NULL DEFAULT GETDATE(), 
  PRIMARY KEY (MedicalRecordId),
  CONSTRAINT FK_ReservationId FOREIGN KEY (ReservationId) REFERENCES Reservations(ReservationId)
);
INSERT INTO MedicalRecords (ReservationId, Symptoms, Diagnosis, TreatmentPlan, FollowUpDate, Notes)
VALUES
-- Patient 23
(1, 'Increased thirst and frequent urination', 'Type 2 Diabetes', 'Medication adjustment and dietary counseling', '2025-01-20', 'Monitor blood sugar levels daily'),
(2, 'No symptoms reported', 'Routine check-up: Healthy', 'Continue regular exercise and balanced diet', NULL, 'Maintain yearly check-ups'),
(4, 'Blurred vision and mild discomfort', 'Eye strain', 'Prescribed corrective lenses', '2025-01-30', 'Follow up if symptoms persist'),
(5, 'Reduced hearing in the left ear', 'Partial hearing loss', 'Recommended hearing aid consultation', '2025-02-10', 'Avoid exposure to loud noises'),

-- Patient 25
(7, 'Fatigue and irregular blood sugar levels', 'Diabetes management', 'Adjust insulin dosage', '2025-02-05', 'Discuss further adjustments during follow-up'),
(13, 'Persistent joint pain', 'Arthritis', 'Physical therapy and anti-inflammatory medications', '2025-02-15', 'Consider X-ray if no improvement'),

-- Patient 26
(17, 'Severe abdominal cramps', 'Ulcer symptoms', 'Prescribed antacids and dietary restrictions', '2025-02-20', 'Schedule endoscopy if pain worsens'),
(20, 'Emergency: high fever and dizziness', 'Viral infection', 'Intravenous fluids and rest', '2025-02-10', 'Monitor fever daily and report any complications'),

-- Patient 24
(14, 'Chest pain during exertion', 'Early signs of coronary artery disease', 'Lifestyle changes and aspirin therapy', '2025-02-12', 'Schedule stress test next visit');
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------





CREATE TABLE Feedbacks (
  FeedbackId int NOT NULL IDENTITY(1,1),
  ReservationId int NOT NULL UNIQUE  ,
  ServiceFeedbackContent TEXT NOT NULL,
  ServiceFeedbackGrade INT, 
  DoctorFeedbackContent TEXT NOT NULL,
  DoctorFeedbackGrade INT, 
  FeedbackDate datetime NOT NULL,
  PRIMARY KEY (FeedbackId),
  CONSTRAINT ReservationId_FK FOREIGN KEY (ReservationId) REFERENCES Reservations (ReservationId),
);
INSERT INTO Feedbacks (ReservationId, ServiceFeedbackContent, ServiceFeedbackGrade, DoctorFeedbackContent, DoctorFeedbackGrade, FeedbackDate)
VALUES
(1, 'Good service, very professional.', 5, 'The doctor was attentive and explained everything well.', 5, '2025-01-15 11:00:00'),
(2, 'Wait time was a bit long, but the service was good.', 4, 'Doctor was helpful, but could have spent more time explaining.', 4, '2025-01-16 12:00:00'),
(3, 'Excellent service, highly recommend.', 5, 'Doctor was very thorough and provided great advice.', 5, '2025-01-17 15:00:00'),
(4, 'Service was not satisfactory, had to wait too long.', 2, 'Doctor did not seem attentive and rushed through the appointment.', 2, '2025-01-18 09:00:00'),
(5, 'Nice and friendly staff, great experience overall.', 5, 'Doctor was very kind and provided good treatment.', 5, '2025-01-19 14:00:00'),
(6, 'Service was okay, could be improved.', 3, 'Doctor was nice, but the consultation felt too brief.', 3, '2025-01-20 16:00:00'),
(7, 'Great service, will return again.', 5, 'Doctor was excellent and offered great recommendations.', 5, '2025-01-21 16:30:00'),
(8, 'Service was fine, but nothing special.', 3, 'Doctor did not engage much during the consultation.', 3, '2025-01-22 17:00:00'),
(9, 'Excellent service and fast processing.', 5, 'Doctor was very professional and knowledgeable.', 5, '2025-01-23 10:00:00'),
(10, 'Not satisfied, felt rushed.', 2, 'Doctor did not seem interested in my concerns.', 2, '2025-01-24 11:30:00');


--------------------------------------------------------------------------------------------------
--CREATE TABLE [dbo].[Comments](
--	[CommentId] [int] IDENTITY(1,1) NOT NULL,
--	[Content] [nvarchar](max) NOT NULL,
--	[UserId] [int] NOT NULL,
--	[CommentOn] [datetime2](7) NOT NULL,
--	[RepliedCommentId] [int] NULL,
--	[NumberOfLikes] [int] NOT NULL,

	--------------------------------------------------------------------------------------------------------
--CREATE TABLE Invoices (
--  InvoiceId int NOT NULL IDENTITY(1,1),
--  PatientId int NOT NULL,
--  ReservationId int not null,
--  DateAndTime datetime DEFAULT NULL,
--  ReceptionistId int DEFAULT NULL,
--  PRIMARY KEY (InvoiceId),
  
--  CONSTRAINT PatientId_FK FOREIGN KEY (PatientId) REFERENCES Patients (PatientId),
--  CONSTRAINT ReservationId_FK FOREIGN KEY (ReservationId) REFERENCES Reservations (ReservationId),
--  CONSTRAINT ReceptionistId_FK FOREIGN KEY (ReceptionistId) REFERENCES Users(UserId)
--) ;
--INSERT INTO Invoices (PatientId, DoctorScheduleId, DateAndTime, ReceptionistId)
--VALUES
--(23, 1, '2025-01-12 08:30:00', 21),

--(24, 2, '2025-01-12 09:00:00', 22),

--(23, 3, '2025-01-12 10:30:00', 21),

--(24, 4, '2025-01-12 11:00:00', 22),

--(23, 5, '2025-01-12 13:30:00', 21);


----------------------------------------------------------

--CREATE TABLE Medicines (
--  MedicineId int NOT NULL IDENTITY(1,1),
--  MedicineName varchar(30) NOT NULL,
--  MedicinePrice int NOT NULL,
--  MedicineType VARCHAR(10) NOT NULL, 
--  PRIMARY KEY (MedicineId)
--) ;

--CREATE TABLE MedicalInvoices (
--  InvoiceId int NOT NULL,
--  MedicineId int NOT NULL,
--  PRIMARY KEY (InvoiceId,MedicineId),
--  CONSTRAINT MedicalInvoice_FK1 FOREIGN KEY (InvoiceId) REFERENCES Invoices (InvoiceId),
--  CONSTRAINT MedicalInvoice_FK2 FOREIGN KEY (MedicineId) REFERENCES Medicines (MedicineId)
--) ;
------------------------------------------------------------------------------------------
--CREATE TABLE MedicalReports (
--  MedicalReportId int NOT NULL IDENTITY(1,1),
--  InvoiceId int NOT NULL,
--  Symptoms text,
--  Conclusion text,
--  PRIMARY KEY (MedicalReportId),
--  CONSTRAINT MedicalReport_FK1 FOREIGN KEY (InvoiceId) REFERENCES Invoices (InvoiceId)
--) ;


--------------------------------------------------------------------------------------------

--CREATE TABLE Posts (
--  PostId int NOT NULL IDENTITY(1,1),
--  PostAuthorId int DEFAULT NULL,
--  PostDescription text NOT NULL,
--  PostCreatedDate date NOT NULL,
--  PostContent text NOT NULL,
--  PostSourceUrl varchar(200) DEFAULT NULL,
--  PRIMARY KEY (PostId),
--  CONSTRAINT Post_FK1 FOREIGN KEY (PostAuthorId) REFERENCES Managers (ManagerUserId)
--) ;

--CREATE TABLE PostImages (
--  PostImageId int NOT NULL IDENTITY(1,1),
--  PostId int NOT NULL,
--  PostImageUrl varchar(200) NOT NULL,
--  PostImageIndex int NOT NULL,
--  PRIMARY KEY (PostImageId),
--  CONSTRAINT PostImage_FK1 FOREIGN KEY (PostId) REFERENCES Posts (PostId)
--) ;












