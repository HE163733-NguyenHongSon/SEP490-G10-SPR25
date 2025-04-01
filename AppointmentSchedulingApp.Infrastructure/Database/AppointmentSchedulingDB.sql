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
   CitizenId BIGINT   NULL,
   Email VARCHAR(50)  NULL,
   Password VARCHAR(300) NOT NULL,
   UserName NVARCHAR(50) NOT NULL ,
   Phone VARCHAR(12) NOT NULL,
   Gender NVARCHAR(6)  NULL,
   Dob DATE  NULL,
   Address NVARCHAR(100)  NULL,
   AvatarUrl NVARCHAR(200) NULL,
   IsVerify BIT  NULL DEFAULT 0,   
   PRIMARY KEY (UserId),
   CONSTRAINT Phone_Unique UNIQUE (Phone),
   CONSTRAINT User_CheckGender CHECK (Gender IN (N'Nam', N'Nữ'))
);

INSERT INTO Users (CitizenId, Email, Password, UserName, Phone, Gender, Dob, Address, AvatarUrl, IsVerify)
VALUES
-- id 1-10 Giám hộ---

(NULL, 'user1@example.com', 'password123', N'Văn An', '0901234567', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user2@example.com', 'password456', N'Thị Bé', '0902345678', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user3@example.com', 'password789', N'Văn Ca', '0903456789', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user4@example.com', 'password000', N'Thị Duyên', '0904567890', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user5@example.com', 'password999', N'Văn Cường', '0905678901', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user6@example.com', 'pass2468', N'Thị Hạnh', '0906789012', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user7@example.com', 'pass3579', N'Văn Hòa', '0907890123', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user8@example.com', 'pass4680', N'Thị Mai', '0908901234', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user9@example.com', 'pass5791', N'Văn Khánh', '0909012345', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(NULL, 'user10@example.com', 'pass6802', N'Văn Bình', '0910123456', NULL, NULL, NULL, 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),


-- id 11-30 Bệnh nhân---
(035002005183, 'benhnhan.vovanthuan@example.com', 'ThuanVo123', N'Võ Văn Thuận', '0912345703', N'Nam', '1984-02-29', N'46 Nguyễn Biểu, Quận 5, TP.HCM', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005184, 'benhnhan.tranthikimphuong@example.com', 'KimPhuong456', N'Trần Thị Kim Phượng', '0912345704', N'Nữ', '1989-06-15', N'57 Bà Triệu, Hoàn Kiếm, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005185, 'benhnhan.nguyenhuuquang@example.com', 'HuuQuang789', N'Nguyễn Hữu Quang', '0912345705', N'Nam', '1992-12-10', N'68 Trần Cao Vân, Thanh Khê, Đà Nẵng', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005186, 'benhnhan.lehoangmai@example.com', 'HoangMai000', N'Lê Hoàng Mai', '0912345706', N'Nữ', '1996-09-01', N'79 Nguyễn Huệ, Quận 1, TP.HCM', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005187, 'benhnhan.vuongthanhdat@example.com', 'ThanhDat999', N'Vương Thành Đạt', '0912345707', N'Nam', '1983-05-22', N'80 Hai Bà Trưng, Quận 3, TP.HCM', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005188, 'benhnhan.tranthuytien@example.com', 'ThuyTien1212', N'Trần Thúy Tiên', '0912345708', N'Nữ', '1999-03-18', N'91 Lý Thường Kiệt, Tân Bình, TP.HCM', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005189, 'benhnhan.phambaoan@example.com', 'BaoAn2323', N'Phạm Bảo An', '0912345709', N'Nam', '1988-11-14', N'12 Nguyễn Thái Học, Ba Đình, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005190, 'benhnhan.ngothuynga@example.com', 'ThuyNga3434', N'Ngô Thúy Nga', '0912345710', N'Nữ', '1994-07-07', N'23 Tràng Thi, Hoàn Kiếm, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005191, 'benhnhan.daovanhung@example.com', 'VanHung4545', N'Đào Văn Hùng', '0912345711', N'Nam', '1991-01-20', N'34 Giải Phóng, Đống Đa, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005192, 'benhnhan.lethikieuanh@example.com', 'KieuAnh5656', N'Lê Thị Kiều Anh', '0912345712', N'Nữ', '1997-04-28', N'45 Kim Mã, Ba Đình, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005193, 'benhnhan.truongquocviet@example.com', 'QuocViet6767', N'Trương Quốc Việt', '0912345713', N'Nam', '1980-10-05', N'56 Nguyễn Chí Thanh, Ba Đình, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005194, 'benhnhan.vuthuyduong@example.com', 'ThuyDuong7878', N'Vũ Thùy Dương', '0912345714', N'Nữ', '1985-08-12', N'67 Lạc Long Quân, Tây Hồ, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005195, 'benhnhan.nguyenvanmanh@example.com', 'VanManh8989', N'Nguyễn Văn Mạnh', '0912345715', N'Nam', '1993-02-20', N'78 Âu Cơ, Tây Hồ, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005196, 'benhnhan.phanthanhmai@example.com', 'ThanhMai9090', N'Phan Thanh Mai', '0912345716', N'Nữ', '1998-05-01', N'89 Đội Cấn, Ba Đình, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005197, 'benhnhan.dotuananh@example.com', 'TuanAnh0101', N'Đỗ Tuấn Anh', '0912345717', N'Nam', '1986-12-25', N'90 Kim Ngưu, Hai Bà Trưng, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005198, 'benhnhan.tranthikimlien@example.com', 'KimLien1212', N'Trần Thị Kim Liên', '0912345718', N'Nữ', '1995-09-17', N'101 Minh Khai, Hai Bà Trưng, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005199, 'benhnhan.nguyenhuuhoang@example.com', 'HuuHoang2323', N'Nguyễn Hữu Hoàng', '0912345719', N'Nam', '1981-03-09', N'112 Bạch Mai, Hai Bà Trưng, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005200, 'benhnhan.lethanhnga@example.com', 'ThanhNga3434', N'Lê Thanh Nga', '0912345720', N'Nữ', '1992-06-02', N'123 Phố Vọng, Hai Bà Trưng, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005201, 'benhnhan.vovantuan@example.com', 'VanTuan4545', N'Võ Văn Tuấn', '0912345721', N'Nam', '1987-11-28', N'14 Nguyễn Khoái, Hoàng Mai, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005202, 'benhnhan.dothikimchi@example.com', 'KimChi5656', N'Đỗ Thị Kim Chi', '0912345722', N'Nữ', '1999-09-21', N'25 Định Công, Hoàng Mai, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),

-- id 31-32 Lễ tân
(035002005171, 'letan.lethibich@example.com', '123LeTan', N'Lê Thị Bích', '0912345691', N'Nữ', '1995-02-18', N'22 Nguyễn Trãi, Thanh Xuân, Hà Nội', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),
(035002005172, 'letan.tranquanghuy@example.com', 'HuyLeTan456', N'Trần Quang Huy', '0912345692', N'Nam', '1997-06-30', N'33 Trần Phú, Hải Châu, Đà Nẵng', 'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', 1),

--id 33-52 Bác sĩ-------
(035002005101, 'bacsi.nguyenvanan@example.com', 'AnPass123', N'Nguyễn Văn An', '0912345001', N'Nam', '1980-03-10', N'12 Đường Lê Lợi, Quận 1, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005102, 'bacsi.tranthithuy@example.com', 'ThuyPass456', N'Trần Thị Thúy', '0912345002', N'Nữ', '1985-07-25', N'45 Phố Huế, Hoàn Kiếm, Hà Nội', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005103, 'bacsi.dinhquocbao@example.com', 'BaoPass789', N'Đinh Quốc Bảo', '0912345003', N'Nam', '1990-11-12', N'78 Lê Duẩn, Thanh Khê, Đà Nẵng', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005104, 'bacsi.phamthanhha@example.com', 'HaPass999', N'Phạm Thanh Hà', '0912345004', N'Nữ', '1983-09-14', N'23 Võ Thị Sáu, Biên Hòa, Đồng Nai', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005105, 'bacsi.letrungkien@example.com', 'KienPass888', N'Lê Trung Kiên', '0912345005', N'Nam', '1982-05-20', N'55 Nguyễn Trãi, Thanh Xuân, Hà Nội', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005106, 'bacsi.hoangthikimanh@example.com', 'KimAnhPass567', N'Hoàng Thị Kim Anh', '0912345006', N'Nữ', '1991-02-14', N'99 Lý Thái Tổ, Hải Châu, Đà Nẵng', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005107, 'bacsi.tranvanquang@example.com', 'QuangPass234', N'Trần Văn Quang', '0912345007', N'Nam', '1986-06-18', N'120 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005108, 'bacsi.nguyenhoangyen@example.com', 'YenPass777', N'Nguyễn Hoàng Yến', '0912345008', N'Nữ', '1993-08-22', N'35 Trần Hưng Đạo, Quận 5, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005109, 'bacsi.buithanhtung@example.com', 'TungPass333', N'Bùi Thành Tùng', '0912345009', N'Nam', '1987-10-30', N'22 Nguyễn Văn Linh, Hải Phòng', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005110, 'bacsi.lephuongthao@example.com', 'ThaoPass111', N'Lê Phương Thảo', '0912345010', N'Nữ', '1984-04-25', N'77 Lê Quang Định, Bình Thạnh, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005111, 'bacsi.nguyenvanphu@example.com', 'PhuPass654', N'Nguyễn Văn Phú', '0912345011', N'Nam', '1979-07-17', N'12 Nguyễn Đình Chiểu, Quận 3, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005112, 'bacsi.dovanthanh@example.com', 'ThanhPass321', N'Đỗ Văn Thành', '0912345012', N'Nam', '1988-11-08', N'90 Nguyễn Du, Quận 1, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005113, 'bacsi.phamthihue@example.com', 'HuePass159', N'Phạm Thị Huệ', '0912345013', N'Nữ', '1986-03-29', N'25 Điện Biên Phủ, Ba Đình, Hà Nội', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005114, 'bacsi.luongquangdinh@example.com', 'DinhPass753', N'Lương Quang Định', '0912345014', N'Nam', '1992-09-12', N'31 Hoàng Hoa Thám, Ba Đình, Hà Nội', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005115, 'bacsi.dangngochai@example.com', 'HaiPass258', N'Đặng Ngọc Hải', '0912345015', N'Nam', '1983-12-21', N'14 Nguyễn Văn Cừ, Long Biên, Hà Nội', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005116, 'bacsi.vothimyhanh@example.com', 'HanhPass852', N'Võ Thị Mỹ Hạnh', '0912345016', N'Nữ', '1994-05-07', N'102 Võ Văn Kiệt, Quận 1, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005117, 'bacsi.hongvantrieu@example.com', 'TrieuPass963', N'Hồng Văn Triều', '0912345017', N'Nam', '1978-01-15', N'26 Nguyễn Trãi, Quận 5, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005118, 'bacsi.phamminhtoan@example.com', 'ToanPass741', N'Phạm Minh Toàn', '0912345018', N'Nam', '1990-07-19', N'45 Trường Chinh, Đống Đa, Hà Nội', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005119, 'bacsi.dinhthithao@example.com', 'ThaoPass369', N'Đinh Thị Thảo', '0912345019', N'Nữ', '1982-06-30', N'99 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),
(035002005120, 'bacsi.tranquoctuan@example.com', 'TuanPass123', N'Trần Quốc Tuấn', '0912345020', N'Nam', '1981-04-01', N'18 Lý Tự Trọng, Quận 1, TP.HCM', 'https://th.bing.com/th/id/OIP.srNFFzORAaERcWvhwgPzVAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7', 0),

--id 53-Admin
(035002005177, 'sonnh@example.com', '123', N'Nguyễn Hồng Sơn', '0912345634', N'Nữ', '2002-06-27', N'20 Nguyễn Trãi, Thanh Xuân, Hà Nội',  'https://th.bing.com/th/id/OIP.sgmOx_ZbnKNxZPXFnpi1ywHaHE?w=184&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',1);


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


---------------------------------------------------------------------------------------------------------
CREATE TABLE Patients (
  PatientId INT NOT NULL,
  GuardianId INT NULL,
  MainCondition NVARCHAR(300),
  Rank NVARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (PatientId),
  CONSTRAINT Patient_FK FOREIGN KEY (PatientId) REFERENCES Users (UserId),
  CONSTRAINT Guardian_FK FOREIGN KEY (GuardianId) REFERENCES Users (UserId)


) ;
INSERT INTO Patients (PatientId, GuardianId, MainCondition, Rank)
VALUES
    -- Bệnh nhân từ ID 11-20 có giám hộ từ ID 1-10 (một số có bệnh lý chính, một số NULL)
    (11, 1, N'Cao huyết áp', N'Thường'), 
    (12, 2, N'Tiểu đường', N'Thường'), 
    (13, 3, NULL, N'Thường'), 
    (14, 4, N'Suyễn', N'Thường'), 
    (15, 5, NULL, N'Thường'),
    (16, 6, N'Viêm khớp', N'Thường'), 
    (17, 7, NULL, N'Thường'), 
    (18, 8, N'Suy thận', N'Thường'), 
    (19, 9, NULL, N'Thường'), 
    (20, 10, N'Đột quỵ', N'Thường'),

    -- Bệnh nhân từ ID 21-30 không có giám hộ or người giám hộ là bệnh nhân (một số có bệnh lý chính, một số NULL)
    (21, NULL, NULL, N'Thường'), 
    (22, NULL, N'Tiểu đường', N'Thường'), 
    (23, NULL, NULL, N'Thường'), 
    (24, NULL, N'Suyễn', N'Thường'), 
    (25, NULL, NULL, N'Thường'),
    (6, NULL, N'Viêm khớp', N'Thường'), 
    (7, NULL, NULL, N'Thường'), 
    (8, NULL, N'Suy thận', N'Thường'), 
    (9, NULL, NULL, N'Thường'), 
    (10, NULL, N'Đột quỵ', N'Thường');

--------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE Receptionists (
    ReceptionistId INT NOT NULL,
    StartDate DATE NOT NULL,     
    Shift NVARCHAR(20) DEFAULT N'Ca sáng',  
    Status NVARCHAR(20) DEFAULT N'Đang làm việc', 
    PRIMARY KEY (ReceptionistId),
    CONSTRAINT FK_Receptionists_User FOREIGN KEY (ReceptionistId) REFERENCES Users(UserId)
);
INSERT INTO Receptionists (ReceptionistId, StartDate, Shift, Status)
VALUES 
(31, '2024-01-01', N'Ca sáng', N'Đang làm việc'),
(32, '2024-01-01', N'Ca chiều', N'Đang làm việc');
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
    Degree
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
    N'PGS,TS',
    N'BS.CK2'
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
    N'BS.CK1'
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
    N'GS,TS',
    N'BS.CK2'
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
    N'BS.CK2'),
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
    N'BS.CK2'),
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
    N'BS.CK2'),
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
    N'GS,TS',
    N'BS.CK2'),

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
    N'BS.CK2'),

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
    N'BS.CK2'),

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
    N'BS.CK2'),

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
    N'BS.CK2'),

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
    N'BS.CK2'),

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
    N'BS.CK2'),

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
    N'TS'),

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
    N'BS.CK2'),

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
    N'TS'),

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
    N'BS.CK2'),

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
    N'BS.CK1'),

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
    N'TS'),

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
    N'BS.CK2');


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
  Image VARCHAR(200)  NULL default 'https://th.bing.com/th/id/OIP.5kVbDAdvd-TbbhL31d-2sgHaE4?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  PRIMARY KEY (SpecialtyId)
);
INSERT INTO Specialties (SpecialtyName, SpecialtyDescription)
VALUES
  (N'Nội tổng quát', N'Điều trị các bệnh không phẫu thuật và quản lý các vấn đề sức khỏe chung của cơ thể.'),
  (N'Tim mạch', N'Chuyên điều trị các bệnh liên quan đến tim và mạch máu.'),
  (N'Nội tiết', N'Điều trị các bệnh liên quan đến hormone và tuyến nội tiết (như tiểu đường, suy giáp).'),
  (N'Tiêu hóa', N'Chuyên điều trị các vấn đề liên quan đến hệ tiêu hóa, như dạ dày, ruột và gan.'),
  (N'Ngoại tổng quát', N'Thực hiện các ca phẫu thuật liên quan đến cơ quan nội tạng.'),
  (N'Ngoại thần kinh', N'Điều trị các bệnh thần kinh cần phẫu thuật, như phẫu thuật não và tủy sống.'),
  (N'Chấn thương chỉnh hình', N'Chuyên điều trị chấn thương xương khớp.'),
  (N'Sản khoa', N'Điều trị các vấn đề liên quan đến thai kỳ và sinh nở.'),
  (N'Phụ khoa', N'Điều trị các bệnh liên quan đến hệ sinh sản nữ.'),
  (N'Nhi khoa', N'Chuyên chăm sóc sức khỏe trẻ em từ sơ sinh đến thanh thiếu niên.'),
  (N'Nhãn khoa', N'Điều trị các bệnh liên quan đến mắt và thị lực.'),
  (N'Tai - Mũi - Họng', N'Chuyên điều trị các bệnh liên quan đến tai, mũi và họng.'),
  (N'Da liễu', N'Điều trị các bệnh về da, móng và tóc.'),
  (N'Tâm thần', N'Điều trị các rối loạn tâm thần và các bệnh lý tâm thần.'),
  (N'Xét nghiệm y học', N'Thực hiện các xét nghiệm lâm sàng như xét nghiệm máu, nước tiểu và chẩn đoán hình ảnh.'),
  (N'Hồi sức cấp cứu', N'Điều trị cho bệnh nhân nguy kịch hoặc cần chăm sóc đặc biệt.');


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
    EstimatedTime TIME,
    IsPrepayment BIT DEFAULT 0,
    SpecialtyId INT NOT NULL,
    Image NVARCHAR(MAX),
    FOREIGN KEY (SpecialtyId) REFERENCES Specialties(SpecialtyId)
);



INSERT INTO Services (ServiceName, Overview, Process, TreatmentTechniques, Price, EstimatedTime, IsPrepayment, SpecialtyId, Image)
VALUES
(N'Khám tim mạch',
  N'Khám tim mạch giúp đánh giá tình trạng sức khỏe của tim và hệ tuần hoàn, phát hiện sớm các bệnh lý tim mạch như cao huyết áp, bệnh mạch vành, suy tim hoặc rối loạn nhịp tim. Việc kiểm tra định kỳ giúp phát hiện sớm và điều trị kịp thời các vấn đề về tim mạch.',
  N'1. Khai thác tiền sử bệnh tim mạch của bệnh nhân và gia đình.\n2. Đo các chỉ số sinh tồn: huyết áp, nhịp tim, SpO2.\n3. Khám lâm sàng hệ tim mạch, nghe tim bằng ống nghe.\n4. Thực hiện các xét nghiệm như điện tâm đồ (ECG), siêu âm tim, xét nghiệm mỡ máu.\n5. Đánh giá tình trạng tim mạch và tư vấn điều trị hoặc phòng ngừa bệnh lý.',
  N'Sử dụng máy đo huyết áp, máy điện tim (ECG), máy siêu âm tim Doppler, thiết bị đo cholesterol và các xét nghiệm sinh hóa máu.',
  600000, '00:20:00', 0, 2, N'images/kham_tim_mach.jpg'),


(N'Khám răng',
  N'Khám răng là quá trình kiểm tra tình trạng sức khỏe răng miệng, phát hiện các vấn đề như sâu răng, viêm nướu hoặc các bệnh lý liên quan khác. Khám răng định kỳ giúp duy trì sức khỏe răng miệng tốt.',
  N'1. Kiểm tra răng miệng tổng quát.\n2. Đánh giá tình trạng nướu, men răng và các tổn thương khác.\n3. Chụp X-quang răng nếu cần thiết.\n4. Tư vấn về chăm sóc răng miệng và điều trị nếu có vấn đề.',
  N'Sử dụng máy khoan răng, máy cạo vôi răng, dụng cụ vệ sinh răng miệng và máy chụp X-quang.',
  700000, '00:05:00', 1, 12, N'images/kham_rang.jpg'),

(N'Khám mắt',
 N'Khám mắt là quy trình kiểm tra chức năng thị lực và các bệnh lý về mắt như cận thị, loạn thị, viễn thị và các vấn đề khác về võng mạc.',
 N'1. Đo thị lực bằng bảng kiểm tra.\n2. Đo nhãn áp để kiểm tra nguy cơ tăng nhãn áp.\n3. Soi đáy mắt để phát hiện bệnh lý võng mạc.\n4. Đánh giá tổng quan sức khỏe mắt.',
 N'Sử dụng máy đo thị lực tự động, máy đo nhãn áp, đèn soi đáy mắt và thiết bị laser nếu cần.',
 800000, '01:05:00', 1, 11, N'images/kham_mat.jpg'),

(N'Xét nghiệm',
 N'Xét nghiệm y tế giúp chẩn đoán và theo dõi tình trạng sức khỏe của bệnh nhân thông qua việc phân tích mẫu máu, nước tiểu hoặc các mẫu sinh học khác.',
 N'1. Thu thập mẫu máu hoặc nước tiểu.\n2. Xét nghiệm sinh hóa, huyết học hoặc vi sinh.\n3. Đánh giá kết quả và lập báo cáo.\n4. Tư vấn về các chỉ số bất thường nếu có.',
 N'Sử dụng máy xét nghiệm tự động, máy phân tích sinh hóa và dụng cụ lấy mẫu vô trùng.',
 300000, '00:05:00', 1, 15, N'images/xet_nghiem.jpg'),

(N'Vật lý trị liệu',
 N'Vật lý trị liệu là quá trình phục hồi chức năng vận động, giảm đau và cải thiện chất lượng cuộc sống cho bệnh nhân bị chấn thương hoặc các bệnh lý cơ xương khớp.',
 N'1. Đánh giá tình trạng cơ bắp và khớp.\n2. Xây dựng kế hoạch phục hồi chức năng.\n3. Thực hiện các bài tập phục hồi và massage trị liệu.\n4. Theo dõi và điều chỉnh phương pháp điều trị.',
 N'Sử dụng máy siêu âm trị liệu, máy điện xung, máy kéo giãn cột sống và dụng cụ tập luyện.',
 600000, '01:30:00', 0,  7, N'images/vat_ly_tri_lieu.jpg'),

(N'Tư vấn tâm lý',
 N'Tư vấn tâm lý giúp bệnh nhân giải tỏa căng thẳng, lo âu và các vấn đề tinh thần thông qua liệu pháp trò chuyện và tư vấn cá nhân.',
 N'1. Khai thác tình trạng tâm lý của bệnh nhân.\n2. Thực hiện các bài kiểm tra tâm lý nếu cần.\n3. Áp dụng liệu pháp nhận thức hành vi (CBT).\n4. Đưa ra các phương pháp quản lý căng thẳng.',
 N'Kỹ thuật CBT, liệu pháp thư giãn, và trị liệu cá nhân.',
 400000, '01:00:00', 0,  14, N'images/tu_van_tam_ly.jpg'),

(N'Khám nhi',
 N'Khám nhi là quá trình kiểm tra sức khỏe tổng quát cho trẻ em, nhằm phát hiện sớm các bệnh lý tiềm ẩn, theo dõi quá trình phát triển thể chất và tiêm chủng định kỳ.',
 N'1. Khai thác tiền sử sức khỏe và bệnh sử của trẻ.\n2. Đo các chỉ số sinh tồn như chiều cao, cân nặng, nhiệt độ, nhịp tim.\n3. Khám lâm sàng các hệ cơ quan (hô hấp, tiêu hóa, tim mạch, thần kinh...).\n4. Đánh giá tình trạng dinh dưỡng và phát triển của trẻ.\n5. Tư vấn tiêm chủng và chăm sóc sức khỏe định kỳ.',
 N'Máy đo huyết áp trẻ em, cân điện tử, máy đo nhiệt độ, thiết bị đo chiều cao.',
 600000, '00:30:00', 1,  10, N'images/kham_nhi.jpg'),

(N'Siêu âm',
 N'Siêu âm là kỹ thuật chẩn đoán hình ảnh không xâm lấn, giúp phát hiện các bất thường bên trong cơ thể qua sóng siêu âm.',
 N'1. Khai thác triệu chứng lâm sàng và bệnh sử.\n2. Chuẩn bị vùng siêu âm bằng gel dẫn sóng.\n3. Thực hiện siêu âm bằng đầu dò chuyên dụng.\n4. Phân tích kết quả hình ảnh trên màn hình.\n5. Tư vấn chẩn đoán và hướng điều trị.',
 N'Máy siêu âm 4D, đầu dò siêu âm, máy tính phân tích hình ảnh.',
 1000000, '00:30:00', 1,  16, N'images/sieu_am.jpg'),

(N'Khám da liễu',
 N'Khám da liễu giúp phát hiện và điều trị các bệnh lý về da như viêm da, mụn trứng cá, bệnh da liễu truyền nhiễm và các rối loạn về sắc tố.',
 N'1. Khai thác tiền sử bệnh lý về da.\n2. Khám da bằng kính lúp và ánh sáng chuyên dụng.\n3. Đánh giá tổn thương da và vùng bị ảnh hưởng.\n4. Đề xuất các liệu pháp như liệu pháp laser, liệu pháp lạnh.\n5. Tư vấn chăm sóc da và phòng ngừa.',
 N'Máy laser, máy soi da, thiết bị trị liệu bằng lạnh.',
 700000, '00:45:00', 0, 13, N'images/kham_da_lieu.jpg'),

(N'Tư vấn dinh dưỡng', 
 N'Tư vấn dinh dưỡng là quá trình lập kế hoạch chế độ ăn uống hợp lý...', 
 N'1. Đánh giá tình trạng dinh dưỡng...\n2. Thực hiện xét nghiệm...', 
 N'Máy đo chỉ số cơ thể, bảng phân tích dinh dưỡng...', 
 500000, '01:00:00', 0, 1, N'images/tu_van_dinh_duong.jpg'), 

(N'Tiêm chủng', 
 N'Tiêm phòng định kỳ và du lịch nhằm bảo vệ sức khỏe...', 
 N'1. Tư vấn về các loại vắc-xin...\n2. Tiêm vắc-xin...',      
 N'Vắc-xin các loại, bộ tiêm chủng...', 
 200000, '00:15:00', 1, 10, N'images/tiem_chung.jpg'), 

(N'Chiropractic', 
 N'Kiểm tra và nắn chỉnh cột sống...', 
 N'1. Đánh giá tình trạng cột sống...\n2. Thực hiện các kỹ thuật...', 
 N'Bàn nắn chỉnh cột sống, dụng cụ hỗ trợ...', 
 800000, '01:00:00', 0, 7, N'images/chiropractic.jpg'), 

(N'Đo thính lực', 
 N'Đánh giá khả năng nghe và xác định...', 
 N'1. Khai thác tiền sử thính giác...\n2. Kiểm tra thính lực...', 
 N'Máy đo thính lực, máy trợ thính...', 
 600000, '00:30:00', 0, 12, N'images/do_thinh_luc.jpg'), 

(N'Khám tim mạch', 
 N'Kiểm tra sức khỏe tim mạch...', 
 N'1. Khai thác bệnh sử tim mạch...\n2. Đo huyết áp...', 
 N'Máy đo huyết áp, máy điện tâm đồ...', 
 900000, '00:45:00', 1, 2, N'images/kham_tim_mach.jpg'), 

(N'Khám chỉnh hình', 
 N'Kiểm tra và điều trị các bệnh lý về xương khớp...', 
 N'1. Khai thác bệnh sử xương khớp...\n2. Chẩn đoán hình ảnh...', 
 N'Bàn khám chỉnh hình, dụng cụ nẹp...', 
 850000, '01:00:00', 0, 7, N'images/kham_chinh_hinh.jpg'), 
(N'Tư vấn hiếm muộn', 
 N'Hỗ trợ tư vấn vô sinh hiếm muộn...', 
 N'1. Khai thác bệnh sử sức khỏe sinh sản...\n2. Xét nghiệm hormone...', 
 N'Thiết bị siêu âm, máy xét nghiệm sinh hóa...', 
 1200000, '01:30:00', 1, 8, N'images/tu_van_hiem_muon.jpg'), 

(N'Tư vấn tiểu đường', 
 N'Quản lý bệnh tiểu đường...', 
 N'1. Đánh giá tiền sử bệnh lý...\n2. Đo đường huyết...', 
 N'Máy đo đường huyết, bút tiêm insulin...', 
 450000, '00:30:00', 0, 3, N'images/tu_van_tieu_duong.jpg'), 

(N'Liệu pháp hô hấp', 
 N'Điều trị và phục hồi chức năng hô hấp...', 
 N'1. Đánh giá tình trạng hô hấp...\n2. Hướng dẫn bài tập thở...', 
 N'Máy khí dung, thiết bị hỗ trợ thở...', 
 700000, '00:45:00', 0, 16, N'images/lieu_phap_ho_hap.jpg'), 

(N'Khám tiêu hóa', 
 N'Kiểm tra sức khỏe hệ tiêu hóa...', 
 N'1. Khai thác bệnh sử tiêu hóa...\n2. Nội soi dạ dày...', 
 N'Máy nội soi dạ dày, máy nội soi đại tràng...', 
 1100000, '01:30:00', 1, 4, N'images/kham_tieu_hoa.jpg'),

(N'Cấp cứu',
N'Xử lý các tình huống khẩn cấp và chấn thương nghiêm trọng.',
N'1. Tiếp nhận bệnh nhân trong tình trạng nguy kịch.\n2. Cấp cứu hồi sức và ổn định huyết động.\n3. Phẫu thuật cấp cứu (nếu cần).\n4. Theo dõi sát tình trạng bệnh nhân.\n5. Chuyển viện hoặc theo dõi tại phòng chăm sóc đặc biệt.',
N'Trang thiết bị cấp cứu, máy thở, thuốc cấp cứu.',
1500000, '00:00:00', 1, 16, N'images/cap_cuu.jpg');

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
(34, 3, N'Thứ Hai', 1, 2),
(35, 4, N'Thứ Hai', 1, 3),

(33, 2, N'Thứ Tư', 1, 1),
(34, 3, N'Thứ Tư', 1, 2),
(35, 4, N'Thứ Tư', 1, 3),

(33, 2, N'Thứ Sáu', 1, 1),
(34, 3, N'Thứ Sáu', 1, 2),
(35, 4, N'Thứ Sáu', 1, 3),


(34, 6, N'Thứ Ba', 1, 1),
(34, 7, N'Thứ Ba', 2, 1),
(34, 8, N'Thứ Năm', 3, 1),

(35, 9, N'Thứ Hai', 3, 1),
(35, 10, N'Thứ Tư', 3, 2),
(35, 11, N'Thứ Sáu', 2, 1),

(36, 12, N'Thứ Ba', 3, 1),
(36, 13, N'Thứ Năm', 2, 1),
(36, 14, N'Thứ Sáu', 3, 2),

(37, 15, N'Thứ Hai', 1, 3),
(37, 16, N'Thứ Ba', 2, 3),
(37, 17, N'Thứ Năm', 1, 3),
(37, 18, N'Thứ Sáu', 3, 3),

(38, 19, N'Thứ Hai', 2, 4),
(38, 19, N'Thứ Ba', 2, 4),
(38, 19, N'Thứ Tư', 2, 4),
(38, 19, N'Thứ Năm', 2, 4),
(38, 19, N'Thứ Sáu', 2, 4),

(39, 4, N'Thứ Hai', 3, 5),
(39, 5, N'Thứ Ba', 2, 5),
(39, 6, N'Thứ Tư', 1, 5),
(39, 7, N'Thứ Năm', 3, 5),
(39, 8, N'Thứ Sáu', 2, 5);

---------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Reservations (
  ReservationId int NOT NULL IDENTITY(1,1),
  PatientId int NOT NULL,
  DoctorScheduleId int NOT NULL,
  Reason nvarchar(max),
  PriorExaminationImg nvarchar(200) NULL,
  AppointmentDate datetime NOT NULL,
  StartTime datetime NOT NULL,
  EndTime datetime NOT NULL,
  Status nvarchar(20) NOT NULL,
  CancellationReason nvarchar(255) NULL, 
  UpdatedDate datetime NOT NULL DEFAULT GETDATE(), 
  PRIMARY KEY (ReservationId),
  CONSTRAINT PatientId_FK FOREIGN KEY (PatientId) REFERENCES Patients (PatientId),
  CONSTRAINT DoctorScheduleId_FK FOREIGN KEY (DoctorScheduleId) REFERENCES DoctorSchedules (DoctorScheduleId)
);



INSERT INTO Reservations (PatientId, DoctorScheduleId, Reason, PriorExaminationImg, AppointmentDate, StartTime, EndTime, Status, CancellationReason, UpdatedDate)
VALUES
(23, 1, N'Tư vấn tiểu đường', N'http://example.com/prior_exam_17', '2025-01-10', '09:15:00', '09:45:00', N'Hoàn thành', NULL, '2025-01-10 09:15:00'),
(23, 2, N'Khám định kỳ', N'http://example.com/prior_exam_1', '2025-01-15', '09:00:00', '09:30:00', N'Hoàn thành', NULL, '2025-01-15 09:00:00'),
(23, 3, N'Khám định kỳ', N'http://example.com/prior_exam_2', '2025-01-20', '10:00:00', '10:30:00', N'Đang chờ', NULL, '2025-01-20 10:00:00'),
(23, 4, N'Khám mắt', N'http://example.com/prior_exam_5', '2025-01-19', '11:00:00', '11:45:00', N'Xác nhận', NULL, '2025-01-19 11:00:00'),
(23, 5, N'Kiểm tra thính giác', N'http://example.com/prior_exam_13', '2025-01-27', '14:00:00', '14:45:00', N'Xác nhận', NULL, '2025-01-27 14:00:00'),
(23, 6, N'Tư vấn da liễu', NULL, '2025-01-23', '09:30:00', '10:00:00', N'Xác nhận', NULL, '2025-01-23 09:30:00'),
(25, 7, N'Theo dõi quản lý tiểu đường', NULL, '2025-01-17', '14:30:00', '15:00:00', N'Xác nhận', NULL, '2025-01-17 14:30:00'),
(6, 8, N'Khám sức khỏe tổng quát', N'http://example.com/prior_exam_4', '2025-01-18', '08:30:00', '09:15:00', N'Đã hủy', N'Bệnh nhân hủy', '2025-01-18 08:30:00'),
(7, 9, N'Tư vấn tâm lý', N'http://example.com/prior_exam_6', '2025-01-20', '13:00:00', '13:45:00', N'Không đến', NULL, '2025-01-20 13:00:00'),
(8, 10, N'Tư vấn nhi khoa', NULL, '2025-01-21', '15:00:00', '15:30:00', N'Xác nhận', NULL, '2025-01-21 15:00:00'),
(9, 11, N'Siêu âm', N'http://example.com/prior_exam_8', '2025-01-22', '16:30:00', '17:00:00', N'Đang chờ', NULL, '2025-01-22 16:30:00'),
(10, 12, N'Tư vấn dinh dưỡng', N'http://example.com/prior_exam_10', '2025-01-24', '10:45:00', '11:15:00', N'Đã hủy', N'Bệnh nhân hủy', '2025-01-24 10:45:00'),
(23, 13, N'Tiêm chủng', NULL, '2025-01-25', '12:00:00', '12:30:00', N'Hoàn thành', NULL, '2025-01-25 12:00:00'),
(23, 14, N'Tư vấn chỉnh hình', N'http://example.com/prior_exam_12', '2025-01-26', '11:00:00', '11:45:00', N'Không đến', NULL, '2025-01-26 11:00:00'),
(23, 15, N'Khám tim mạch', NULL, '2025-01-28', '08:00:00', '08:45:00', N'Xác nhận', NULL, '2025-01-28 08:00:00'),
(23, 16, N'Tư vấn chỉnh hình', N'http://example.com/prior_exam_15', '2025-01-29', '13:30:00', '14:00:00', N'Không đến', NULL, '2025-01-29 13:30:00'),
(23, 17, N'Tư vấn sinh sản', NULL, '2025-01-30', '15:00:00', '15:30:00', N'Xác nhận', NULL, '2025-01-30 15:00:00'),
(23, 18, N'Tư vấn hô hấp', N'http://example.com/prior_exam_18', '2025-02-02', '11:30:00', '12:00:00', N'Đã hủy', N'Bệnh nhân hủy', '2025-02-02 11:30:00'),
(23, 19, N'Tư vấn tiêu hóa', NULL, '2025-02-03', '14:45:00', '15:15:00', N'Không đến', NULL, '2025-02-03 14:45:00'),
(23, 20, N'Sơ cứu', N'http://example.com/prior_exam_20', '2025-02-04', '08:30:00', '09:00:00', N'Xác nhận', NULL, '2025-02-04 08:30:00');




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
(1, N'Khát nước tăng và tiểu nhiều', N'Đái tháo đường type 2', N'Điều chỉnh thuốc và tư vấn dinh dưỡng', '2025-01-20', N'Theo dõi đường huyết hàng ngày'),
(2, N'Không có triệu chứng', N'Khám sức khỏe định kỳ: Bình thường', N'Duy trì tập thể dục thường xuyên và chế độ ăn cân bằng', NULL, N'Duy trì khám sức khỏe hàng năm'),
(4, N'Nhìn mờ và khó chịu nhẹ', N'Mỏi mắt', N'Kê toa kính điều chỉnh', '2025-01-30', N'Tái khám nếu triệu chứng tiếp tục'),
(5, N'Giảm thính lực tai trái', N'Suy giảm thính lực một phần', N'Tư vấn sử dụng máy trợ thính', '2025-02-10', N'Tránh tiếp xúc với tiếng ồn lớn'),
(7, N'Mệt mỏi và đường huyết không đều', N'Quản lý đái tháo đường', N'Điều chỉnh liều insulin', '2025-02-05', N'Trao đổi thêm về điều chỉnh trong lần tái khám tiếp theo'),
(13, N'Đau khớp dai dẳng', N'Viêm khớp', N'Vật lý trị liệu và thuốc chống viêm', '2025-02-15', N'Cân nhắc chụp X-quang nếu không cải thiện'),
(17, N'Đau quặn bụng nghiêm trọng', N'Biểu hiện loét dạ dày', N'Kê thuốc kháng acid và hạn chế ăn uống', '2025-02-20', N'Lên lịch nội soi nếu đau tăng'),
(20, N'Cấp cứu: Sốt cao và chóng mặt', N'Nhiễm virus', N'Truyền dịch và nghỉ ngơi', '2025-02-10', N'Theo dõi nhiệt độ hàng ngày và báo cáo nếu có biến chứng'),
(14, N'Đau ngực khi gắng sức', N'Dấu hiệu sớm của bệnh động mạch vành', N'Thay đổi lối sống và liệu pháp aspirin', '2025-02-12', N'Lên lịch kiểm tra gắng sức trong lần khám sau');

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
(10, N'Không hài lòng, cảm giác vội vàng.', 2, N'Bác sĩ không quan tâm đến lo lắng của tôi.', 2, '2025-01-24 11:30:00');



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
(1, N'Bệnh viện Thẩm mỹ Kangnam', N'Tọa lạc tại trung tâm TP.HCM, Kangnam nổi tiếng với công nghệ trị nám tiên tiến.', 1, 'https://kangnamclinic.vn/wp-content/uploads/2021/04/kangnam-1.jpg'),
(1, N'Bệnh viện Thẩm mỹ Việt Mỹ', N'Đội ngũ bác sĩ tay nghề cao, cam kết an toàn và hiệu quả.', 2, 'https://benhvienthammyvietmy.vn/wp-content/uploads/2020/05/vietmy.jpg'),

(2, N'Tiêu chí chọn bệnh viện uy tín', N'Bác sĩ có chuyên môn cao, được cấp phép bởi Bộ Y tế.', 1, 'https://cdn.baogiaothong.vn/resize/w700/2022/08/01/chi-phi-tham-my.jpg'),
(2, N'Tìm hiểu về các dịch vụ', N'Đa dạng dịch vụ thẩm mỹ với công nghệ tiên tiến.', 2, 'https://static.tapchitaichinh.vn/w700/images/upload/anhminhhoa/thuonghieu/thammy.jpg'),

(3, N'Liệu trình chăm sóc da cơ bản', N'Rửa mặt, tẩy da chết, dưỡng ẩm hằng ngày.', 1, 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/1/17/13-1673954360575422583474.jpg'),
(3, N'Sử dụng mặt nạ tự nhiên', N'Các loại mặt nạ từ mật ong, sữa chua và trái cây.', 2, 'https://media.istockphoto.com/id/1129369202/vi/anh/lam-dep-voi-mat-na-tu-nhien.jpg'),

(4, N'Tập luyện thể thao', N'Tập cardio và yoga giúp đốt cháy calo hiệu quả.', 1, 'https://www.verywellfit.com/thmb/pXFcIM4oeR92avb4a4sS2rfX_3s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1026075174-68d3ec19987b40d5b8a7e5997b13c90a.jpg'),
(4, N'Chế độ ăn uống lành mạnh', N'Ưu tiên rau xanh, ngũ cốc và thực phẩm ít calo.', 2, 'https://cdn.tgdd.vn/Files/2021/07/27/1372537/che-do-an-uong-lanh-manh-202107272109301880.jpg'),

(5, N'Dưỡng tóc từ thiên nhiên', N'Sử dụng dầu dừa, bơ và nha đam để dưỡng tóc.', 1, 'https://www.daugoicaocap.com/wp-content/uploads/2020/07/dau-dua-cham-soc-toc.jpg'),
(5, N'Tránh sử dụng hóa chất', N'Hạn chế nhuộm và duỗi tóc quá nhiều.', 2, 'https://www.elle.vn/wp-content/uploads/2018/04/05/elle-viet-nam-duong-toc.jpg'),

(6, N'Thực phẩm giàu vitamin C', N'Cam, dâu tây, ổi giúp sáng da tự nhiên.', 1, 'https://image-us.eva.vn/upload/3-2021/images/2021-05-18/loi-ich-cua-vitamin-c-doi-voi-suc-khoe-da-hoa-qua-giau-vitamin-c-1-1621332571-678-width800height533.jpg'),
(6, N'Thực phẩm chứa collagen', N'Nước hầm xương, cá hồi giúp da căng mịn.', 2, 'https://toplist.vn/images/800px/ca-hoi-368232.jpg'),

(7, N'Nguyên nhân gây mụn', N'Thay đổi hormone, căng thẳng và chế độ ăn uống.', 1, 'https://cdn.hellobacsi.com/wp-content/uploads/2020/05/m%E1%BB%A5n-th%E1%BB%91ng-th%C6%B0%E1%BB%9Dng-1.jpg'),
(7, N'Điều trị bằng dược mỹ phẩm', N'Sử dụng serum chứa BHA hoặc AHA.', 2, 'https://myphamthiennhien.vn/wp-content/uploads/2021/11/BHA.jpg'),

(8, N'Dưỡng ẩm chuyên sâu', N'Sử dụng kem dưỡng ẩm giàu thành phần dưỡng chất.', 1, 'https://image-us.eva.vn/upload/2-2019/images/2019-12-17/cach-cham-soc-da-mua-dong-sach-mun-sang-min-1-1576569054-792-width660height396.jpg'),
(8, N'Tẩy tế bào chết đúng cách', N'Tẩy da chết định kỳ để da thông thoáng.', 2, 'https://znews-photo.zingcdn.me/w660/Uploaded/aobovhp/2020_09_08/skincare.jpg');


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
(N'Tôi rất hài lòng với dịch vụ tại đây!', 1, 1, '2025-01-15 10:00:00', NULL, 5),
(N'Bác sĩ rất tận tâm và nhiệt tình!', 2, 1, '2025-01-16 11:30:00', NULL, 8),
(N'Quá đông, phải chờ đợi rất lâu.', NULL, 2, '2025-01-17 09:45:00', NULL, 3), -- Bình luận nặc danh
(N'Dịch vụ tốt nhưng giá hơi cao.', 30, 3, '2025-01-18 14:00:00', 1, 10),
(N'Bài viết rất hữu ích, cảm ơn!', NULL, 4, '2025-01-19 16:15:00', 2, 7), -- Bình luận nặc danh
(N'Tôi sẽ giới thiệu bạn bè đến khám.', 14, 5, '2025-01-20 18:20:00', NULL, 12),
(N'Không hài lòng lắm, cần cải thiện.', NULL, 6, '2025-01-21 08:30:00', 3, 2), -- Bình luận nặc danh
(N'Bác sĩ ơi, làm thế nào để chăm sóc da sau khi trị liệu?', 20, 7, '2025-01-22 09:00:00', NULL, 15), -- Hỏi đáp trong bài viết
(N'Cảm ơn bạn đã chia sẻ, mình sẽ áp dụng thử!', 25, 7, '2025-01-22 09:30:00', 8, 5); -- Trả lời hỏi đáp


--------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE Payments (
    PaymentId INT NOT NULL IDENTITY(1,1),
    PayerId INT NOT NULL,  -- Bệnh nhân hoặc người giám hộ thanh toán
    ReservationId INT NOT NULL,
    PaymentDate DATETIME DEFAULT GETDATE(),
    ReceptionistId INT DEFAULT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    PaymentStatus NVARCHAR(50) NOT NULL,
    TransactionId NVARCHAR(100) DEFAULT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (PaymentId),
    CONSTRAINT FK_Payments_User FOREIGN KEY (PayerId) REFERENCES Users(UserId),
    CONSTRAINT FK_Payments_Reservation FOREIGN KEY (ReservationId) REFERENCES Reservations(ReservationId),
    CONSTRAINT FK_Payments_Receptionist FOREIGN KEY (ReceptionistId) REFERENCES Receptionists(ReceptionistId)
);

INSERT INTO Payments (PayerId, ReservationId, PaymentDate, ReceptionistId, PaymentMethod, PaymentStatus, TransactionId, Amount)
VALUES 
(1, 1, '2025-03-01 08:30:00', 31, N'Tiền mặt', N'Đã thanh toán', N'TXN12345', 500000),
(2, 2, '2025-03-02 09:00:00', 31, N'Thẻ tín dụng', N'Đã thanh toán', N'TXN12346', 750000),
(13, 3, '2025-03-03 10:15:00', 32, N'Ví điện tử VNPay', N'Đã thanh toán', N'TXN12347', 650000),
(24, 4, '2025-03-04 11:45:00', 32, N'Thẻ ghi nợ', N'Đã thanh toán', N'TXN12348', 820000),
(5, 5, '2025-03-05 13:30:00', 32, N'Tiền mặt', N'Đang xử lý', NULL, 400000),
(6, 6, '2025-03-06 15:00:00', 32, N'Ví điện tử VNPay', N'Chưa thanh toán', NULL, 300000);


















