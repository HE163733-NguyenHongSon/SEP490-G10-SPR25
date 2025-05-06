CREATE DATABASE AppointmentSchedulingDB
GO

USE AppointmentSchedulingDB
GO
CREATE TABLE Roles (
   RoleId INT NOT NULL IDENTITY(1,1),
   RoleName NVARCHAR(50) NOT NULL,
   PRIMARY KEY (RoleId),
   CONSTRAINT RoleName_Unique UNIQUE (RoleName)
);
INSERT INTO Roles (RoleName) VALUES
(N'Người giám hộ'), 
(N'Bệnh nhân'), 
(N'Lễ tân'),      
(N'Bác sĩ'), 
(N'Quản trị viên');     


CREATE TABLE Users (
   UserId INT NOT NULL IDENTITY(1,1),
   CitizenId BIGINT NOT NULL,
   Email VARCHAR(50) NULL,
   Password VARCHAR(300) NOT NULL,
   UserName NVARCHAR(50) NOT NULL,
   Phone VARCHAR(12) NOT NULL,
   Gender NVARCHAR(6) NOT NULL,
   Dob DATE NOT NULL,
   Address NVARCHAR(100) NULL,
   AvatarUrl NVARCHAR(200) NULL,
   IsVerify BIT NOT NULL ,
   IsActive BIT NOT NULL DEFAULT 1, 
   PRIMARY KEY (UserId),
   CONSTRAINT Phone_Unique UNIQUE (Phone),
   CONSTRAINT User_CheckGender CHECK (Gender IN (N'Nam', N'Nữ'))
);


INSERT INTO Users (CitizenId, Email, Password, UserName, Phone, Gender, Dob, Address, AvatarUrl, IsVerify)
VALUES
-- id 1-10 Giám hộ ,1 số kiêm bệnh nhân---

(035002001001, 'sonnhhe163733@fpt.edu.vn', 'password123', N'Văn An', '0901234567', N'Nam', '1980-01-01', N'12 Trần Phú, Quận 5, TP.HCM', 'user_1.jpg', 1),
(035002001002, 'giamho.benhnhan.user2@example.com', 'password456', N'Thị Bé', '0902345678', N'Nữ', '1982-02-02', N'34 Nguyễn Trãi, Quận 1, TP.HCM', 'user_2.jpg', 1),
(035002001003, 'giamho.user3@example.com', 'password789', N'Văn Ca', '0903456789', N'Nam', '1975-03-03', N'56 Lý Tự Trọng, Quận 1, TP.HCM', 'user_3.jpg', 1),
(035002001004, 'giamho.user4@example.com', 'password000', N'Thị Duyên', '0904567890', N'Nữ', '1978-04-04', N'78 Cách Mạng Tháng 8, Quận 10, TP.HCM', 'user_4.jpg', 1),
(035002001005, 'giamho.user5@example.com', 'password999', N'Văn Cường', '0905678901', N'Nam', '1983-05-05', N'90 Pasteur, Quận 3, TP.HCM', 'user_5.jpg', 1),
(035002001006, 'giamho.user6@example.com', 'pass2468', N'Thị Hạnh', '0906789012', N'Nữ', '1979-06-06', N'102 Lê Văn Sỹ, Quận Phú Nhuận, TP.HCM', 'user_6.jpg', 1),
(035002001007, 'giamho.user7@example.com', 'pass3579', N'Văn Hòa', '0907890123', N'Nam', '1981-07-07', N'114 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', 'user_7.jpg', 1),
(035002001008, 'giamho.user8@example.com', 'pass4680', N'Thị Mai', '0908901234', N'Nữ', '1976-08-08', N'126 Nguyễn Văn Cừ, Quận 5, TP.HCM', 'user_8.jpg', 1),
(035002001009, 'giamho.user9@example.com', 'pass5791', N'Văn Khánh', '0909012345', N'Nam', '1984-09-09', N'138 Hoàng Văn Thụ, Quận Tân Bình, TP.HCM', 'user_9.jpg', 1),
(035002001010, 'giamho.user10@example.com', 'pass6802', N'Văn Bình', '0910123456', N'Nam', '1977-10-10', N'150 Nguyễn Đình Chiểu, Quận 3, TP.HCM', 'user_10.jpg', 1),


-- id 11-30 Bệnh nhân---
(035002005183, 'benhnhan.vovanthuan@example.com', 'ThuanVo123', N'Võ Văn Thuận', '0912345703', N'Nam', '1984-02-29', N'46 Nguyễn Biểu, Quận 5, TP.HCM', 'user_11.jpg', 0),
(035002005184, 'benhnhan.tranthikimphuong@example.com', 'KimPhuong456', N'Trần Thị Kim Phượng', '0912345704', N'Nữ', '1989-06-15', N'57 Bà Triệu, Hoàn Kiếm, Hà Nội', 'user_12.jpg', 1),
(035002005185, 'benhnhan.nguyenhuuquang@example.com', 'HuuQuang789', N'Nguyễn Hữu Quang', '0912345705', N'Nam', '1992-12-10', N'68 Trần Cao Vân, Thanh Khê, Đà Nẵng', 'user_13.jpg', 0),
(035002005186, 'benhnhan.lehoangmai@example.com', 'HoangMai000', N'Lê Hoàng Mai', '0912345706', N'Nữ', '1996-09-01', N'79 Nguyễn Huệ, Quận 1, TP.HCM', 'user_14.jpg', 1),
(035002005187, 'benhnhan.vuongthanhdat@example.com', 'ThanhDat999', N'Vương Thành Đạt', '0912345707', N'Nam', '1983-05-22', N'80 Hai Bà Trưng, Quận 3, TP.HCM', 'user_15.jpg', 0),
(035002005188, 'benhnhan.tranthuytien@example.com', 'ThuyTien1212', N'Trần Thúy Tiên', '0912345708', N'Nữ', '1999-03-18', N'91 Lý Thường Kiệt, Tân Bình, TP.HCM', 'user_16.jpg', 1),
(035002005189, 'benhnhan.phambaoan@example.com', 'BaoAn2323', N'Phạm Bảo An', '0912345709', N'Nam', '1988-11-14', N'12 Nguyễn Thái Học, Ba Đình, Hà Nội', 'user_17.jpg', 0),
(035002005190, 'benhnhan.ngothuynga@example.com', 'ThuyNga3434', N'Ngô Thúy Nga', '0912345710', N'Nữ', '1994-07-07', N'23 Tràng Thi, Hoàn Kiếm, Hà Nội', 'user_18.jpg', 1),
(035002005191, 'benhnhan.daovanhung@example.com', 'VanHung4545', N'Đào Văn Hùng', '0912345711', N'Nam', '1991-01-20', N'34 Giải Phóng, Đống Đa, Hà Nội', 'user_19.jpg', 0),
(035002005192, 'benhnhan.lethikieuanh@example.com', 'KieuAnh5656', N'Lê Thị Kiều Anh', '0912345712', N'Nữ', '1997-04-28', N'45 Kim Mã, Ba Đình, Hà Nội', 'user_20.jpg', 1),
(035002005193, 'benhnhan.truongquocviet@example.com', 'QuocViet6767', N'Trương Quốc Việt', '0912345713', N'Nam', '1980-10-05', N'56 Nguyễn Chí Thanh, Ba Đình, Hà Nội', 'user_21.jpg', 0),
(035002005194, 'benhnhan.vuthuyduong@example.com', 'ThuyDuong7878', N'Vũ Thùy Dương', '0912345714', N'Nữ', '1985-08-12', N'67 Lạc Long Quân, Tây Hồ, Hà Nội', 'user_22.jpg', 1),
(035002005195, 'benhnhan.nguyenvanmanh@example.com', 'VanManh8989', N'Nguyễn Văn Mạnh', '0912345715', N'Nam', '1993-02-20', N'78 Âu Cơ, Tây Hồ, Hà Nội', 'user_23.jpg', 0),
(035002005196, 'benhnhan.phanthanhmai@example.com', 'ThanhMai9090', N'Phan Thanh Mai', '0912345716', N'Nữ', '1998-05-01', N'89 Đội Cấn, Ba Đình, Hà Nội', 'user_24.jpg', 1),
(035002005197, 'benhnhan.dotuananh@example.com', 'TuanAnh0101', N'Đỗ Tuấn Anh', '0912345717', N'Nam', '1986-12-25', N'90 Kim Ngưu, Hai Bà Trưng, Hà Nội', 'user_25.jpg', 0),
(035002005198, 'benhnhan.tranthikimlien@example.com', 'KimLien1212', N'Trần Thị Kim Liên', '0912345718', N'Nữ', '1995-09-17', N'101 Minh Khai, Hai Bà Trưng, Hà Nội', 'user_26.jpg', 1),
(035002005199, 'benhnhan.nguyenhuuhoang@example.com', 'HuuHoang2323', N'Nguyễn Hữu Hoàng', '0912345719', N'Nam', '1981-03-09', N'112 Bạch Mai, Hai Bà Trưng, Hà Nội', 'user_27.jpg', 0),
(035002005200, 'benhnhan.lethanhnga@example.com', 'ThanhNga3434', N'Lê Thanh Nga', '0912345720', N'Nữ', '1992-06-02', N'123 Phố Vọng, Hai Bà Trưng, Hà Nội', 'user_28.jpg', 1),
(035002005201, 'benhnhan.vovantuan@example.com', 'VanTuan4545', N'Võ Văn Tuấn', '0912345721', N'Nam', '1987-11-28', N'14 Nguyễn Khoái, Hoàng Mai, Hà Nội', 'user_29.jpg', 0),
(035002005202, 'benhnhan.hoangthimy@example.com', 'ThiMy6767', N'Hoàng Thị Mỹ', '0912345722', N'Nữ', '1990-08-08', N'15 Phạm Ngọc Thạch, Quận 3, TP.HCM', 'user_30.jpg', 1),


-- id 31-32 Lễ tân
(035002005171, 'letan.lethibich@example.com', '123LeTan', N'Lê Thị Bích', '0912345691', N'Nữ', '1995-02-18', N'22 Nguyễn Trãi, Thanh Xuân, Hà Nội', 'user_31.jpg', 1),
(035002005172, 'letan.tranquanghuy@example.com', 'HuyLeTan456', N'Trần Quang Huy', '0912345692', N'Nam', '1997-06-30', N'33 Trần Phú, Hải Châu, Đà Nẵng', 'user_32.jpg', 1),

--id 33-52 Bác sĩ-------
(035002005101, 'bacsi.nguyenvanan@example.com', 'AnPass123', N'Nguyễn Văn An', '0912345001', N'Nam', '1980-03-10', N'12 Đường Lê Lợi, Quận 1, TP.HCM', 'user_33.jpg', 0),
(035002005102, 'bacsi.tranthithuy@example.com', 'ThuyPass456', N'Trần Thị Thúy', '0912345002', N'Nữ', '1985-07-25', N'45 Phố Huế, Hoàn Kiếm, Hà Nội', 'user_34.jpg', 0),
(035002005103, 'bacsi.dinhquocbao@example.com', 'BaoPass789', N'Đinh Quốc Bảo', '0912345003', N'Nam', '1990-11-12', N'78 Lê Duẩn, Thanh Khê, Đà Nẵng', 'user_35.jpg', 0),
(035002005104, 'bacsi.phamthanhha@example.com', 'HaPass999', N'Phạm Thanh Hà', '0912345004', N'Nữ', '1983-09-14', N'23 Võ Thị Sáu, Biên Hòa, Đồng Nai', 'user_36.jpg', 0),
(035002005105, 'bacsi.letrungkien@example.com', 'KienPass888', N'Lê Trung Kiên', '0912345005', N'Nam', '1982-05-20', N'55 Nguyễn Trãi, Thanh Xuân, Hà Nội', 'user_37.jpg', 0),
(035002005106, 'bacsi.hoangthikimanh@example.com', 'KimAnhPass567', N'Hoàng Thị Kim Anh', '0912345006', N'Nữ', '1991-02-14', N'99 Lý Thái Tổ, Hải Châu, Đà Nẵng', 'user_38.jpg', 0),
(035002005107, 'bacsi.tranvanquang@example.com', 'QuangPass234', N'Trần Văn Quang', '0912345007', N'Nam', '1986-06-18', N'120 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'user_39.jpg', 0),
(035002005108, 'bacsi.nguyenhoangyen@example.com', 'YenPass777', N'Nguyễn Hoàng Yến', '0912345008', N'Nữ', '1993-08-22', N'35 Trần Hưng Đạo, Quận 5, TP.HCM', 'user_40.jpg', 0),
(035002005109, 'bacsi.buithanhtung@example.com', 'TungPass333', N'Bùi Thành Tùng', '0912345009', N'Nam', '1987-10-30', N'22 Nguyễn Văn Linh, Hải Phòng', 'user_41.jpg', 0),
(035002005110, 'bacsi.lephuongthao@example.com', 'ThaoPass111', N'Lê Phương Thảo', '0912345010', N'Nữ', '1984-04-25', N'77 Lê Quang Định, Bình Thạnh, TP.HCM', 'user_42.jpg', 0),
(035002005111, 'bacsi.nguyenvanphu@example.com', 'PhuPass654', N'Nguyễn Văn Phú', '0912345011', N'Nam', '1979-07-17', N'12 Nguyễn Đình Chiểu, Quận 3, TP.HCM', 'user_43.jpg', 0),
(035002005112, 'bacsi.dovanthanh@example.com', 'ThanhPass321', N'Đỗ Văn Thành', '0912345012', N'Nam', '1988-11-08', N'90 Nguyễn Du, Quận 1, TP.HCM', 'user_44.jpg', 0),
(035002005113, 'bacsi.phamthihue@example.com', 'HuePass159', N'Phạm Thị Huệ', '0912345013', N'Nữ', '1986-03-29', N'25 Điện Biên Phủ, Ba Đình, Hà Nội', 'user_45.jpg', 0),
(035002005114, 'bacsi.luongquangdinh@example.com', 'DinhPass753', N'Lương Quang Định', '0912345014', N'Nam', '1992-09-12', N'31 Hoàng Hoa Thám, Ba Đình, Hà Nội', 'user_46.jpg', 0),
(035002005115, 'bacsi.dangngochai@example.com', 'HaiPass258', N'Đặng Ngọc Hải', '0912345015', N'Nam', '1983-12-21', N'14 Nguyễn Văn Cừ, Long Biên, Hà Nội', 'user_47.jpg', 0),
(035002005116, 'bacsi.vothimyhanh@example.com', 'HanhPass852', N'Võ Thị Mỹ Hạnh', '0912345016', N'Nữ', '1994-05-07', N'102 Võ Văn Kiệt, Quận 1, TP.HCM', 'user_48.jpg', 0),
(035002005117, 'bacsi.hongvantrieu@example.com', 'TrieuPass963', N'Hồng Văn Triều', '0912345017', N'Nam', '1978-01-15', N'26 Nguyễn Trãi, Quận 5, TP.HCM', 'user_49.jpg', 0),
(035002005118, 'bacsi.phamminhtoan@example.com', 'ToanPass741', N'Phạm Minh Toàn', '0912345018', N'Nam', '1990-07-19', N'45 Trường Chinh, Đống Đa, Hà Nội', 'user_50.jpg', 0),
(035002005119, 'bacsi.dinhthithao@example.com', 'ThaoPass369', N'Đinh Thị Thảo', '0912345019', N'Nữ', '1982-06-30', N'99 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', 'user_51.jpg', 0),
(035002005120, 'bacsi.tranquoctuan@example.com', 'TuanPass123', N'Trần Quốc Tuấn', '0912345020', N'Nam', '1981-04-01', N'18 Lý Tự Trọng, Quận 1, TP.HCM', 'user_52.jpg', 0),

--id 53-Admin
(035002005177, 'admin.sonnhhe@example.com', 'SonPass123', N'Nguyễn Hồng Sơn', '0912345634', N'Nữ', '2002-06-27', N'20 Nguyễn Trãi, Thanh Xuân, Hà Nội',  'user_53.jpg',1);


-----------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE UserRoles (
   UserId INT NOT NULL,
   RoleId INT NOT NULL,
   PRIMARY KEY (UserId,RoleId),
   CONSTRAINT User_FK FOREIGN KEY (UserId) REFERENCES Users (UserId),
   CONSTRAINT Role_FK FOREIGN KEY (RoleId) REFERENCES Roles (RoleId)
)
INSERT INTO UserRoles (UserId, RoleId)
VALUES 
    -- Người giám hộ (ID 1-10, RoleId 1)
    (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),

    -- Bệnh nhân (ID 11-30, RoleId 2)
    (11, 2), (12, 2), (13, 2), (14, 2), (15, 2), (16, 2), (17, 2), (18, 2), (19, 2), (20, 2),
    (21, 2), (22, 2), (23, 2), (24, 2), (25, 2), (26, 2), (27, 2), (28, 2), (29, 2), (30, 2),(1,2),(2,2),

	 -- Admin (ID 53, RoleId 5)
      (31,3),(32,3),
    -- Bác sĩ (ID 33-52, RoleId 4)
    (33, 4), (34, 4), (35, 4), (36, 4), (37, 4), (38, 4), (39, 4), (40, 4), (41, 4), (42, 4),
    (43, 4), (44, 4), (45, 4), (46, 4), (47, 4), (48, 4), (49, 4), (50, 4), (51, 4), (52, 4),

    -- Admin (ID 53, RoleId 5)
    (53, 5);


-------------------------------------------------------------------------------------------------------------------

CREATE TABLE Patients (
  PatientId INT NOT NULL,
  GuardianId INT NULL,
  Relationship NVARCHAR(30),
  MainCondition NVARCHAR(300),
  Rank NVARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (PatientId),
  CONSTRAINT Patient_FK FOREIGN KEY (PatientId) REFERENCES Users (UserId),
  CONSTRAINT Guardian_FK FOREIGN KEY (GuardianId) REFERENCES Users (UserId)
) ;
INSERT INTO Patients (PatientId, GuardianId, Relationship, MainCondition, Rank)
VALUES
    (1, NULL, NULL, N'Tiểu đường type 2', N'Thường'), 
    (2, NULL, NULL, N'Tiểu đường', N'Thường'), 
    (11, 1, N'Con', N'Cao huyết áp', N'Thường'), 
    (12, 1, N'Con', N'Tiểu đường', N'Thường'), 
    (13, 1, N'Con', NULL, N'Thường'), 
    (14, 2, N'Mẹ', N'Suyễn', N'Thường'), 
    (15, 2, N'Cháu', NULL, N'Thường'),
    (16, 2, N'Dì', N'Viêm khớp', N'Thường'), 
    (17, 3, N'Chồng', NULL, N'Thường'), 
    (18, 4, N'Vợ', N'Suy thận', N'Thường'), 
    (19, 5, N'Anh trai', NULL, N'Thường'), 
    (20, 6, N'Chị gái', N'Đột quỵ', N'Thường'),  
    (21, 7, N'Ông nội', NULL, N'Thường'), 
    (22, 8, N'Bà ngoại', N'Suyễn', N'Thường'), 
    (23, 9, N'Cô ruột', NULL, N'Thường'),
    (24, 10, N'Chú họ', N'Viêm khớp', N'Thường'), 
    (25, NULL, NULL, NULL, N'Thường'), 
    (26, NULL, NULL, N'Suy thận', N'Thường'), 
    (27, NULL, NULL, NULL, N'Thường'), 
    (28, NULL, NULL, NULL, N'Thường'), 
    (29, NULL, NULL, NULL, N'Thường'), 
    (30, NULL, NULL, NULL, N'Thường');

    

--------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE Receptionists (
    ReceptionistId INT NOT NULL,
    StartDate DATE NOT NULL,     
    Shift NVARCHAR(20) ,  
    PRIMARY KEY (ReceptionistId),
    CONSTRAINT FK_Receptionists_User FOREIGN KEY (ReceptionistId) REFERENCES Users(UserId)
);
INSERT INTO Receptionists (ReceptionistId, StartDate, Shift)
VALUES 
(31, '2024-01-01', N'Ca sáng'),
(32, '2024-01-01', N'Ca chiều');
-------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE Doctors (
    DoctorId INT NOT NULL,
    CurrentWork NVARCHAR(MAX),
    DoctorDescription NVARCHAR(MAX),
    Organization NVARCHAR(MAX),
    Prize NVARCHAR(MAX),
    ResearchProject NVARCHAR(MAX),
    TrainingProcess NVARCHAR(MAX),
    WorkExperience NVARCHAR(MAX),
    AcademicTitle NVARCHAR(50),
    Degree NVARCHAR(50),
    Rating FLOAT NOT NULL DEFAULT 0,
    RatingCount INT NOT NULL DEFAULT 0,
    PRIMARY KEY (DoctorId),
    CONSTRAINT Doctor_FK FOREIGN KEY (DoctorId) REFERENCES Users (UserId)
);

INSERT INTO Doctors (
    DoctorId,
    CurrentWork,
    DoctorDescription,
    Organization,
    Prize,
    ResearchProject,
    TrainingProcess,
    WorkExperience,
    AcademicTitle,
    Degree,
    Rating,
	RatingCount
)
VALUES
(
    33,
    N'Bác sĩ tim mạch tại Phòng khám HealthCare',
    N'Bác sĩ chuyên khoa tim mạch với hơn 10 năm kinh nghiệm trong việc khám và điều trị các bệnh lý về tim mạch.
     Có chuyên môn cao trong việc chẩn đoán bệnh tim bẩm sinh, suy tim, tăng huyết áp và rối loạn nhịp tim.
     Đã thực hiện nhiều ca phẫu thuật can thiệp mạch vành và đặt stent động mạch vành thành công.',
    N'Bệnh viện Thành phố - một trong những bệnh viện hàng đầu về tim mạch,
     với các trang thiết bị hiện đại và đội ngũ bác sĩ giàu kinh nghiệm.',
    N'Giải thưởng "Bác sĩ tim mạch xuất sắc" năm 2020 do Hiệp hội Tim mạch Việt Nam trao tặng.',
    N'Đề tài nghiên cứu: "Ứng dụng trí tuệ nhân tạo trong chẩn đoán bệnh tim mạch",
     nhằm nâng cao độ chính xác trong phát hiện sớm các bệnh lý tim mạch.',
    N'Tốt nghiệp Đại học Y Dược TP.HCM,
     tiếp tục theo học chương trình nội trú chuyên khoa tim mạch tại Bệnh viện Chợ Rẫy,
     tham gia nhiều khóa đào tạo ngắn hạn về tim mạch tại Nhật Bản và Hoa Kỳ.',
    N'10 năm kinh nghiệm công tác tại các bệnh viện lớn,
     tham gia giảng dạy và hướng dẫn nghiên cứu sinh về các phương pháp điều trị bệnh tim hiện đại.',
    N'PGS.TS',
    N'BS.CK2',
    4.5,
	23
),
(
    34,
    N'Chuyên gia nhi khoa tại Phòng khám HealthCare',
    N'Bác sĩ nhi khoa với 8 năm kinh nghiệm trong chăm sóc và điều trị các bệnh thường gặp ở trẻ nhỏ như viêm phổi, viêm họng, suy dinh dưỡng và các rối loạn phát triển.
     Luôn tận tâm với bệnh nhi và đưa ra phác đồ điều trị an toàn, hiệu quả.',
    N'Phòng khám HealthCare - một trong những hệ thống phòng khám hàng đầu về nhi khoa,
     được trang bị đầy đủ các thiết bị hiện đại để phục vụ cho việc chẩn đoán và điều trị.',
    N'Nhận danh hiệu "Bác sĩ nhi khoa hàng đầu" năm 2021,
     do Hiệp hội Nhi khoa Việt Nam trao tặng.',
    N'Nghiên cứu về phát triển toàn diện cho trẻ em,
     đặc biệt là ứng dụng các phương pháp dinh dưỡng hiện đại trong điều trị suy dinh dưỡng và thấp còi.',
    N'Hoàn thành chương trình đào tạo chuyên khoa nhi tại Đại học Y Hà Nội,
     thực tập tại Bệnh viện Nhi Trung Ương và có chứng chỉ đào tạo nâng cao về dinh dưỡng nhi khoa tại Nhật Bản.',
    N'8 năm kinh nghiệm làm việc tại các bệnh viện lớn,
     tham gia nhiều hội thảo quốc tế về nhi khoa và dinh dưỡng trẻ em.',
    N'PGS',
    N'BS.CK1',
     5,
	 10

),
(
    35,
    N'Bác sĩ da liễu tại Phòng khám HealthCare',
    N'Chuyên gia về da liễu với hơn 5 năm kinh nghiệm trong điều trị các bệnh lý về da như mụn trứng cá, nám da, tàn nhang, viêm da mãn tính và lão hóa da.
     Sử dụng công nghệ tiên tiến như laser, lăn kim và tế bào gốc trong điều trị.',
    N'Trung tâm Chăm sóc Da - địa chỉ uy tín trong lĩnh vực da liễu,
     nơi ứng dụng các công nghệ hiện đại nhất để giúp khách hàng có làn da khỏe mạnh.',
    N'Giải thưởng "Bác sĩ Da liễu xuất sắc" năm 2022,
     do Hiệp hội Da liễu Việt Nam bình chọn.',
    N'Nghiên cứu công nghệ laser trong điều trị nám da và các liệu pháp tái tạo da tự nhiên.',
    N'Tốt nghiệp Đại học Y Hà Nội chuyên khoa da liễu,
     tham gia khóa đào tạo chuyên sâu tại Hàn Quốc về công nghệ làm đẹp bằng laser và tế bào gốc.',
    N'5 năm kinh nghiệm điều trị bệnh lý da liễu tại các bệnh viện lớn và phòng khám tư nhân,
     giảng dạy tại các hội thảo về công nghệ điều trị da tiên tiến.',
    N'GS.TS',
    N'BS.CK2',
    4.3,
	35
),
(
     36,
    N'Bác sĩ ngoại thần kinh tại Bệnh viện Chợ Rẫy',
    N'Chuyên gia phẫu thuật thần kinh với hơn 12 năm kinh nghiệm,
     chuyên điều trị các bệnh lý về não, cột sống và thần kinh ngoại vi.',
    N'Bệnh viện Chợ Rẫy - trung tâm hàng đầu về ngoại khoa tại Việt Nam.',
    N'Giải thưởng "Bàn tay vàng Ngoại thần kinh" năm 2021.',
    N'Nghiên cứu phẫu thuật vi phẫu trong điều trị u não và chấn thương sọ não.',
    N'Tốt nghiệp Đại học Y Dược TP.HCM, đào tạo chuyên sâu tại Nhật Bản.',
    N'12 năm kinh nghiệm, từng công tác tại nhiều bệnh viện lớn.',
    N'TS',
    N'BS.CK2',
    5,
	43
),
(
    37,
	N'Bác sĩ sản phụ khoa tại Bệnh viện Phụ sản Trung Ương',
    N'Có hơn 15 năm kinh nghiệm trong lĩnh vực sản khoa,
     chuyên theo dõi thai kỳ, điều trị hiếm muộn và phẫu thuật sản khoa.',
    N'Bệnh viện Phụ sản Trung Ương - đơn vị đầu ngành về chăm sóc sức khỏe sinh sản.',
    N'Giải thưởng "Thầy thuốc ưu tú" năm 2019.',
    N'Nghiên cứu phương pháp hỗ trợ sinh sản hiện đại như IVF.',
    N'Tốt nghiệp Đại học Y Hà Nội, đào tạo tại Pháp.',
    N'15 năm kinh nghiệm tại các bệnh viện lớn.',
    N'PGS',
    N'BS.CK2',
    4.5,
	23
),
(
     38,
	N'Chuyên gia y học cổ truyền tại Viện Y học Cổ truyền',
    N'Bác sĩ chuyên về y học cổ truyền và Đông y,
     áp dụng phương pháp điều trị kết hợp y học hiện đại.',
    N'Viện Y học Cổ truyền Việt Nam.',
    N'Danh hiệu "Thầy thuốc nhân dân" năm 2018.',
    N'Nghiên cứu ứng dụng Đông dược trong điều trị bệnh mãn tính.',
    N'Tốt nghiệp Học viện Y dược học Cổ truyền.',
    N'Hơn 20 năm kinh nghiệm trong ngành.',
    N'GS',
    N'BS.CK2',
    3.8,
	12
),
(
     39,
	N'Bác sĩ da liễu tại Phòng khám HealthCare',
    N'Chuyên gia về da liễu với hơn 5 năm kinh nghiệm trong điều trị các bệnh lý về da như
     mụn trứng cá, nám da, tàn nhang, viêm da mãn tính và lão hóa da.
     Sử dụng công nghệ tiên tiến như laser, lăn kim và tế bào gốc trong điều trị.',
    N'Trung tâm Chăm sóc Da - địa chỉ uy tín trong lĩnh vực da liễu,
     nơi ứng dụng các công nghệ hiện đại nhất để giúp khách hàng có làn da khỏe mạnh.',
    N'Giải thưởng "Bác sĩ Da liễu xuất sắc" năm 2022,
     do Hiệp hội Da liễu Việt Nam bình chọn.',
    N'Nghiên cứu công nghệ laser trong điều trị nám da và các liệu pháp tái tạo da tự nhiên.',
    N'Tốt nghiệp Đại học Y Hà Nội chuyên khoa da liễu,
     tham gia khóa đào tạo chuyên sâu tại Hàn Quốc về công nghệ làm đẹp bằng laser và tế bào gốc.',
    N'5 năm kinh nghiệm điều trị bệnh lý da liễu tại các bệnh viện lớn và phòng khám tư nhân,
     giảng dạy tại các hội thảo về công nghệ điều trị da tiên tiến.',
    N'GS.TS',
    N'BS.CK2',
    4.6,
	12
),

(
    40,
    N'Bác sĩ tim mạch tại Bệnh viện Bạch Mai',
    N'Chuyên gia tim mạch với hơn 18 năm kinh nghiệm, chuyên điều trị suy tim, tăng huyết áp và bệnh động mạch vành.',
    N'Bệnh viện Bạch Mai - Trung tâm tim mạch hàng đầu Việt Nam.',
    N'Giải thưởng "Bác sĩ ưu tú" năm 2020.',
    N'Nghiên cứu phương pháp đặt stent mạch vành tiên tiến.',
    N'Tốt nghiệp Đại học Y Hà Nội, đào tạo chuyên sâu tại Đức.',
    N'18 năm kinh nghiệm.',
    N'GS',
    N'BS.CK2',
     4.8,
	 12
),

(
   41,
    N'Bác sĩ nhi khoa tại Bệnh viện Nhi Trung Ương',
    N'Chuyên gia chăm sóc sức khỏe trẻ em, điều trị các bệnh lý nhi khoa phức tạp.',
    N'Bệnh viện Nhi Trung Ương.',
    N'Danh hiệu "Bác sĩ nhân dân" năm 2017.',
    N'Nghiên cứu vắc xin và miễn dịch ở trẻ em.',
    N'Tốt nghiệp Đại học Y Dược TP.HCM.',
    N'16 năm kinh nghiệm.',
    N'PGS',
    N'BS.CK2',
    4.8,
	36
),

(
   42,
    N'Bác sĩ da liễu tại Bệnh viện Da liễu Trung ương',
    N'Chuyên gia da liễu điều trị bệnh ngoài da, thẩm mỹ da.',
    N'Bệnh viện Da liễu Trung ương.',
    N'Giải thưởng "Bác sĩ xuất sắc".',
    N'Nghiên cứu về laser trong điều trị nám.',
    N'Tốt nghiệp Đại học Y Hà Nội.',
    N'10 năm kinh nghiệm.',
    N'TS',
    N'BS.CK2',
    3.8,
	12
),

(
   43,
    N'Bác sĩ tai mũi họng tại Bệnh viện Tai Mũi Họng Trung ương',
    N'Chuyên gia về phẫu thuật nội soi mũi xoang.',
    N'Bệnh viện Tai Mũi Họng Trung ương.',
    N'Giải thưởng "Bàn tay vàng".',
    N'Nghiên cứu điều trị viêm mũi xoang.',
    N'Tốt nghiệp Đại học Y Dược TP.HCM.',
    N'12 năm kinh nghiệm.',
    N'PGS',
    N'BS.CK2',
     5,
	 23
),

(
   44,
    N'Bác sĩ mắt tại Bệnh viện Mắt Trung ương',
    N'Chuyên gia về phẫu thuật LASIK.',
    N'Bệnh viện Mắt Trung ương.',
    N'Giải thưởng "Thầy thuốc nhân dân".',
    N'Nghiên cứu về cận thị và loạn thị.',
    N'Tốt nghiệp Đại học Y Hà Nội.',
    N'15 năm kinh nghiệm.',
    N'GS',
    N'BS.CK2',
     4.7,
	 10
),

(
   45,
    N'Bác sĩ nam khoa tại Bệnh viện Bình Dân',
    N'Chuyên gia điều trị hiếm muộn nam giới.',
    N'Bệnh viện Bình Dân.',
    N'Giải thưởng "Bác sĩ nhân dân".',
    N'Nghiên cứu tinh trùng và điều trị vô sinh.',
    N'Tốt nghiệp Đại học Y Dược TP.HCM.',
    N'14 năm kinh nghiệm.',
    N'PGS',
    N'BS.CK2',
    4.5,
	12
),

(
   46,
    N'Bác sĩ nội khoa tại Bệnh viện Bạch Mai',
    N'Chuyên gia điều trị bệnh mãn tính như tiểu đường, huyết áp.',
    N'Bệnh viện Bạch Mai.',
    N'Giải thưởng "Bác sĩ ưu tú".',
    N'Nghiên cứu insulin trong điều trị tiểu đường.',
    N'Tốt nghiệp Đại học Y Hà Nội.',
    N'20 năm kinh nghiệm.',
    N'GS',
    N'BS.CK1',
    3.4,
	5
),
(
   47,
    N'Bác sĩ phẫu thuật chỉnh hình tại Bệnh viện Việt Đức',
    N'Chuyên gia phẫu thuật chỉnh hình, tạo hình.',
    N'Bệnh viện Việt Đức.',
    N'Giải thưởng "Bác sĩ tài năng".',
    N'Nghiên cứu công nghệ chỉnh hình hiện đại.',
    N'Tốt nghiệp Đại học Y Hà Nội.',
    N'22 năm kinh nghiệm.',
    N'PGS',
    N'BS.CK2',
    4.7,
	20
),

(
   48,
    N'Bác sĩ ung bướu tại Bệnh viện K',
    N'Chuyên gia điều trị ung thư.',
    N'Bệnh viện K.',
    N'Giải thưởng "Bác sĩ vì cộng đồng".',
    N'Nghiên cứu liệu pháp miễn dịch điều trị ung thư.',
    N'Tốt nghiệp Đại học Y Dược TP.HCM.',
    N'18 năm kinh nghiệm.',
    N'GS',
    N'BS.CK1',
     4.6,
	 12
),

(
   49,
    N'Bác sĩ thần kinh tại Bệnh viện Chợ Rẫy',
    N'Chuyên gia điều trị bệnh lý thần kinh.',
    N'Bệnh viện Chợ Rẫy.',
    N'Giải thưởng "Bàn tay vàng Thần kinh".',
    N'Nghiên cứu điều trị bệnh Parkinson.',
    N'Tốt nghiệp Đại học Y Hà Nội.',
    N'16 năm kinh nghiệm.',
    N'PGS',
    N'BS.CK2',
    3.4,
    4
),

(
   50,
    N'Bác sĩ tiêu hóa tại Bệnh viện Bạch Mai',
    N'Chuyên gia tiêu hóa và gan mật.',
    N'Bệnh viện Bạch Mai.',
    N'Giải thưởng "Bác sĩ xuất sắc".',
    N'Nghiên cứu bệnh lý gan nhiễm mỡ.',
    N'Tốt nghiệp Đại học Y Hà Nội.',
    N'14 năm kinh nghiệm.',
    N'TS',
    N'BS.CK1',
    4.5,  
	12
),

(
   51,
    N'Bác sĩ phẫu thuật tim tại Bệnh viện Tim Hà Nội',
    N'Chuyên gia phẫu thuật tim mạch.',
    N'Bệnh viện Tim Hà Nội.',
    N'Giải thưởng "Bác sĩ cống hiến".',
    N'Nghiên cứu kỹ thuật thay van tim.',
    N'Tốt nghiệp Đại học Y Hà Nội.',
    N'20 năm kinh nghiệm.',
    N'GS',
    N'BS.CK1',
    4.5,
	6
),

(
   52,
    N'Bác sĩ hồi sức cấp cứu tại Bệnh viện 108',
    N'Chuyên gia hồi sức cấp cứu.',
    N'Bệnh viện 108.',
    N'Giải thưởng "Bác sĩ tận tâm".',
    N'Nghiên cứu kỹ thuật ECMO.',
    N'Tốt nghiệp Đại học Y Dược TP.HCM.',
    N'12 năm kinh nghiệm.',
    N'PGS',
    N'BS.CK2',
    4.8,
	45
);


-------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Devices (
    DeviceId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),                       
    Functionality NVARCHAR(MAX)                       
);

INSERT INTO Devices (Name, Description, Functionality)
VALUES
    (N'Máy chụp MRI', N'Thiết bị chụp cộng hưởng từ', N'Cung cấp hình ảnh chi tiết của các cơ quan nội tạng'),
    (N'Máy X-quang', N'Thiết bị chụp X-quang tiêu chuẩn', N'Tạo ra hình ảnh X-quang phục vụ chẩn đoán'),
    (N'Máy đo điện tim', N'Thiết bị điện tâm đồ', N'Giám sát và ghi lại hoạt động điện của tim'),
    (N'Máy siêu âm', N'Dùng để chụp ảnh không xâm lấn', N'Tạo ra hình ảnh thời gian thực của các cơ quan nội tạng'),
    (N'Ống nghe', N'Công cụ chẩn đoán tiêu chuẩn', N'Dùng để nghe âm thanh tim và phổi'),
    (N'Máy đo huyết áp', N'Dụng cụ đo huyết áp', N'Theo dõi huyết áp tâm thu và tâm trương'),
    (N'Đèn soi đáy mắt', N'Công cụ khám mắt', N'Dùng để kiểm tra võng mạc và các bộ phận khác của mắt'),
    (N'Dụng cụ nha khoa', N'Bộ dụng cụ chuyên dụng cho khám răng', N'Bao gồm cây lấy cao răng, gương soi và que thăm dò');



----------------------------------------------------------------------------------


CREATE TABLE Specialties (
  SpecialtyId INT NOT NULL IDENTITY(1,1),
  SpecialtyName NVARCHAR(100) NOT NULL,
  SpecialtyDescription NVARCHAR(MAX),  
  Image VARCHAR(200) NOT NULL,
  PRIMARY KEY (SpecialtyId)
);
INSERT INTO Specialties (SpecialtyName, SpecialtyDescription,Image)
VALUES
  (N'Nội tổng quát', N'Điều trị các bệnh không phẫu thuật và quản lý các vấn đề sức khỏe chung của cơ thể.','chuyenkhoa_1.jpg'),
  (N'Tim mạch', N'Chuyên điều trị các bệnh liên quan đến tim và mạch máu.','chuyenkhoa_2.jpg'),
  (N'Nội tiết', N'Điều trị các bệnh liên quan đến hormone và tuyến nội tiết (như tiểu đường, suy giáp).','chuyenkhoa_3.jpg'),
  (N'Tiêu hóa', N'Chuyên điều trị các vấn đề liên quan đến hệ tiêu hóa, như dạ dày, ruột và gan.','chuyenkhoa_4.jpg'),
  (N'Ngoại tổng quát', N'Thực hiện các ca phẫu thuật liên quan đến cơ quan nội tạng.','chuyenkhoa_5.jpg'),
  (N'Ngoại thần kinh', N'Điều trị các bệnh thần kinh cần phẫu thuật, như phẫu thuật não và tủy sống.','chuyenkhoa_6.jpg'),
  (N'Chấn thương chỉnh hình', N'Chuyên điều trị chấn thương xương khớp.','chuyenkhoa_7.jpg'),
  (N'Sản khoa', N'Điều trị các vấn đề liên quan đến thai kỳ và sinh nở.','chuyenkhoa_8.jpg'),
  (N'Phụ khoa', N'Điều trị các bệnh liên quan đến hệ sinh sản nữ.','chuyenkhoa_9.jpg'),
  (N'Nhi khoa', N'Chuyên chăm sóc sức khỏe trẻ em từ sơ sinh đến thanh thiếu niên.','chuyenkhoa_10.jpg'),
  (N'Nhãn khoa', N'Điều trị các bệnh liên quan đến mắt và thị lực.','chuyenkhoa_11.jpg'),
  (N'Tai - Mũi - Họng', N'Chuyên điều trị các bệnh liên quan đến tai, mũi và họng.','chuyenkhoa_12.jpg'),
  (N'Da liễu', N'Điều trị các bệnh về da, móng và tóc.','chuyenkhoa_13.jpg'),
  (N'Tâm thần', N'Điều trị các rối loạn tâm thần và các bệnh lý tâm thần.','chuyenkhoa_14.jpg'),
  (N'Xét nghiệm y học', N'Thực hiện các xét nghiệm lâm sàng như xét nghiệm máu, nước tiểu và chẩn đoán hình ảnh.','chuyenkhoa_15.jpg'),
  (N'Hồi sức cấp cứu', N'Điều trị cho bệnh nhân nguy kịch hoặc cần chăm sóc đặc biệt.','chuyenkhoa_16.jpg'),
  (N'Hô hấp', N'Chẩn đoán và điều trị các bệnh liên quan đến hệ hô hấp.', 'chuyenkhoa_17.jpg'),
  (N'Răng Hàm Mặt', N'Chẩn đoán và điều trị các bệnh lý về răng, hàm và mặt.', 'chuyenkhoa_18.jpg');




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
    (33, 1), (33, 5), (34, 2), (35, 3), (36, 7), (37, 4), (38, 6), (40, 9), (41, 10), 
    (42, 11), (43, 12), (44, 13), (45, 14), (46, 15), (47, 16), (48, 1), (49, 2), (50, 3), 
    (51, 4), (52, 5), (33, 7), (34, 9), (35, 11), (36, 13), (37, 15), (38, 16), (39, 8), (40, 12);


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
  (41, 'https://ysidakhoa.net/wp-content/uploads/2020/06/chungchihanhngheysidakhoa.jpg'),
  (42, 'https://ysidakhoa.net/wp-content/uploads/2020/06/chungchihanhngheysidakhoa.jpg'),
  (43, 'https://ysidakhoa.net/wp-content/uploads/2020/06/chungchihanhngheysidakhoa.jpg');

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
    RoomName NVARCHAR(100) NOT NULL,       
    RoomType NVARCHAR(50) NOT NULL,       
    Location NVARCHAR(255) NOT NULL 

);

INSERT INTO Rooms (RoomName, RoomType, Location)
VALUES
(N'Phòng 302', N'Hồi sức tích cực', N'Tầng 3, Khu C'),
(N'Phòng 303', N'Chụp X-quang', N'Tầng 3, Khu C'),
(N'Phòng 304', N'Chụp MRI', N'Tầng 3, Khu C'),
(N'Phòng 305', N'Chụp CT', N'Tầng 3, Khu C'),
(N'Phòng 306', N'Phẫu thuật', N'Tầng 3, Khu C'),
(N'Phòng 307', N'Khám bệnh', N'Tầng 3, Khu D'),
(N'Phòng 308', N'Siêu âm', N'Tầng 3, Khu D'),
(N'Phòng 309', N'Xét nghiệm', N'Tầng 3, Khu D'),
(N'Phòng 310', N'Hồi sức tích cực', N'Tầng 3, Khu D'),
(N'Phòng 311', N'Cấp cứu', N'Tầng 3, Khu E'),
(N'Phòng 312', N'Khám bệnh', N'Tầng 3, Khu E'),
(N'Phòng 313', N'Nội soi', N'Tầng 3, Khu E'),
(N'Phòng 314', N'Chạy thận nhân tạo', N'Tầng 3, Khu E'),
(N'Phòng 315', N'Phẫu thuật', N'Tầng 3, Khu E'),
(N'Phòng 316', N'Chụp X-quang', N'Tầng 3, Khu F'),
(N'Phòng 317', N'Chụp MRI', N'Tầng 3, Khu F'),
(N'Phòng 318', N'Chụp CT', N'Tầng 3, Khu F'),
(N'Phòng 319', N'Hồi sức tích cực', N'Tầng 3, Khu F'),
(N'Phòng 320', N'Cấp cứu', N'Tầng 3, Khu F');
-----------------------------------------------------------------------
CREATE TABLE Services (
    ServiceId INT PRIMARY KEY IDENTITY(1,1),
    ServiceName NVARCHAR(100) NOT NULL,
    Overview NVARCHAR(500),
    Process NVARCHAR(MAX),
    TreatmentTechniques NVARCHAR(MAX),
    Price DECIMAL(18,2) NOT NULL,
    EstimatedTime TIME NOT NULL,
    IsPrepayment BIT DEFAULT 1, 
    SpecialtyId INT NOT NULL,
    Image NVARCHAR(200),
	Rating FLOAT NOT NULL DEFAULT 0,
    RatingCount INT NOT NULL DEFAULT 0,
    FOREIGN KEY (SpecialtyId) REFERENCES Specialties(SpecialtyId)
);



INSERT INTO Services (ServiceName, Overview, Process, TreatmentTechniques, Price, EstimatedTime, IsPrepayment, SpecialtyId, Image,Rating,RatingCount)
VALUES
(N'Khám tim mạch',
  N'Khám tim mạch giúp đánh giá tình trạng sức khỏe của tim và hệ tuần hoàn, phát hiện sớm các bệnh lý tim mạch như cao huyết áp, bệnh mạch vành, suy tim hoặc rối loạn nhịp tim. Việc kiểm tra định kỳ giúp phát hiện sớm và điều trị kịp thời các vấn đề về tim mạch.',
  N'1. Khai thác tiền sử bệnh tim mạch của bệnh nhân và gia đình.\n2. Đo các chỉ số sinh tồn: huyết áp, nhịp tim, SpO2.\n3. Khám lâm sàng hệ tim mạch, nghe tim bằng ống nghe.\n4. Thực hiện các xét nghiệm như điện tâm đồ (ECG), siêu âm tim, xét nghiệm mỡ máu.\n5. Đánh giá tình trạng tim mạch và tư vấn điều trị hoặc phòng ngừa bệnh lý.',
  N'Sử dụng máy đo huyết áp, máy điện tim (ECG), máy siêu âm tim Doppler, thiết bị đo cholesterol và các xét nghiệm sinh hóa máu.',
  600000, '00:30:00', 0, 2, N'dichvu_1.jpg',4.6,12),


(N'Khám tai mũi họng tổng quát',
 N'Dịch vụ khám tổng quát các cơ quan tai, mũi, họng nhằm phát hiện và điều trị sớm các bệnh lý như viêm mũi xoang, viêm tai giữa, viêm họng hoặc rối loạn giọng nói.',
 N'1. Khai thác triệu chứng và tiền sử bệnh tai mũi họng.\n2. Soi tai, mũi, họng bằng dụng cụ chuyên dụng.\n3. Kiểm tra chức năng nghe, mũi và thanh quản nếu cần.\n4. Tư vấn điều trị và hướng dẫn chăm sóc.',
 N'Đèn soi tai mũi họng, máy nội soi tai mũi họng, que đè lưỡi, máy đo thính lực.',
 700000, '00:30:00', 1, 12, N'dichvu_2.jpg',4.5,10),


(N'Khám mắt',
 N'Khám mắt là quy trình kiểm tra chức năng thị lực và các bệnh lý về mắt như cận thị, loạn thị, viễn thị và các vấn đề khác về võng mạc.',
 N'1. Đo thị lực bằng bảng kiểm tra.\n2. Đo nhãn áp để kiểm tra nguy cơ tăng nhãn áp.\n3. Soi đáy mắt để phát hiện bệnh lý võng mạc.\n4. Đánh giá tổng quan sức khỏe mắt.',
 N'Sử dụng máy đo thị lực tự động, máy đo nhãn áp, đèn soi đáy mắt và thiết bị laser nếu cần.',
 800000, '01:00:00', 1, 11, N'dichvu_3.jpg',5,10),

(N'Xét nghiệm',
 N'Xét nghiệm y tế giúp chẩn đoán và theo dõi tình trạng sức khỏe của bệnh nhân thông qua việc phân tích mẫu máu, nước tiểu hoặc các mẫu sinh học khác.',
 N'1. Thu thập mẫu máu hoặc nước tiểu.\n2. Xét nghiệm sinh hóa, huyết học hoặc vi sinh.\n3. Đánh giá kết quả và lập báo cáo.\n4. Tư vấn về các chỉ số bất thường nếu có.',
 N'Sử dụng máy xét nghiệm tự động, máy phân tích sinh hóa và dụng cụ lấy mẫu vô trùng.',
 300000, '00:15:00', 1, 15, N'dichvu_4.jpg',4.5,3),

(N'Vật lý trị liệu',
 N'Vật lý trị liệu là quá trình phục hồi chức năng vận động, giảm đau và cải thiện chất lượng cuộc sống cho bệnh nhân bị chấn thương hoặc các bệnh lý cơ xương khớp.',
 N'1. Đánh giá tình trạng cơ bắp và khớp.\n2. Xây dựng kế hoạch phục hồi chức năng.\n3. Thực hiện các bài tập phục hồi và massage trị liệu.\n4. Theo dõi và điều chỉnh phương pháp điều trị.',
 N'Sử dụng máy siêu âm trị liệu, máy điện xung, máy kéo giãn cột sống và dụng cụ tập luyện.',
 600000, '01:00:00', 0,  7, N'dichvu_5.jpg',4.7,23),

(N'Tư vấn tâm lý',
 N'Tư vấn tâm lý giúp bệnh nhân giải tỏa căng thẳng, lo âu và các vấn đề tinh thần thông qua liệu pháp trò chuyện và tư vấn cá nhân.',
 N'1. Khai thác tình trạng tâm lý của bệnh nhân.\n2. Thực hiện các bài kiểm tra tâm lý nếu cần.\n3. Áp dụng liệu pháp nhận thức hành vi (CBT).\n4. Đưa ra các phương pháp quản lý căng thẳng.',
 N'Kỹ thuật CBT, liệu pháp thư giãn, và trị liệu cá nhân.',
 400000, '01:00:00', 0,  14, N'dichvu_6.jpg',4.8,23),

(N'Khám nhi',
 N'Khám nhi là quá trình kiểm tra sức khỏe tổng quát cho trẻ em, nhằm phát hiện sớm các bệnh lý tiềm ẩn, theo dõi quá trình phát triển thể chất và tiêm chủng định kỳ.',
 N'1. Khai thác tiền sử sức khỏe và bệnh sử của trẻ.\n2. Đo các chỉ số sinh tồn như chiều cao, cân nặng, nhiệt độ, nhịp tim.\n3. Khám lâm sàng các hệ cơ quan (hô hấp, tiêu hóa, tim mạch, thần kinh...).\n4. Đánh giá tình trạng dinh dưỡng và phát triển của trẻ.\n5. Tư vấn tiêm chủng và chăm sóc sức khỏe định kỳ.',
 N'Máy đo huyết áp trẻ em, cân điện tử, máy đo nhiệt độ, thiết bị đo chiều cao.',
 600000, '00:30:00', 1,  10, N'dichvu_7.jpg',4.9,34),

(N'Siêu âm',
 N'Siêu âm là kỹ thuật chẩn đoán hình ảnh không xâm lấn, giúp phát hiện các bất thường bên trong cơ thể qua sóng siêu âm.',
 N'1. Khai thác triệu chứng lâm sàng và bệnh sử.\n2. Chuẩn bị vùng siêu âm bằng gel dẫn sóng.\n3. Thực hiện siêu âm bằng đầu dò chuyên dụng.\n4. Phân tích kết quả hình ảnh trên màn hình.\n5. Tư vấn chẩn đoán và hướng điều trị.',
 N'Máy siêu âm 4D, đầu dò siêu âm, máy tính phân tích hình ảnh.',
 1000000, '00:30:00', 1,  16, N'dichvu_8.jpg',3.5,3),

(N'Khám da liễu',
 N'Khám da liễu giúp phát hiện và điều trị các bệnh lý về da như viêm da, mụn trứng cá, bệnh da liễu truyền nhiễm và các rối loạn về sắc tố.',
 N'1. Khai thác tiền sử bệnh lý về da.\n2. Khám da bằng kính lúp và ánh sáng chuyên dụng.\n3. Đánh giá tổn thương da và vùng bị ảnh hưởng.\n4. Đề xuất các liệu pháp như liệu pháp laser, liệu pháp lạnh.\n5. Tư vấn chăm sóc da và phòng ngừa.',
 N'Máy laser, máy soi da, thiết bị trị liệu bằng lạnh.',
 700000, '00:45:00', 0, 13, N'dichvu_9.jpg',4,12),

(N'Tư vấn dinh dưỡng', 
 N'Tư vấn dinh dưỡng là quá trình lập kế hoạch chế độ ăn uống hợp lý...', 
 N'1. Đánh giá tình trạng dinh dưỡng...\n2. Thực hiện xét nghiệm...', 
 N'Máy đo chỉ số cơ thể, bảng phân tích dinh dưỡng...', 
 500000, '01:00:00', 0, 1, N'dichvu_10.jpg',4.7,23), 

(N'Tiêm chủng cho trẻ em', 
 N'Tiêm phòng định kỳ và du lịch dành riêng cho trẻ em nhằm bảo vệ sức khỏe, phòng ngừa các bệnh truyền nhiễm nguy hiểm cho trẻ em, đặc biệt là trong giai đoạn phát triển.',
 N'1. Tư vấn về các loại vắc-xin dành cho trẻ em, bao gồm các vắc-xin phòng ngừa bệnh truyền nhiễm nguy hiểm.\n2. Tiêm các vắc-xin cho trẻ theo độ tuổi và lịch tiêm chủng.\n3. Đánh giá sức khỏe của trẻ trước và sau khi tiêm.\n4. Hướng dẫn phụ huynh về các biện pháp phòng ngừa và chăm sóc sau tiêm.',
 N'Vắc-xin các loại, bộ tiêm chủng cho trẻ em, các thiết bị theo dõi sức khỏe.',
 200000, '00:15:00', 1, 10, N'dichvu_11.jpg', 4.3, 12),


(N'Chiropractic', 
 N'Kiểm tra và nắn chỉnh cột sống...', 
 N'1. Đánh giá tình trạng cột sống...\n2. Thực hiện các kỹ thuật...', 
 N'Bàn nắn chỉnh cột sống, dụng cụ hỗ trợ...', 
 800000, '01:00:00', 0, 7, N'dichvu_12.jpg',4.6,34), 

(N'Kiểm tra thính giác chuyên sâu', 
 N'Dịch vụ kiểm tra thính lực giúp phát hiện sớm các vấn đề về khả năng nghe, phục vụ chẩn đoán và điều trị các bệnh liên quan đến tai.', 
 N'1. Khai thác tiền sử nghe kém, ù tai.\n2. Đo thính lực bằng thiết bị chuyên dụng.\n3. Đánh giá kết quả và tư vấn điều trị nếu phát hiện bất thường.\n4. Hướng dẫn sử dụng máy trợ thính nếu cần.',
 N'Máy đo thính lực, tai nghe kiểm tra, buồng cách âm.',
 600000, '00:30:00', 0, 12, N'dichvu_13.jpg',5.0,34),


(N'Tư vấn dinh dưỡng tiêu hóa', 
 N'Cung cấp lời khuyên chuyên sâu về chế độ ăn uống và lối sống giúp cải thiện chức năng tiêu hóa và phòng ngừa các bệnh về dạ dày, ruột.',
 N'1. Đánh giá thói quen ăn uống và lối sống hiện tại.\n2. Tư vấn thực đơn phù hợp với từng tình trạng sức khỏe tiêu hóa.\n3. Hướng dẫn thay đổi thói quen sinh hoạt nhằm cải thiện hệ tiêu hóa.\n4. Theo dõi và đánh giá hiệu quả điều chỉnh sau một thời gian.',
 N'Tài liệu hướng dẫn dinh dưỡng, bảng thực đơn mẫu, thiết bị phân tích thành phần cơ thể.', 
 750000, '00:45:00', 1, 4, N'dichvu_22.jpg', 4.6, 18),


(N'Khám chỉnh hình', 
 N'Kiểm tra và điều trị các bệnh lý về xương khớp...', 
 N'1. Khai thác bệnh sử xương khớp...\n2. Chẩn đoán hình ảnh...', 
 N'Bàn khám chỉnh hình, dụng cụ nẹp...', 
 850000, '01:00:00', 0, 7, N'dichvu_15.jpg',4.5,10), 

(N'Tư vấn hiếm muộn', 
 N'Hỗ trợ tư vấn vô sinh hiếm muộn...', 
 N'1. Khai thác bệnh sử sức khỏe sinh sản...\n2. Xét nghiệm hormone...', 
 N'Thiết bị siêu âm, máy xét nghiệm sinh hóa...', 
 1200000, '01:30:00', 1, 8, N'dichvu_16.jpg',4.3,2), 

(N'Tư vấn tiểu đường', 
 N'Quản lý bệnh tiểu đường...', 
 N'1. Đánh giá tiền sử bệnh lý...\n2. Đo đường huyết...', 
 N'Máy đo đường huyết, bút tiêm insulin...', 
 450000, '00:30:00', 0, 3, N'dichvu_17.jpg',5,34), 

(N'Liệu pháp hô hấp', 
 N'Điều trị và phục hồi chức năng hô hấp...', 
 N'1. Đánh giá tình trạng hô hấp...\n2. Hướng dẫn bài tập thở...', 
 N'Máy khí dung, thiết bị hỗ trợ thở...', 
 700000, '00:45:00', 0, 16, N'dichvu_18.jpg',2,2), 

(N'Khám tiêu hóa', 
 N'Kiểm tra sức khỏe hệ tiêu hóa...', 
 N'1. Khai thác bệnh sử tiêu hóa...\n2. Nội soi dạ dày...', 
 N'Máy nội soi dạ dày, máy nội soi đại tràng...', 
 1100000, '01:00:00', 1, 4, N'dichvu_19.jpg',4.4,24),

(N'Khám mạch vành',
N'Kiểm tra và đánh giá chức năng của mạch vành để phát hiện các vấn đề liên quan đến tim mạch, bao gồm bệnh mạch vành, tắc nghẽn động mạch, và các bệnh lý tim mạch khác.',
N'1. Khai thác tiền sử bệnh tim mạch, bệnh lý gia đình liên quan đến mạch vành.\n2. Đo các chỉ số sinh tồn: huyết áp, nhịp tim.\n3. Thực hiện các xét nghiệm như điện tâm đồ (ECG), siêu âm tim, chụp CT mạch vành hoặc chụp mạch máu qua catheter.\n4. Đánh giá tình trạng mạch vành và tư vấn điều trị nếu cần thiết.',
N'Sử dụng máy đo huyết áp, máy điện tim (ECG), máy siêu âm tim Doppler, máy chụp CT mạch vành.',
800000, '00:30:00', 1, 2, N'dichvu_21.jpg',4.5, 15),

(N'Khám hô hấp tổng quát',
N'Kiểm tra và đánh giá tổng quát chức năng hô hấp, phát hiện các bệnh lý về phổi và đường hô hấp.',
N'1. Khai thác tiền sử bệnh lý hô hấp và các yếu tố nguy cơ.\n2. Đo các chỉ số sinh tồn: nhịp thở, độ bão hòa oxy.\n3. Thực hiện các xét nghiệm như X-quang phổi, đo chức năng hô hấp (spirometry).\n4. Đánh giá tình trạng hô hấp và tư vấn điều trị nếu cần thiết.',
N'Sử dụng máy đo chức năng hô hấp (spirometer), máy đo oxy máu (pulse oximeter), máy chụp X-quang phổi.',
600000, '00:30:00', 1, 17, N'dichvu_22.jpg',4.6, 17),

(N'Khám thần kinh tổng quát',
N'Kiểm tra và đánh giá tổng quát chức năng thần kinh, phát hiện các rối loạn thần kinh và các bệnh lý liên quan đến hệ thần kinh.',
N'1. Khai thác tiền sử bệnh lý thần kinh và các yếu tố nguy cơ.\n2. Đánh giá phản xạ, cảm giác, vận động và các chức năng thần kinh khác.\n3. Thực hiện các xét nghiệm hỗ trợ như MRI não, CT scan nếu cần thiết.\n4. Tư vấn hướng điều trị và quản lý bệnh lý thần kinh.',
N'Sử dụng búa phản xạ, thiết bị đo điện cơ (EMG), máy MRI, máy CT scan.',
650000, '00:40:00', 1, 6, N'dichvu_23.jpg', 4.7, 15),

(N'Khám rụng tóc & bệnh lý da đầu',
N'Đánh giá tình trạng rụng tóc, bệnh lý da đầu, xác định nguyên nhân và tư vấn điều trị phù hợp.',
N'1. Khai thác tiền sử rụng tóc, các yếu tố nguy cơ (stress, di truyền, nội tiết...).\n2. Kiểm tra da đầu, mật độ tóc, mức độ rụng tóc.\n3. Thực hiện xét nghiệm máu/hormone nếu cần.\n4. Tư vấn phác đồ điều trị (thuốc, laser, cấy tóc).',
N'Sử dụng kính phóng đại da liễu (dermatoscope), xét nghiệm máu, máy laser điều trị.',
500000, '00:25:00', 1, 13, N'dichvu_24.jpg', 4.8, 12),

(N'Khám Răng Hàm Mặt',
N'Thăm khám và chẩn đoán các bệnh lý về răng, nướu, hàm và mặt. Tư vấn và đưa ra phương pháp điều trị phù hợp.',
N'1. Khai thác tiền sử bệnh lý răng miệng.\n2. Khám tổng quát tình trạng răng, nướu, hàm.\n3. Chụp X-quang răng nếu cần thiết.\n4. Tư vấn phương án điều trị như trám răng, nhổ răng, chữa tủy, chỉnh nha,...',
N'Sử dụng dụng cụ khám răng chuyên dụng, máy chụp X-quang răng kỹ thuật số.',
400000, '00:20:00', 1, 18, N'dichvu_25.jpg', 4.7, 15);


    



-------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE DoctorSchedules (
   DoctorScheduleId INT NOT NULL IDENTITY(1,1),
   DoctorId INT NOT NULL,
   ServiceId INT NOT NULL,
   DayOfWeek NVARCHAR(10) NOT NULL,
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
(33, 2, N'Thứ Hai', 1, 1),
(33, 3, N'Thứ Hai', 2, 2),
(33, 4, N'Thứ Hai', 3, 3),
(33, 5, N'Thứ Hai', 4, 4),
(33, 6, N'Thứ Hai', 5, 5),
(34, 7, N'Thứ Hai', 6, 6),
(34, 8, N'Thứ Hai', 7, 7),
(34, 9, N'Thứ Hai', 8, 8),
(34, 10, N'Thứ Ba', 1, 9),
(34, 11, N'Thứ Ba', 2, 10),
(35, 12, N'Thứ Ba', 3, 11),
(35, 13, N'Thứ Ba', 4, 12),
(35, 14, N'Thứ Ba', 5, 13),
(35, 15, N'Thứ Ba', 6, 14),
(36, 16, N'Thứ Ba', 7, 15),
(36, 17, N'Thứ Ba', 8, 16),
(36, 18, N'Thứ Tư', 1, 17),
(36, 19, N'Thứ Tư', 2, 18),
(37, 20, N'Thứ Tư', 3, 19),
(37, 1, N'Thứ Tư', 4, 1),
(37, 2, N'Thứ Tư', 5, 2),
(37, 3, N'Thứ Tư', 6, 3),
(38, 4, N'Thứ Tư', 7, 4),
(38, 5, N'Thứ Tư', 8, 5),
(38, 6, N'Thứ Năm', 1, 6),
(38, 7, N'Thứ Năm', 2, 7),
(39, 8, N'Thứ Năm', 3, 8),
(39, 9, N'Thứ Năm', 4, 9),
(39, 10, N'Thứ Năm', 5, 10),
(39, 11, N'Thứ Năm', 6, 11),
(40, 12, N'Thứ Năm', 7, 12),
(40, 13, N'Thứ Năm', 8, 13),
(40, 14, N'Thứ Sáu', 1, 14),
(40, 15, N'Thứ Sáu', 2, 15),
(41, 16, N'Thứ Sáu', 3, 16),
(41, 17, N'Thứ Sáu', 4, 17),
(41, 18, N'Thứ Sáu', 5, 18),
(41, 19, N'Thứ Sáu', 6, 19),
(42, 20, N'Thứ Sáu', 7, 1),
(42, 1, N'Thứ Sáu', 8, 2),
(42, 2, N'Thứ Bảy', 1, 3),
(42, 3, N'Thứ Bảy', 2, 4),
(43, 4, N'Thứ Bảy', 3, 5),
(43, 5, N'Thứ Bảy', 4, 6),
(43, 6, N'Thứ Bảy', 5, 7),
(43, 7, N'Thứ Bảy', 6, 8),
(44, 8, N'Thứ Bảy', 7, 9),
(44, 9, N'Thứ Bảy', 8, 10),
(44, 10, N'Thứ Hai', 1, 11),
(44, 11, N'Thứ Hai', 2, 12),
(45, 12, N'Thứ Hai', 3, 13),
(45, 13, N'Thứ Hai', 4, 14),
(45, 14, N'Thứ Hai', 5, 15),
(45, 15, N'Thứ Hai', 6, 16),
(46, 16, N'Thứ Hai', 7, 17),
(46, 17, N'Thứ Hai', 8, 18),
(46, 18, N'Thứ Ba', 1, 19),
(46, 19, N'Thứ Ba', 2, 1),
(47, 20, N'Thứ Ba', 3, 2),
(47, 1, N'Thứ Ba', 4, 3),
(47, 2, N'Thứ Ba', 5, 4),
(47, 3, N'Thứ Ba', 6, 5),
(48, 4, N'Thứ Ba', 7, 6),
(48, 5, N'Thứ Ba', 8, 7),
(48, 6, N'Thứ Tư', 1, 8),
(48, 7, N'Thứ Tư', 2, 9),
(49, 8, N'Thứ Tư', 3, 10),
(49, 9, N'Thứ Tư', 4, 11),
(49, 10, N'Thứ Tư', 5, 12),
(49, 11, N'Thứ Tư', 6, 13),
(50, 12, N'Thứ Tư', 7, 14),
(50, 13, N'Thứ Tư', 8, 15),
(50, 14, N'Thứ Năm', 1, 16),
(50, 15, N'Thứ Năm', 2, 17),
(51, 16, N'Thứ Năm', 3, 18),
(51, 17, N'Thứ Năm', 4, 19),
(51, 18, N'Thứ Năm', 5, 1),
(51, 19, N'Thứ Năm', 6, 2),
(52, 20, N'Thứ Năm', 7, 3),
(52, 1, N'Thứ Năm', 8, 4),
(52, 2, N'Thứ Sáu', 1, 5),
(52, 3, N'Thứ Sáu', 2, 6),
(33, 4, N'Thứ Sáu', 3, 7),
(33, 5, N'Thứ Sáu', 4, 8),
(34, 6, N'Thứ Sáu', 5, 9),
(34, 7, N'Thứ Sáu', 6, 10),
(35, 8, N'Thứ Sáu', 7, 11),
(35, 9, N'Thứ Sáu', 8, 12),
(36, 10, N'Thứ Bảy', 1, 13),
(36, 11, N'Thứ Bảy', 2, 14),
(37, 12, N'Thứ Bảy', 3, 15),
(37, 13, N'Thứ Bảy', 4, 16),
(38, 14, N'Thứ Bảy', 5, 17),
(38, 15, N'Thứ Bảy', 6, 18),
(39, 16, N'Thứ Bảy', 7, 19),
(39, 17, N'Thứ Bảy', 8, 1);

---------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Reservations (
  ReservationId int NOT NULL IDENTITY(1,1),
  PatientId int NOT NULL,
  DoctorScheduleId int NOT NULL,
  Reason nvarchar(max),
  PriorExaminationImg nvarchar(200) NULL,
  AppointmentDate datetime NOT NULL,
  Status nvarchar(20) NOT NULL,
  CancellationReason nvarchar(255) NULL,
  CreatedDate datetime NOT NULL DEFAULT GETDATE(),
  CreatedByUserId int NOT NULL,
  UpdatedDate datetime NOT NULL DEFAULT GETDATE(),
  UpdatedByUserId int NOT NULL,
  PRIMARY KEY (ReservationId),
  CONSTRAINT PatientId_FK FOREIGN KEY (PatientId) REFERENCES Patients (PatientId),
  CONSTRAINT DoctorScheduleId_FK FOREIGN KEY (DoctorScheduleId) REFERENCES DoctorSchedules (DoctorScheduleId),
  CONSTRAINT CreatedByUser_FK FOREIGN KEY (CreatedByUserId) REFERENCES Users(UserId),
  CONSTRAINT UpdatedByUser_FK FOREIGN KEY (UpdatedByUserId) REFERENCES Users(UserId)
);

INSERT INTO Reservations (PatientId, DoctorScheduleId, Reason, PriorExaminationImg, AppointmentDate, Status, CancellationReason,CreatedByUserId, UpdatedByUserId
)
VALUES
(1, 1, N'Muốn khám', N'lichhen1_benhnhan1_phacdotruoc.jpg', '2025-01-10', N'Hoàn thành', NULL, 1, 31),
(1, 2, N'Tái khám', N'lichhen2_benhnhan1_phacdotruoc.jpg', '2025-01-15',  N'Hoàn thành', NULL, 1, 32),
(1, 3, N'Muốn khám', NULL, '2025-08-20',  N'Đang chờ', NULL, 1, 31),
(1, 4, N'Không khỏe', NULL, '2025-01-19',  N'Xác nhận', NULL, 1, 32),
(1, 5, N'Cần kiểm tra sức khỏe', NULL, '2025-08-27',  N'Đang chờ', NULL, 1, 31),
(1, 6, N'Cần tư vấn', NULL, '2025-01-23',  N'Xác nhận', NULL, 1, 32),
(1, 7, N'Tái khám', NULL, '2025-01-17',  N'Xác nhận', NULL, 1, 31),
(1, 8, N'Muốn khám', NULL, '2025-01-18',  N'Đã hủy', N'Bệnh nhân hủy', 1, 32),
(1, 9, N'Cần tư vấn', NULL, '2025-01-20',  N'Không đến', NULL, 1, 31),
(1, 10, N'Muốn khám', NULL, '2025-01-21',  N'Xác nhận', NULL, 1, 32),
(1, 11, N'Không khỏe', NULL, '2025-08-22',  N'Đang chờ', NULL, 1, 31),
(1, 12, N'Muốn khám', NULL, '2025-01-24',  N'Đã hủy', N'Bệnh nhân hủy', 1, 32),
(1, 13, N'Cần kiểm tra sức khỏe', NULL, '2025-01-25',  N'Hoàn thành', NULL, 1, 31),
(1, 14, N'Không khỏe', NULL, '2025-01-26', N'Không đến', NULL, 1, 32),
(1, 15, N'Muốn khám', NULL, '2025-08-28',  N'Đang chờ', NULL, 1, 31),

-- Patient 11 (do bệnh nhân tự đặt lịch)
(11, 21, N'Muốn khám', NULL, '2025-02-05',  N'Xác nhận', NULL, 11, 11),
(11, 22, N'Cần kiểm tra', NULL, '2025-02-06',  N'Hoàn thành', NULL, 11, 11),
(11, 23, N'Cần tư vấn', NULL, '2025-02-07',  N'Đang chờ', NULL, 11, 11),

-- Patient 12 (do tiếp tân đặt - id 31)
(12, 24, N'Thấy không ổn', NULL, '2025-02-08',  N'Xác nhận', NULL, 31, 31),
(12, 25, N'Kiểm tra định kỳ', NULL, '2025-02-09',  N'Đã hủy', N'Bệnh nhân bận đột xuất', 31, 31),
(12, 26, N'Cần gặp bác sĩ', NULL, '2025-02-10',  N'Không đến', NULL, 31, 31),

-- Patient 13 (do bệnh nhân tự đặt lịch)
(13, 27, N'Khám sức khỏe', NULL, '2025-02-11',  N'Hoàn thành', NULL, 13, 13),
(13, 28, N'Làm xét nghiệm', NULL, '2025-02-12',  N'Xác nhận', NULL, 13, 13),
(13, 29, N'Cảm thấy khó chịu', NULL, '2025-02-13',  N'Đang chờ', NULL, 13, 13),

-- Patient 14 (do tiếp tân đặt - id 32)
(14, 30, N'Muốn kiểm tra', NULL, '2025-02-14',  N'Xác nhận', NULL, 32, 32),
(14, 1, N'Cần tư vấn', NULL, '2025-02-15',  N'Hoàn thành', NULL, 32, 32),
(14, 2, N'Khám định kỳ', NULL, '2025-02-16',  N'Đã hủy', N'Bác sĩ nghỉ đột xuất', 32, 32),

-- Patient 15
(15, 3, N'Muốn kiểm tra', NULL, '2025-02-17',  N'Xác nhận', NULL, 15, 31),
(15, 4, N'Kiểm tra thính lực', NULL, '2025-02-18',  N'Không đến', NULL, 15, 32),
(15, 5, N'Tư vấn sức khỏe', NULL, '2025-02-19',  N'Đang chờ', NULL, 15, 31),

-- Patient 16
(16, 6, N'Muốn kiểm tra sức khỏe', NULL, '2025-02-20',  N'Xác nhận', NULL, 16, 32),
(16, 7, N'Cảm thấy không ổn', NULL, '2025-02-21',  N'Hoàn thành', NULL, 16, 31),
(16, 8, N'Cần tư vấn sức khỏe', NULL, '2025-02-22',  N'Đã hủy', N'Bệnh nhân chuyển lịch', 16, 32),

-- Patient 17
(17, 9, N'Muốn khám tổng quát', NULL, '2025-02-23',  N'Xác nhận', NULL, 17, 31),
(17, 10, N'Đi kiểm tra định kỳ', NULL, '2025-02-24',  N'Không đến', NULL, 17, 32),
(17, 11, N'Không rõ triệu chứng, muốn kiểm tra', NULL, '2025-02-25',  N'Đang chờ', NULL, 17, 31),

-- Patient 18
(18, 12, N'Cảm thấy mệt mỏi', NULL, '2025-02-26',  N'Xác nhận', NULL, 18, 32),
(18, 13, N'Muốn kiểm tra để yên tâm', NULL, '2025-02-27',  N'Hoàn thành', NULL, 18, 31),
(18, 14, N'Cần tư vấn thêm', NULL, '2025-02-28',  N'Đã hủy', N'Bệnh nhân khỏi bệnh', 18, 32),


-- Patient 19
(19, 15, N'Muốn kiểm tra tổng quát', NULL, '2025-03-01',  N'Xác nhận', NULL, 19, 31),
(19, 16, N'Cảm thấy không khỏe', NULL, '2025-03-02',  N'Không đến', NULL, 19, 32),
(19, 17, N'Khó chịu trong người', NULL, '2025-03-03',  N'Đang chờ', NULL, 19, 31),

-- Patient 20
(20, 18, N'Muốn kiểm tra sức khỏe', NULL, '2025-03-04',  N'Xác nhận', NULL, 20, 32),
(20, 19, N'Muốn khám để yên tâm', NULL, '2025-03-05', N'Hoàn thành', NULL, 20, 31),
(20, 20, N'Cần khám lại', NULL, '2025-03-06',  N'Đã hủy', N'Bệnh nhân nhập viện', 20, 32),

-- Bệnh nhân 21
(21, 1, N'Muốn khám', NULL, '2025-03-07',  N'Hoàn thành', NULL, 21, 31),
(21, 3, N'Cần kiểm tra', NULL, '2025-03-10',  N'Xác nhận', NULL, 21, 32),
(21, 5, N'Cần tư vấn', NULL, '2025-03-15',  N'Đang chờ', NULL, 21, 31),

-- Bệnh nhân 22
(22, 7, N'Thấy không ổn', NULL, '2025-03-08',  N'Xác nhận', NULL, 22, 31),
(22, 9, N'Kiểm tra định kỳ', NULL, '2025-03-12',  N'Đã hủy', N'Bệnh nhân đi công tác', 22, 32),
(22, 11, N'Cần gặp bác sĩ', NULL, '2025-03-18', N'Không đến', NULL, 22, 31),

-- Bệnh nhân 23
(23, 16, N'Muốn khám', NULL, '2025-01-29',  N'Không đến', NULL, 23, 31),
(23, 17, N'Cần tư vấn', NULL, '2025-01-30',  N'Xác nhận', NULL, 23, 32),
(23, 18, N'Khám sức khỏe', NULL, '2025-02-02',  N'Đã hủy', N'Bệnh nhân hủy', 23, 31),
(23, 19, N'Cảm thấy mệt', NULL, '2025-02-03',  N'Không đến', NULL, 23, 32),
(23, 20, N'Cần kiểm tra', NULL, '2025-02-04',  N'Xác nhận', NULL, 23, 31),

-- Bệnh nhân 24
(24, 13, N'Khám tổng quát', NULL, '2025-03-09',  N'Hoàn thành', NULL, 24, 32),
(24, 15, N'Làm xét nghiệm', NULL, '2025-03-14',  N'Xác nhận', NULL, 24, 31),
(24, 17, N'Cần kiểm tra', NULL, '2025-03-20',  N'Đang chờ', NULL, 24, 32),

-- Bệnh nhân 25
(25, 19, N'Muốn khám', NULL, '2025-03-11', N'Xác nhận', NULL, 25, 31),
(25, 21, N'Cần tư vấn', NULL, '2025-03-16', N'Hoàn thành', NULL, 25, 32),
(25, 23, N'Khám định kỳ', NULL, '2025-03-22',  N'Đã hủy', N'Bác sĩ nghỉ ốm', 25, 31),

-- Bệnh nhân 26
(26, 25, N'Khám phụ khoa', NULL, '2025-03-13',  N'Xác nhận', NULL, 26, 32),
(26, 27, N'Kiểm tra', NULL, '2025-03-17', N'Không đến', NULL, 26, 31),
(26, 29, N'Tư vấn sức khỏe', NULL, '2025-03-24',  N'Đang chờ', NULL, 26, 32),

-- Bệnh nhân 27
(27, 2, N'Muốn khám', NULL, '2025-03-19',  N'Xác nhận', NULL, 27, 31),
(27, 4, N'Cần chụp chiếu', NULL, '2025-03-23',  N'Hoàn thành', NULL, 27, 32),
(27, 6, N'Cần tư vấn', NULL, '2025-03-27',  N'Đã hủy', N'Bệnh nhân chuyển viện', 27, 31),

-- Bệnh nhân 28
(28, 8, N'Khám mắt', NULL, '2025-03-21',  N'Xác nhận', NULL, 28, 32),
(28, 10, N'Kiểm tra', NULL, '2025-03-25',  N'Không đến', NULL, 28, 31),
(28, 12, N'Tư vấn', NULL, '2025-03-29',  N'Đang chờ', NULL, 28, 32),

-- Bệnh nhân 29
(29, 14, N'Khám tổng quát', NULL, '2025-03-26',  N'Xác nhận', NULL, 29, 31),
(29, 16, N'Làm xét nghiệm', NULL, '2025-03-30',  N'Hoàn thành', NULL, 29, 32),
(29, 18, N'Cần tư vấn', NULL, '2025-04-02',  N'Đã hủy', N'Bệnh nhân hết bệnh', 29, 31),

-- Bệnh nhân 30
(30, 20, N'Muốn khám', NULL, '2025-03-28',  N'Xác nhận', NULL, 30, 32),
(30, 22, N'Cần kiểm tra', NULL, '2025-04-01',  N'Không đến', NULL, 30, 31),
(30, 24, N'Tư vấn', NULL, '2025-04-03',  N'Đang chờ', NULL, 30, 32);


-----------------------------------------------------------------------------------------------------------------------------------
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
(1, 33),  
(1, 34), 
(1, 35), 
(2, 33),  
(3, 33),  
(4, 33), 

(2, 36),  
(2, 37),  
(2, 38),  

(8, 39),  
(9, 40),  
(10, 41), 
(11, 42), 
(12, 43), 
(13, 44), 
(14, 45), 
(15, 46), 
(16, 47), 
(17, 48), 
(18, 49), 
(19, 50), 
(20, 51);



-------------------------------------------------------------------------------------------------------------------------


CREATE TABLE MedicalRecords (
  ReservationId INT NOT NULL,  
  Symptoms NVARCHAR(MAX), 
  Diagnosis NVARCHAR(MAX), 
  TreatmentPlan NVARCHAR(MAX), 
  FollowUpDate DATETIME NULL, 
  Notes NVARCHAR(MAX) NULL, 
  CreatedAt DATETIME NOT NULL DEFAULT GETDATE(), 
  PRIMARY KEY (ReservationId), 
  CONSTRAINT FK_ReservationId FOREIGN KEY (ReservationId) REFERENCES Reservations(ReservationId) ON DELETE CASCADE
);


INSERT INTO MedicalRecords (ReservationId, Symptoms, Diagnosis, TreatmentPlan, FollowUpDate, Notes)
VALUES
-- Reservation 1 (Patient 1 - Tư vấn tiểu đường)
(1, N'Khát nước nhiều, đi tiểu thường xuyên, mệt mỏi', N'Tiểu đường type 2', N'Dùng thuốc Metformin 500mg 2 lần/ngày, kiểm tra đường huyết hàng ngày', '2025-02-10', N'Bệnh nhân cần giảm 5kg và tập thể dục 30 phút/ngày'),

-- Reservation 2 (Patient 1 - Khám định kỳ)
(2, N'Không có triệu chứng đặc biệt', N'Sức khỏe tổng quát tốt', N'Tiếp tục duy trì lối sống lành mạnh', NULL, N'Huyết áp 120/80, BMI 22.5 - trong giới hạn bình thường'),

-- Reservation 13 (Patient 1 - Tiêm chủng)
(13, N'Tiêm phòng cúm mùa', N'Tiêm phòng định kỳ', N'Tiêm vaccine cúm mùa 2025', NULL, N'Bệnh nhân không có phản ứng phụ sau tiêm'),

-- Reservation 11 (Patient 11 - Kiểm tra huyết áp)
(11, N'Huyết áp cao khi đo tại nhà (150/95)', N'Tăng huyết áp giai đoạn 1', N'Dùng thuốc Amlodipine 5mg/ngày, hạn chế muối', '2025-03-06', N'Theo dõi huyết áp 2 lần/ngày và ghi chép lại'),

-- Reservation 14 (Patient 14 - Tư vấn tiểu đường)
(14, N'Đường huyết đói 8.2 mmol/L', N'Tiểu đường type 2 chưa ổn định', N'Điều chỉnh liều Metformin lên 850mg 2 lần/ngày', '2025-03-15', N'Cần kiểm tra HbA1c trong lần tái khám'),

-- Reservation 16 (Patient 16 - Chụp X-quang)
(16, N'Đau lưng dưới sau khi mang vác nặng', N'Thoái hóa cột sống thắt lưng L4-L5', N'Vật lý trị liệu 3 lần/tuần, dùng thuốc giảm đau khi cần', '2025-03-21', N'Tránh mang vác nặng, tập các bài tập hỗ trợ cột sống'),

(17, 'Đau vùng thắt lưng', 'Thoái hóa cột sống thắt lưng L4-L5', 'Vật lý trị liệu 3 lần/tuần, dùng thuốc giảm đau khi cần', '2025-03-21', 'Tránh mang vác nặng, tập các bài tập hỗ trợ cột sống'),

-- Reservation 18 (Patient 18 - Xét nghiệm nước tiểu)
(18, N'Tiểu buốt, tiểu rắt', N'Nhiễm trùng đường tiểu', N'Dùng kháng sinh Ciprofloxacin 500mg 2 lần/ngày trong 7 ngày', '2025-03-27', N'Uống nhiều nước, tái khám nếu triệu chứng không giảm'),

-- Reservation 20 (Patient 20 - Siêu âm tim)
(20, N'Hồi hộp, đánh trống ngực', N'Rối loạn nhịp xoang', N'Theo dõi thêm, hạn chế caffeine', '2025-04-05', N'Ghi lại nhật ký các cơn hồi hộp và thời điểm xảy ra'),

-- Reservation 21 (Patient 21 - Khám viêm họng)
(21, N'Đau họng, sốt nhẹ 37.8°C', N'Viêm họng cấp', N'Dùng thuốc hạ sốt khi sốt >38.5°C, súc họng nước muối', '2025-03-17', N'Bệnh nhân đã được test nhanh loại trừ COVID-19'),

(22, N'Đau đầu, chóng mặt', N'Mất nước, thiếu ngủ', N'Uống nước, nghỉ ngơi, tránh căng thẳng', '2025-03-22', N'Khuyến nghị nghỉ ngơi và bổ sung nước đầy đủ'),

-- Reservation 24 (Patient 24 - Khám tổng quát)
(24, N'Khám sức khỏe tổng quát định kỳ', N'Sức khỏe tốt, cholesterol hơi cao', N'Điều chỉnh chế độ ăn ít chất béo, tăng cường rau xanh', NULL, N'HDL 45, LDL 130 - cần theo dõi'),

-- Reservation 25 (Patient 25 - Tư vấn tiểu đường)
(25, N'Đường huyết sau ăn 2h thường xuyên >10mmol/L', N'Tiểu đường type 2', N'Bắt đầu dùng thuốc Metformin 500mg/ngày, tái khám sau 2 tuần', '2025-04-02', N'Hướng dẫn bệnh nhân cách tự theo dõi đường huyết tại nhà'),

-- Reservation 29 (Patient 29 - Xét nghiệm nước tiểu)
(29, N'Khám sức khỏe định kỳ', N'Xét nghiệm nước tiểu bình thường', N'Duy trì chế độ sinh hoạt hiện tại', NULL, N'Protein niệu âm tính, không có bạch cầu trong nước tiểu'),

-- Reservation 30 (Patient 30 - Khám hô hấp)
(30, N'Ho khan kéo dài 3 tuần', N'Viêm phế quản cấp', N'Dùng thuốc giảm ho, kháng sinh nếu có bội nhiễm', '2025-04-10', N'Kê đơn kháng sinh dự phòng nếu triệu chứng không cải thiện sau 5 ngày');
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Feedbacks (
  FeedbackId INT NOT NULL IDENTITY(1,1),
  ReservationId INT NOT NULL UNIQUE,
  ServiceFeedbackContent NVARCHAR(MAX) NOT NULL,
  ServiceFeedbackGrade INT, 
  DoctorFeedbackContent NVARCHAR(MAX) NOT NULL,
  DoctorFeedbackGrade INT, 
  FeedbackDate DATETIME NOT NULL,
  PRIMARY KEY (FeedbackId),
  CONSTRAINT ReservationId_FK FOREIGN KEY (ReservationId) REFERENCES Reservations (ReservationId)
);

INSERT INTO Feedbacks (ReservationId, ServiceFeedbackContent, ServiceFeedbackGrade, DoctorFeedbackContent, DoctorFeedbackGrade, FeedbackDate)
VALUES
(1, N'Dịch vụ tốt, rất chuyên nghiệp.', 5, N'Bác sĩ tận tình và giải thích rõ ràng.', 5, '2025-01-15 11:00:00'),
(2, N'Thời gian chờ hơi lâu, nhưng dịch vụ ổn.', 4, N'Bác sĩ hữu ích, nhưng có thể giải thích kỹ hơn.', 4, '2025-01-16 12:00:00'),
(3, N'Dịch vụ xuất sắc, rất đáng giới thiệu.', 5, N'Bác sĩ kiểm tra kỹ lưỡng và tư vấn tốt.', 5, '2025-01-17 15:00:00'),
(4, N'Dịch vụ không đạt yêu cầu, phải chờ quá lâu.', 2, N'Bác sĩ không chú ý và khám qua loa.', 2, '2025-01-18 09:00:00'),
(5, N'Nhân viên thân thiện, trải nghiệm tuyệt vời.', 5, N'Bác sĩ rất ân cần và điều trị tốt.', 5, '2025-01-19 14:00:00'),
(6, N'Dịch vụ tạm ổn, cần cải thiện thêm.', 3, N'Bác sĩ dễ chịu, nhưng tư vấn quá ngắn.', 3, '2025-01-20 16:00:00'),
(7, N'Dịch vụ tuyệt vời, sẽ quay lại.', 5, N'Bác sĩ rất giỏi và đưa ra khuyến nghị hữu ích.', 5, '2025-01-21 16:30:00'),
(8, N'Dịch vụ ổn, nhưng không có gì đặc biệt.', 3, N'Bác sĩ ít tương tác trong buổi tư vấn.', 3, '2025-01-22 17:00:00'),
(9, N'Dịch vụ nhanh chóng và chuyên nghiệp.', 5, N'Bác sĩ rất chuyên nghiệp và am hiểu.', 5, '2025-01-23 10:00:00'),
(10, N'Không hài lòng, cảm giác vội vàng.', 2, N'Bác sĩ không quan tâm đến lo lắng của tôi.', 2, '2025-01-24 11:30:00'),
(11, N'Dịch vụ rất tốt, nhân viên nhiệt tình.', 5, N'Bác sĩ chẩn đoán chính xác và tư vấn rõ ràng.', 5, '2025-01-25 14:30:00'),
(12, N'Phòng khám sạch sẽ nhưng thủ tục hơi rườm rà.', 4, N'Bác sĩ có chuyên môn nhưng hơi vội.', 4, '2025-01-26 15:00:00'),
(13, N'Trải nghiệm tốt từ đăng ký đến khám bệnh.', 5, N'Bác sĩ rất tận tâm với bệnh nhân.', 5, '2025-01-27 10:30:00'),
(14, N'Thời gian chờ đợi quá dài.', 2, N'Bác sĩ không giải thích kỹ về tình trạng bệnh.', 2, '2025-01-28 11:45:00'),
(15, N'Dịch vụ chu đáo, rất hài lòng.', 5, N'Bác sĩ có trình độ cao và thái độ tốt.', 5, '2025-01-29 16:00:00'),
(16, N'Cơ sở vật chất tốt nhưng giá hơi cao.', 3, N'Bác sĩ khám kỹ nhưng ít tương tác.', 3, '2025-01-30 09:15:00'),
(17, N'Quy trình nhanh gọn, tiết kiệm thời gian.', 5, N'Bác sĩ tư vấn nhiệt tình và dễ hiểu.', 5, '2025-01-31 14:20:00'),
(18, N'Dịch vụ bình thường, không có gì nổi bật.', 3, N'Bác sĩ làm việc đúng quy trình.', 3, '2025-02-01 15:30:00'),
(19, N'Rất hài lòng với chất lượng dịch vụ.', 5, N'Bác sĩ giàu kinh nghiệm và ân cần.', 5, '2025-02-02 10:45:00'),
(20, N'Không hài lòng với thái độ nhân viên.', 1, N'Bác sĩ thiếu kiên nhẫn với bệnh nhân.', 2, '2025-02-03 11:00:00'),
(21, N'Dịch vụ tốt, đúng giờ hẹn.', 4, N'Bác sĩ giải thích dễ hiểu và tận tâm.', 5, '2025-02-04 13:15:00'),
(22, N'Phòng chờ thoải mái, nhân viên lịch sự.', 4, N'Bác sĩ chuyên nghiệp và chu đáo.', 4, '2025-02-05 14:30:00'),
(23, N'Thủ tục đơn giản, nhanh chóng.', 5, N'Bác sĩ có chuyên môn cao.', 5, '2025-02-06 09:45:00'),
(24, N'Chờ lâu hơn dự kiến.', 3, N'Bác sĩ bận rộn nhưng vẫn đảm bảo chất lượng.', 4, '2025-02-07 16:15:00'),
(25, N'Dịch vụ vượt ngoài mong đợi.', 5, N'Bác sĩ rất tâm huyết với nghề.', 5, '2025-02-08 10:00:00'),
(26, N'Cần cải thiện thời gian chờ đợi.', 3, N'Bác sĩ khám kỹ nhưng hơi nghiêm nghị.', 3, '2025-02-09 11:30:00'),
(27, N'Trải nghiệm tuyệt vời từ A đến Z.', 5, N'Bác sĩ giỏi và có tâm với bệnh nhân.', 5, '2025-02-10 14:00:00'),
(28, N'Dịch vụ ổn nhưng giá cao.', 3, N'Bác sĩ làm việc chuyên nghiệp.', 4, '2025-02-11 15:45:00'),
(29, N'Nhân viên thân thiện, nhiệt tình.', 5, N'Bác sĩ tư vấn kỹ lưỡng và dễ hiểu.', 5, '2025-02-12 09:30:00'),
(30, N'Cơ sở vật chất cần nâng cấp thêm.', 3, N'Bác sĩ có kiến thức chuyên môn tốt.', 4, '2025-02-13 16:30:00'),
(31, N'Dịch vụ nhanh chóng, hiệu quả.', 5, N'Bác sĩ rất am hiểu về chuyên môn.', 5, '2025-02-14 10:15:00'),
(32, N'Thủ tục rườm rà, mất nhiều thời gian.', 2, N'Bác sĩ khám qua loa, không kỹ.', 2, '2025-02-15 11:45:00'),
(33, N'Phòng khám sạch sẽ, tiện nghi.', 4, N'Bác sĩ tư vấn rõ ràng và chi tiết.', 5, '2025-02-16 14:20:00'),
(34, N'Dịch vụ tốt nhưng đông bệnh nhân.', 4, N'Bác sĩ bận nhưng vẫn đảm bảo chất lượng.', 4, '2025-02-17 15:30:00'),
(35, N'Rất hài lòng với chất lượng phục vụ.', 5, N'Bác sĩ có tâm và trình độ cao.', 5, '2025-02-18 09:00:00'),
(36, N'Thời gian chờ đợi quá lâu.', 2, N'Bác sĩ làm việc thiếu tập trung.', 2, '2025-02-19 16:45:00'),
(37, N'Dịch vụ chuyên nghiệp, đáng tiền.', 5, N'Bác sĩ tận tâm với từng bệnh nhân.', 5, '2025-02-20 10:30:00'),
(38, N'Cần cải thiện thái độ nhân viên.', 3, N'Bác sĩ có chuyên môn nhưng thiếu nhiệt tình.', 3, '2025-02-21 14:15:00'),
(39, N'Trải nghiệm khám bệnh tốt nhất từ trước đến nay.', 5, N'Bác sĩ xuất sắc về cả chuyên môn và thái độ.', 5, '2025-02-22 11:00:00'),
(40, N'Dịch vụ tạm được, giá cả hợp lý.', 3, N'Bác sĩ làm việc đúng quy trình.', 3, '2025-02-23 15:00:00'),
(41, N'Dịch vụ tốt, đáng đồng tiền.', 4, N'Bác sĩ có nhiều kinh nghiệm.', 5, '2025-02-24 09:45:00'),
(42, N'Nhân viên tiếp đón chưa nhiệt tình.', 3, N'Bác sĩ tư vấn kỹ nhưng hơi khó hiểu.', 3, '2025-02-25 16:20:00'),
(43, N'Quy trình đơn giản, tiết kiệm thời gian.', 5, N'Bác sĩ rất kiên nhẫn với bệnh nhân.', 5, '2025-02-26 10:15:00'),
(44, N'Phòng khám đông đúc, ồn ào.', 2, N'Bác sĩ làm việc vội vàng.', 2, '2025-02-27 14:30:00'),
(45, N'Dịch vụ hoàn hảo từ A đến Z.', 5, N'Bác sĩ tận tâm và chu đáo.', 5, '2025-02-28 11:45:00'),
(46, N'Thủ tục rắc rối, mất nhiều thời gian.', 2, N'Bác sĩ không giải thích rõ về bệnh.', 2, '2025-03-01 15:15:00'),
(47, N'Cơ sở vật chất hiện đại, sạch sẽ.', 5, N'Bác sĩ có chuyên môn cao và thái độ tốt.', 5, '2025-03-02 09:30:00'),
(48, N'Dịch vụ ổn nhưng cần cải thiện thời gian chờ.', 3, N'Bác sĩ làm việc chuyên nghiệp.', 4, '2025-03-03 16:00:00'),
(49, N'Nhân viên nhiệt tình, thân thiện.', 5, N'Bác sĩ tư vấn rất dễ hiểu và hữu ích.', 5, '2025-03-04 10:45:00'),
(50, N'Không hài lòng với chất lượng dịch vụ.', 1, N'Bác sĩ thiếu kinh nghiệm trong chẩn đoán.', 2, '2025-03-05 14:00:00');


--------------------------------------------------------------------------------------------------
CREATE TABLE Posts (
  PostId INT NOT NULL IDENTITY(1,1),
  PostAuthorId INT DEFAULT NULL,
  PostTitle NVARCHAR(200) NOT NULL,
  PostDescription NVARCHAR(MAX) NOT NULL,
  PostCreatedDate DATETIME NOT NULL,
  PostSourceUrl VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (PostId),
  CONSTRAINT Post_FK FOREIGN KEY (PostAuthorId) REFERENCES Doctors (DoctorId)
);

INSERT INTO Posts (PostAuthorId, PostTitle, PostDescription, PostCreatedDate, PostSourceUrl)
VALUES 

(33, N'Top 5 liệu trình chăm sóc da mặt tại nhà', N'Hướng dẫn chi tiết cách chăm sóc da mặt tại nhà hiệu quả.', '2025-03-12 08:00:00', 'https://example.com/bai-viet/cham-soc-da-mat'),
(34, N'Phương pháp giảm cân an toàn', N'Giới thiệu các phương pháp giảm cân không ảnh hưởng đến sức khỏe.', '2025-03-13 10:45:00', 'https://example.com/bai-viet/giam-can-an-toan'),
(35, N'Bí quyết dưỡng tóc chắc khỏe', N'Mẹo chăm sóc tóc mềm mượt và chắc khỏe.', '2025-03-14 15:20:00', 'https://example.com/bai-viet/duong-toc'),
(36, N'Những thực phẩm giúp đẹp da', N'Thực phẩm tự nhiên giúp cải thiện làn da từ bên trong.', '2025-03-15 12:10:00', 'https://example.com/bai-viet/thuc-pham-dep-da'),
(37, N'Làm thế nào để trị mụn hiệu quả?', N'Giải pháp trị mụn từ thiên nhiên và công nghệ.', '2025-03-16 09:30:00', 'https://example.com/bai-viet/tri-mun'),
(38, N'Cách chăm sóc da mùa đông', N'Bí quyết giúp da luôn mềm mại và không bị khô ráp vào mùa đông.', '2025-03-17 11:00:00', 'https://example.com/bai-viet/cham-soc-da-mua-dong'),
(39, N'Phương pháp massage mặt tại nhà', N'Các kỹ thuật massage mặt giúp giảm nếp nhăn và thư giãn.', '2025-03-18 13:50:00', 'https://example.com/bai-viet/massage-mat'),
(40, N'Trẻ hóa da bằng công nghệ cao', N'Các phương pháp trẻ hóa da không xâm lấn hiệu quả.', '2025-03-19 10:15:00', 'https://example.com/bai-viet/tre-hoa-da');



------------------------------------------------------------------------------------------------------
CREATE TABLE PostSections (
  SectionId INT NOT NULL IDENTITY(1,1),
  PostId INT NOT NULL,
  SectionTitle NVARCHAR(200) NOT NULL,
  SectionContent NVARCHAR(MAX) NOT NULL,
  SectionIndex INT NOT NULL,
  PostImageUrl VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (SectionId),
  CONSTRAINT Section_FK1 FOREIGN KEY (PostId) REFERENCES Posts (PostId)
);

INSERT INTO PostSections (PostId, SectionTitle, SectionContent, SectionIndex, PostImageUrl)
VALUES 
-- Post 1
(1, N'Bệnh viện Thẩm mỹ Kangnam', 
N'- Tọa lạc tại số 123 Nguyễn Văn Linh, Quận 7, TP.HCM  
- Được trang bị hệ thống máy móc hiện đại nhập khẩu từ Hàn Quốc  
- Đội ngũ bác sĩ có hơn 15 năm kinh nghiệm trong lĩnh vực trị nám  
- Áp dụng công nghệ Laser Toning thế hệ mới nhất  
- Quy trình trị nám 5 bước tiêu chuẩn quốc tế  
- Cam kết hiệu quả rõ rệt sau 3 liệu trình', 
1, 'phan_1.jpg'),

(1, N'Bệnh viện Thẩm mỹ Việt Mỹ', 
N'- Địa chỉ: 45 Trần Duy Hưng, Cầu Giấy, Hà Nội  
- Chuyên khoa:  
  + Trị nám chuyên sâu  
  + Căng da mặt bằng chỉ sinh học  
  + Nâng mũi 3D không phẫu thuật  
- Ưu điểm vượt trội:  
  + Phòng phẫu thuật vô khuẩn đạt chuẩn Bộ Y tế  
  + Chế độ bảo hành dịch vụ lên đến 5 năm  
  + Hệ thống tư vấn trực tuyến 24/7', 
2, 'phan_2.jpg'),

-- Post 2
(2, N'Tiêu chí chọn bệnh viện uy tín', 
N'1. **Giấy phép hoạt động**:  
   - Phải có giấy phép của Sở Y tế cấp  
   - Chứng chỉ hành nghề của bác sĩ đầy đủ  

2. **Cơ sở vật chất**:  
   - Phòng khám đạt tiêu chuẩn vô trùng  
   - Thiết bị y tế được kiểm định thường xuyên  

3. **Kinh nghiệm bác sĩ**:  
   - Tối thiểu 5 năm kinh nghiệm chuyên môn  
   - Có chứng chỉ đào tạo từ nước ngoài  

4. **Phản hồi khách hàng**:  
   - Tỷ lệ hài lòng trên 90%  
   - Có hồ sơ bệnh án minh bạch', 
1, 'phan_3.jpg'),

(2, N'Tìm hiểu về các dịch vụ', 
N'**1. Dịch vụ thẩm mỹ không phẫu thuật**:  
   - Tiêm filler tạo góc cằm V-line  
   - Botox giảm nếp nhăn  
   - Nâng mũi bằng sợi collagen  

**2. Phẫu thuật thẩm mỹ**:  
   - Bơm mỡ tự thân  
   - Cắt mí mắt Hàn Quốc  
   - Hút mỡ nội soi  

**3. Chăm sóc da chuyên sâu**:  
   - Liệu trình trị nám Melas  
   - Cấy trắng da bằng tế bào gốc  
   - Peel da hoá học', 
2, 'phan_4.jpg'),

-- Post 3
(3, N'Liệu trình chăm sóc da cơ bản', 
N'**Buổi sáng**:  
1. Làm sạch với sữa rửa mặt pH cân bằng  
2. Toner cân bằng độ ẩm  
3. Serum vitamin C  
4. Kem dưỡng ẩm chứa HA  
5. Kem chống nắng SPF 50+  

**Buổi tối**:  
1. Tẩy trang 2 bước (dầu + nước)  
2. Sữa rửa mặt dịu nhẹ  
3. Tẩy da chết 2-3 lần/tuần  
4. Mặt nạ dưỡng ẩm  
5. Kem dưỡng ban đêm', 
1, 'phan_5.jpg'),

(3, N'Sử dụng mặt nạ tự nhiên', 
N'**1. Mặt nạ mật ong**:  
   - 2 thìa mật ong nguyên chất  
   - 1 thìa nước cốt chanh  
   - Thoa 20 phút, rửa sạch  

**2. Mặt nạ sữa chua**:  
   - 3 thìa sữa chua không đường  
   - 1 thìa bột yến mạch  
   - Đắp 15 phút  

**3. Mặt nạ trái cây**:  
   - 1/2 quả bơ chín  
   - 1 thìa dầu oliu  
   - Massage nhẹ nhàng 10 phút  

Lưu ý:  
- Test thử trên vùng da nhỏ trước khi đắp  
- Thực hiện 2-3 lần/tuần', 
2, 'phan_6.jpg'),

-- Post 4
(4, N'Tập luyện thể thao', 
N'**Cardio đốt mỡ**:  
- Chạy bộ: 30 phút/ngày  
- Nhảy dây: 3 hiệp, mỗi hiệp 100 cái  
- Leo cầu thang: 15 phút  

**Yoga giảm cân**:  
1. Tư thế chó úp mặt (30 giây)  
2. Tư thế chiến binh (mỗi bên 20 giây)  
3. Tư thế cái cây (giữ thăng bằng 1 phút)  

Lịch tập lý tưởng:  
- Sáng: 6h-7h  
- Chiều: 17h-18h  
- Nghỉ ngơi 2 ngày/tuần', 
1, 'phan_7.jpg'),

(4, N'Chế độ ăn uống lành mạnh',
N'**Nguyên tắc dinh dưỡng cơ bản:**
- Ăn đủ 3 bữa chính + 2 bữa phụ/ngày
- Uống 2-3 lít nước/ngày
- Hạn chế đường, muối, chất béo xấu

**Thực phẩm nên ưu tiên:**
✓ Rau xanh: cải bó xôi, bông cải xanh (300g/ngày)
✓ Ngũ cốc nguyên hạt: gạo lứt, yến mạch
✓ Protein lành mạnh: cá hồi, ức gà, đậu phụ
✓ Chất béo tốt: quả bơ, các loại hạt

**Thực đơn mẫu:**
🍳 Bữa sáng: 
- 1 bát cháo yến mạch + hạt chia
- 1 quả trứng luộc
- 1 ly sinh tố rau xanh

🍲 Bữa trưa:
- 1 chén cơm gạo lứt
- 150g cá hồi áp chảo
- Salad rau củ trộn dầu oliu

🥗 Bữa tối:
- Súp bí đỏ hạt sen
- Ức gà nướng
- Rau luộc

🍏 Bữa phụ:
- Các loại hạt
- Sữa chua không đường
- Trái cây ít ngọt', 
2, 'phan_8.jpg'),

-- Post 5
(5, N'Dưỡng tóc từ thiên nhiên',
N'**Công thức dưỡng tóc tại nhà:**

1. Mặt nạ dầu dừa:
- 3 thìa dầu dừa nguyên chất
- 1 thìa mật ong
- Ủ 30 phút, gội sạch
- Hiệu quả: Phục hồi tóc hư tổn

2. Mặt nạ bơ:
- 1/2 quả bơ chín
- 1 lòng đỏ trứng gà
- Ủ 20 phút
- Công dụng: Cung cấp độ ẩm

3. Mặt nạ nha đam:
- Lấy gel từ 1 lá nha đam
- Thêm 2 thìa dầu argan
- Massage da đầu 15 phút
- Lợi ích: Giảm gàu, kích thích mọc tóc

**Lịch chăm sóc:**
- 2-3 lần/tuần với tóc khô xơ
- 1-2 lần/tuần với tóc thường
- Tránh dùng nước quá nóng khi gội', 
1, 'phan_9.jpg'),

(5, N'Tránh sử dụng hóa chất',
N'**Tác hại của hóa chất lên tóc:**
- Làm mất lớp lipid bảo vệ
- Khiến tóc khô, xơ, chẻ ngọn
- Gây rụng tóc nhiều hơn

**Cách hạn chế:**
✓ Giãn cách 6 tháng giữa các lần nhuộm/duỗi
✓ Chọn salon uy tín sử dụng sản phẩm chất lượng
✓ Dùng dầu dưỡng nhiệt trước khi tạo kiểu

**Biện pháp thay thế:**
- Nhuộm tóc bằng henna tự nhiên
- Làm phồng bằng phương pháp cuốn giấy
- Uốn lạnh thay vì uốn nóng

**Chăm sóc phục hồi:**
- Gội đầu bằng nước mát
- Dùng khăn mềm thấm nước
- Hạn chế sấy tóc nhiệt độ cao', 
2, 'phan_10.jpg'),

-- Post 6
(6, N'Thực phẩm giàu vitamin C',
N'**Top 10 thực phẩm giàu vitamin C:**
1. Ổi (228mg/100g)
2. Ớt chuông đỏ (190mg)
3. Kiwi (92mg)
4. Dâu tây (60mg)
5. Đu đủ (62mg)
6. Cam (53mg)
7. Bông cải xanh (89mg)
8. Dứa (48mg)
9. Xoài (36mg)
10. Cà chua (23mg)

**Công dụng với da:**
- Tăng sản sinh collagen
- Làm sáng da, giảm thâm
- Chống oxy hóa mạnh
- Bảo vệ da khỏi tia UV

**Cách sử dụng hiệu quả:**
- Ăn trực tiếp hoặc ép nước
- Kết hợp với vitamin E
- Dùng vào buổi sáng
- Tránh nấu quá kỹ', 
1, 'phan_11.jpg'),

(6, N'Thực phẩm chứa collagen',
N'**Nguồn collagen tự nhiên tốt nhất:**
1. Nước hầm xương (7-10g collagen/cốc)
2. Cá hồi (da cá giàu collagen)
3. Lòng trắng trứng (proline)
4. Trái cây có múi (vitamin C)
5. Rau lá xanh đậm (chống phân hủy collagen)

**Công thức bổ sung:**
🍜 Canh gà hầm:
- Xương gà, chân gà
- Cà rốt, hành tây
- Hầm ít nhất 12 tiếng

🥗 Salad cá hồi:
- Cá hồi tươi
- Rau bina, cà chua
- Dầu oliu nguyên chất

**Lưu ý khi sử dụng:**
- Kết hợp với vitamin C
- Tránh đường và thức khuya
- Bảo quản đúng cách', 
2, 'phan_12.jpg'),

-- Post 7
(7, N'Nguyên nhân gây mụn',
N'**5 nguyên nhân chính:**
1. Thay đổi hormone:
   - Tuổi dậy thì
   - Chu kỳ kinh nguyệt
   - Mang thai
2. Căng thẳng kéo dài
3. Chế độ ăn uống:
   - Đồ ngọt, dầu mỡ
   - Sữa và chế phẩm
4. Vệ sinh da kém
5. Môi trường ô nhiễm

**Biểu hiện từng loại mụn:**
• Mụn đầu trắng: Nhân đóng
• Mụn đầu đen: Nhân mở
• Mụn viêm: Sưng đỏ
• Mụn bọc: Đau, có mủ

**Cách phòng tránh:**
- Rửa mặt 2 lần/ngày
- Tẩy trang kỹ
- Thay vỏ gối thường xuyên', 
1, 'phan_13.jpg'),

(7, N'Điều trị bằng dược mỹ phẩm',
N'**Thành phần hiệu quả:**
1. BHA (Salicylic Acid 2%):
   - Thấm sâu vào lỗ chân lông
   - Giảm nhờn, kháng viêm
2. AHA (Glycolic Acid 5-10%):
   - Tẩy tế bào chết
   - Làm sáng da

**Quy trình sử dụng:**
1. Làm sạch da
2. Toner cân bằng pH
3. Serum BHA/AHA (tối)
4. Dưỡng ẩm
5. Chống nắng (ngày)

**Lưu ý quan trọng:**
- Test thử trên da tay
- Bắt đầu từ nồng độ thấp
- Chỉ dùng 2-3 lần/tuần
- Kết hợp kem chống nắng', 
2, 'phan_14.jpg'),

-- Post 8
(8, N'Dưỡng ẩm chuyên sâu',
N'**Quy trình 7 bước:**
1. Làm sạch với sữa rửa mặt dịu nhẹ
2. Xịt khoáng cấp ẩm tức thì
3. Toner cân bằng độ ẩm
4. Serum dưỡng ẩm (HA, Ceramide)
5. Kem dưỡng ban đêm
6. Dầu dưỡng khóa ẩm
7. Mặt nạ ngủ 2-3 lần/tuần

**Sản phẩm gợi ý:**
• Cho da khô: Kem chứa Shea Butter
• Da dầu: Gel dưỡng không nhờn
• Da hỗn hợp: Lotion cân bằng

**Mẹo tăng hiệu quả:**
- Uống đủ nước
- Dùng máy tạo độ ẩm
- Tránh nước quá nóng
- Ăn thực phẩm giàu omega-3', 
1, 'phan_15.jpg'),

(8, N'Tẩy tế bào chết đúng cách',
N'**Phương pháp tẩy da chết:**
1. Vật lý:
   - Dùng scrub hạt nhỏ
   - Khăn tẩy tế bào chết
   - Máy rửa mặt sonic

2. Hóa học:
   - AHA (lactic acid, glycolic acid)
   - BHA (salicylic acid)
   - PHA (gluconolactone)

**Tần suất lý tưởng:**
- Da dầu: 2-3 lần/tuần
- Da hỗn hợp: 1-2 lần/tuần
- Da khô: 1 lần/tuần
- Da nhạy cảm: 2 tuần/lần

**Lưu ý an toàn:**
- Không tẩy khi da đang kích ứng
- Tránh vùng mắt
- Dưỡng ẩm ngay sau khi tẩy
- Bảo vệ da khỏi nắng', 
2, 'phan_16.jpg');


----------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE dbo.Comments (
    CommentId INT IDENTITY(1,1) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    UserId INT NULL,
    PostId INT NOT NULL,              
    CommentOn DATETIME2(7) NOT NULL,
    RepliedCommentId INT NULL,
    NumberOfLikes INT NOT NULL DEFAULT 0,
    PRIMARY KEY (CommentId),
    CONSTRAINT FK_Comments_User FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_Comments_Post FOREIGN KEY (PostId) REFERENCES Posts(PostId)
);

INSERT INTO dbo.Comments (Content, UserId, PostId, CommentOn, RepliedCommentId, NumberOfLikes)
VALUES
-- PostId = 1: Chăm sóc da mặt tại nhà
(N'Mình đã áp dụng theo hướng dẫn và da mặt cải thiện rõ rệt.', 11, 1, '2025-03-20 09:00:00', NULL, 10),
(N'Có cần dùng thêm serum không bạn?', 12, 1, '2025-03-20 09:15:00', NULL, 4),
(N'Cách rửa mặt bằng nước ấm rất hiệu quả nhé!', 13, 1, '2025-03-20 10:00:00', NULL, 6),
(N'Liệu trình này phù hợp với da dầu không?', 14, 1, '2025-03-20 10:30:00', NULL, 3),

-- PostId = 2: Giảm cân an toàn
(N'Mình thích nhất phần ăn uống khoa học, rất dễ áp dụng.', 15, 2, '2025-03-21 08:45:00', NULL, 7),
(N'Bạn có thể chia sẻ thêm bài tập nào phù hợp không?', 16, 2, '2025-03-21 09:10:00', NULL, 5),
(N'Mình đã giảm 3kg sau 1 tháng theo bài này!', 17, 2, '2025-03-21 10:00:00', NULL, 12),
(N'Tuyệt vời! Cảm ơn vì bài viết hữu ích.', 18, 2, '2025-03-21 11:30:00', NULL, 8),

-- PostId = 3: Dưỡng tóc chắc khỏe
(N'Mình đang dùng dầu dừa như bài viết, tóc mềm hẳn ra.', 19, 3, '2025-03-22 07:50:00', NULL, 6),
(N'Có thể thay thế dầu dừa bằng dầu oliu không?', 20, 3, '2025-03-22 08:30:00', NULL, 3),
(N'Bí quyết dùng mặt nạ ủ tóc thiên nhiên rất hay.', 21, 3, '2025-03-22 09:45:00', NULL, 4),
(N'Tóc mình trước đây hay rụng, giờ đỡ nhiều rồi.', 22, 3, '2025-03-22 10:15:00', NULL, 5),

-- PostId = 4: Thực phẩm giúp đẹp da
(N'Thêm trái cây vào bữa sáng là lời khuyên rất hay!', 23, 4, '2025-03-23 09:00:00', NULL, 9),
(N'Mình bắt đầu ăn nhiều rau xanh hơn sau khi đọc bài này.', 24, 4, '2025-03-23 10:00:00', NULL, 6),
(N'Còn thực phẩm nào giúp giảm mụn không ạ?', 25, 4, '2025-03-23 10:45:00', NULL, 3),
(N'Rất bổ ích, cảm ơn tác giả!', 26, 4, '2025-03-23 11:20:00', NULL, 4),

-- PostId = 5: Trị mụn hiệu quả
(N'Mình đã thử dùng nghệ tươi và thấy đỡ hẳn.', 27, 5, '2025-03-24 08:30:00', NULL, 7),
(N'Có ai dùng sữa rửa mặt thiên nhiên giống bài viết không?', 28, 5, '2025-03-24 09:10:00', NULL, 2),
(N'Rửa mặt đúng cách đúng là quan trọng thật.', 29, 5, '2025-03-24 09:45:00', NULL, 6),
(N'Trị mụn bằng công nghệ cao có đắt không ạ?', 30, 5, '2025-03-24 10:30:00', NULL, 5),

-- PostId = 6: Chăm sóc da mùa đông
(N'Mùa đông da mình hay khô, bài viết rất hữu ích.', 1, 6, '2025-03-25 08:00:00', NULL, 10),
(N'Nên dưỡng ẩm ngày mấy lần là tốt nhất?', 2, 6, '2025-03-25 08:45:00', NULL, 3),
(N'Mình sẽ thử dùng kem dưỡng như bài viết gợi ý.', 11, 6, '2025-03-25 09:30:00', NULL, 6),
(N'Cách làm mặt nạ thiên nhiên rất dễ thực hiện.', 12, 6, '2025-03-25 10:15:00', NULL, 4),

-- PostId = 7: Massage mặt tại nhà
(N'Massage giúp giảm căng thẳng thật đó!', 13, 7, '2025-03-26 09:00:00', NULL, 7),
(N'Mình thích kỹ thuật bấm huyệt vùng trán.', 14, 7, '2025-03-26 09:45:00', NULL, 5),
(N'Nên massage vào buổi sáng hay tối thì tốt hơn nhỉ?', 15, 7, '2025-03-26 10:20:00', NULL, 3),
(N'Massage thường xuyên giúp da căng bóng hơn.', 16, 7, '2025-03-26 11:00:00', NULL, 8),

-- PostId = 8: Trẻ hóa da công nghệ cao
(N'Mình định thử liệu trình HIFU sau khi đọc bài này.', 17, 8, '2025-03-27 08:10:00', NULL, 6),
(N'Có đau không khi sử dụng công nghệ RF?', 18, 8, '2025-03-27 08:45:00', NULL, 4),
(N'Bài viết rất đầy đủ và dễ hiểu.', 19, 8, '2025-03-27 09:30:00', NULL, 7),
(N'Muốn tìm địa chỉ uy tín để thực hiện.', 20, 8, '2025-03-27 10:00:00', NULL, 5);



--------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE Payments (
    --PaymentId INT NOT NULL IDENTITY(1,1),
    ReservationId INT NOT NULL,
    PayerId INT NOT NULL,  -- Bệnh nhân hoặc người giám hộ thanh toán
    PaymentDate DATETIME DEFAULT GETDATE(),
    ReceptionistId INT DEFAULT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    PaymentStatus NVARCHAR(50) NOT NULL,
    TransactionId NVARCHAR(100) DEFAULT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (ReservationId),
    CONSTRAINT FK_Payments_User FOREIGN KEY (PayerId) REFERENCES Users(UserId),
    CONSTRAINT FK_Payments_Reservation FOREIGN KEY (ReservationId) REFERENCES Reservations(ReservationId),
    CONSTRAINT FK_Payments_Receptionist FOREIGN KEY (ReceptionistId) REFERENCES Receptionists(ReceptionistId)
);

INSERT INTO Payments (ReservationId, PayerId, PaymentDate, ReceptionistId, PaymentMethod, PaymentStatus, TransactionId, Amount)
VALUES 
(1, 1, '2025-03-01 08:30:00', 31, N'Tiền mặt', N'Đã thanh toán', N'TXN12345', 500000),
(2, 2, '2025-03-02 09:00:00', 31, N'Thẻ tín dụng', N'Đã thanh toán', N'TXN12346', 750000),
(3, 13, '2025-03-03 10:15:00', 32, N'Ví điện tử VNPay', N'Đã thanh toán', N'TXN12347', 650000),
(4, 24, '2025-03-04 11:45:00', 32, N'Thẻ ghi nợ', N'Đã thanh toán', N'TXN12348', 820000),
(5, 5, '2025-03-05 13:30:00', 32, N'Tiền mặt', N'Đang xử lý', NULL, 400000),
(6, 6, '2025-03-06 15:00:00', 32, N'Ví điện tử VNPay', N'Chưa thanh toán', NULL, 300000);

-----------------
--  thêm data   |
-----------------
-- Thêm 30 Reservations từ tháng 1/2024 đến 3/2024
INSERT INTO Reservations (PatientId, DoctorScheduleId, Reason, PriorExaminationImg, AppointmentDate, Status, CancellationReason, CreatedByUserId, UpdatedByUserId)
VALUES
(11, 21, N'Khám tổng quát', NULL, '2024-01-05', N'Hoàn thành', NULL, 11, 31),
(12, 22, N'Đau đầu', NULL, '2024-02-07', N'Hoàn thành', NULL, 12, 32),
(13, 23, N'Kiểm tra huyết áp', NULL, '2024-03-10', N'Hoàn thành', NULL, 31, 31),
(14, 24, N'Tái khám tiểu đường', NULL, '2024-04-12', N'Hoàn thành', NULL, 32, 32),
(15, 25, N'Khám da liễu', NULL, '2024-05-15',  N'Hoàn thành', NULL, 15, 31),
(16, 26, N'Kiểm tra sau sinh', NULL, '2024-06-02', N'Hoàn thành', NULL, 16, 32),
(17, 27, N'Đau dạ dày', NULL, '2024-07-05', N'Hoàn thành', NULL, 17, 31),
(18, 28, N'Chích ngừa cúm', NULL, '2024-08-09', N'Hoàn thành', NULL, 32, 32),
(19, 29, N'Khám mắt', NULL, '2024-09-14', N'Hoàn thành', NULL, 19, 31),
(20, 30, N'Tư vấn dinh dưỡng', NULL, '2024-10-18', N'Hoàn thành', NULL, 20, 32),
(21, 1, N'Khám răng', NULL, '2024-11-01', N'Hoàn thành', NULL, 21, 31),
(22, 2, N'Xét nghiệm máu', NULL, '2024-12-04', N'Hoàn thành', NULL, 22, 32),
(23, 3, N'Chụp X-quang', NULL, '2024-01-07', N'Hoàn thành', NULL, 31, 31),
(24, 4, N'Vật lý trị liệu', NULL, '2024-02-10', N'Hoàn thành', NULL, 24, 32),
(25, 5, N'Khám tai mũi họng', NULL, '2024-03-12', N'Hoàn thành', NULL, 25, 31),
(26, 6, N'Kiểm tra thai kỳ', NULL, '2024-04-15', N'Hoàn thành', NULL, 32, 32),
(27, 7, N'Khám nội tổng quát', NULL, '2024-05-18', N'Hoàn thành', NULL, 27, 31),
(28, 8, N'Tư vấn tâm lý', NULL, '2024-06-20', N'Hoàn thành', NULL, 28, 32),
(29, 9, N'Khám nhi', NULL, '2024-07-22', N'Hoàn thành', NULL, 31, 31),
(30, 10, N'Xét nghiệm nước tiểu', NULL, '2024-08-25', N'Hoàn thành', NULL, 30, 32),
(1, 11, N'Khám xương khớp', NULL, '2024-09-27', N'Hoàn thành', NULL, 1, 31),
(2, 12, N'Kiểm tra mỡ máu', NULL, '2024-10-29', N'Hoàn thành', NULL, 2, 32);

-- Thêm 30 Payments tương ứng
INSERT INTO Payments (ReservationId, PayerId, PaymentDate, ReceptionistId, PaymentMethod, PaymentStatus, TransactionId, Amount)
VALUES
(78, 11, '2024-01-05 09:15:00', 31, N'Thẻ tín dụng', N'Đã thanh toán', 'TXN202401001', 450000),
(79, 12, '2024-02-07 10:00:00', 32, N'Ví điện tử', N'Đã thanh toán', 'TXN202401002', 620000),
(80, 13, '2024-03-10 10:45:00', 31, N'Tiền mặt', N'Đã thanh toán', 'TXN202401003', 380000),
(81, 14, '2024-04-12 15:00:00', 32, N'Chuyển khoản', N'Đã thanh toán', 'TXN202401004', 750000),
(82, 15, '2024-05-15 12:30:00', 31, N'Thẻ ghi nợ', N'Đã thanh toán', 'TXN202401005', 550000),
(83, 16, '2024-06-02 14:00:00', 32, N'Tiền mặt', N'Đã thanh toán', 'TXN202402001', 420000),
(84, 17, '2024-07-05 16:15:00', 31, N'Ví điện tử', N'Đã thanh toán', 'TXN202402002', 680000),
(85, 18, '2024-08-09 09:30:00', 32, N'Thẻ tín dụng', N'Đã thanh toán', 'TXN202402003', 530000),
(86, 19, '2024-09-14 11:15:00', 31, N'Chuyển khoản', N'Đã thanh toán', 'TXN202402004', 710000),
(87, 20, '2024-10-18 17:00:00', 32, N'Thẻ ghi nợ', N'Đã thanh toán', 'TXN202402005', 490000),
(88, 21, '2024-11-01 08:45:00', 31, N'Tiền mặt', N'Đã thanh toán', 'TXN202403001', 580000),
(89, 22, '2024-12-04 12:45:00', 32, N'Ví điện tử', N'Đã thanh toán', 'TXN202403002', 640000),
(90, 23, '2024-01-07 15:30:00', 31, N'Thẻ tín dụng', N'Đã thanh toán', 'TXN202403003', 720000),
(91, 24, '2024-02-10 10:15:00', 32, N'Chuyển khoản', N'Đã thanh toán', 'TXN202403004', 390000),
(92, 25, '2024-03-12 12:00:00', 31, N'Thẻ ghi nợ', N'Đã thanh toán', 'TXN202403005', 670000),
(93, 26, '2024-04-15 13:45:00', 32, N'Tiền mặt', N'Đã thanh toán', 'TXN202403006', 540000),
(94, 27, '2024-05-18 16:30:00', 31, N'Ví điện tử', N'Đã thanh toán', 'TXN202403007', 480000),
(95, 28, '2024-06-20 09:00:00', 32, N'Thẻ tín dụng', N'Đã thanh toán', 'TXN202403008', 830000),
(96, 29, '2024-07-22 10:45:00', 31, N'Chuyển khoản', N'Đã thanh toán', 'TXN202403009', 620000),
(97, 30, '2024-08-25 13:15:00', 32, N'Thẻ ghi nợ', N'Đã thanh toán', 'TXN202403010', 710000),
(98, 1,  '2024-09-27 15:00:00', 31, N'Tiền mặt', N'Đã thanh toán', 'TXN202403011', 590000),
(99, 2,  '2024-10-29 17:15:00', 32, N'Ví điện tử', N'Đã thanh toán', 'TXN202403012', 680000);















