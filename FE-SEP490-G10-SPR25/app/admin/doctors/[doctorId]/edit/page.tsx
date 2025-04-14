"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Select, Card, Spin } from "antd";
import PageBreadCrumb from "../../../components/PageBreadCrumb";
import { doctorService } from "@/services/doctorService";
import { DoctorDetailDTO, IDoctor } from "@/types/doctor";
import { useRouter } from "next/navigation";

const { TextArea } = Input;
const { Option } = Select;

const DEFAULT_ACADEMIC_TITLES = ["GS.TS", "PGS.TS", "TS", "BSCKII", "BSCKI", "ThS", "BS"];
const DEFAULT_DEGREES = ["Tiến sĩ", "Thạc sĩ", "Cử nhân", ""];

interface EditDoctorProps {
  params: {
    doctorId: string;
  };
}

const EditDoctor = ({ params }: EditDoctorProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [academicTitles, setAcademicTitles] = useState<string[]>(DEFAULT_ACADEMIC_TITLES);
  const [degrees, setDegrees] = useState<string[]>(DEFAULT_DEGREES);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [actualPassword, setActualPassword] = useState("");
  const router = useRouter();
  const doctorId = parseInt(params.doctorId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInitializing(true);
        
        const [doctors, doctorDetail] = await Promise.all([
          doctorService.getDoctorList(),
          doctorService.getDoctorDetailById(doctorId)
        ]);
        
        console.log("API response data:", JSON.stringify(doctorDetail, null, 2));
        
        const uniqueAcademicTitles = Array.from(
          new Set(
            doctors
              .map((doctor: IDoctor) => doctor.academicTitle)
              .filter((title: string | undefined) => title && title.trim() !== '')
          )
        ) as string[];
        
        const uniqueDegrees = Array.from(
          new Set(
            doctors
              .map((doctor: IDoctor) => doctor.degree)
              .filter((degree: string | undefined) => degree && degree.trim() !== '')
          )
        ) as string[];

        if (uniqueAcademicTitles.length > 0) {
          setAcademicTitles(uniqueAcademicTitles);
        }
        
        if (uniqueDegrees.length > 0) {
          setDegrees(uniqueDegrees);
        }
        
        const formattedDate = doctorDetail.dateOfBirth ? 
          (typeof doctorDetail.dateOfBirth === 'string' ? 
            doctorDetail.dateOfBirth.split('T')[0] : 
            new Date(doctorDetail.dateOfBirth).toISOString().split('T')[0]) : 
          new Date().toISOString().split('T')[0];
        
        if (doctorDetail.password) {
          setActualPassword(doctorDetail.password);
        }
        
        form.setFieldsValue({
          userName: doctorDetail.userName || doctorDetail.doctorName,
          password: doctorDetail.password || "", 
          email: doctorDetail.email || "",
          doctorName: doctorDetail.doctorName,
          avatarUrl: doctorDetail.avatarUrl,
          academicTitle: doctorDetail.academicTitle,
          degree: doctorDetail.degree,
          currentWork: doctorDetail.currentWork,
          organization: doctorDetail.organization,
          detailDescription: doctorDetail.detailDescription,
          workExperience: doctorDetail.workExperience,
          trainingProcess: doctorDetail.trainingProcess,
          researchProject: doctorDetail.researchProject,
          prize: doctorDetail.prize,
          citizenId: doctorDetail.citizenId,
          phone: doctorDetail.phone,
          gender: doctorDetail.gender,
          dateOfBirth: formattedDate,
          address: doctorDetail.address
        });
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error("Không thể tải thông tin bác sĩ. Vui lòng thử lại sau.");
        router.push("/admin/doctors");
      } finally {
        setInitializing(false);
      }
    };

    fetchData();
  }, [doctorId, form, router]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const experienceYear = parseInt(values.workExperience?.match(/\d+/)?.[0] || "0");
      
      const dateOfBirth = new Date(values.dateOfBirth);
      
      const citizenId = values.citizenId ? values.citizenId.toString() : "";
      
      const doctorData: DoctorDetailDTO = {
        doctorId: doctorId,
        doctorName: values.doctorName,
        academicTitle: values.academicTitle,
        degree: values.degree,
        avatarUrl: values.avatarUrl,
        currentWork: values.currentWork,
        basicDescription: values.detailDescription?.substring(0, 50) || "",
        specialtyNames: values.specialtyNames || [],
        numberOfService: values.numberOfService || 0,
        numberOfExamination: values.numberOfExamination || 0,
        rating: values.rating || 0,
        ratingCount: values.ratingCount || 0,
        detailDescription: values.detailDescription,
        workExperience: values.workExperience,
        organization: values.organization,
        prize: values.prize,
        researchProject: values.researchProject,
        trainingProcess: values.trainingProcess,
        schedules: values.schedules || [],
        services: values.services || [],
        feedbacks: values.feedbacks || [],
        relevantDoctors: values.relevantDoctors || [],
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        dateOfBirth: dateOfBirth,
        address: values.address,
        citizenId: citizenId,
        userName: values.userName
      };

      if (!values.password || values.password.trim() === '') {
        // Use actual password if not changed
        doctorData.password = actualPassword;
      } else {
        doctorData.password = values.password;
      }

      await doctorService.updateDoctor(doctorId, doctorData);
      message.success("Cập nhật thông tin bác sĩ thành công!");
      router.push("/admin/doctors");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin bác sĩ:", error);
      message.error("Lỗi khi cập nhật thông tin bác sĩ. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordToggle = (visible: boolean) => {
    setPasswordVisible(visible);    
    return visible;
  };

  if (initializing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải thông tin bác sĩ..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Chỉnh sửa thông tin bác sĩ</h1>
      </div>

      <div className="mb-6">
        <PageBreadCrumb pageTitle="Chỉnh sửa thông tin bác sĩ" />
      </div>

      <Card className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Form.Item
              name="userName"
              label="Tên đăng nhập"
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
            >
              <Input placeholder="Nhập tên đăng nhập" disabled />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu (thay đổi nếu muốn)"
              rules={[
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
              ]}
            >
              <Input.Password 
                placeholder="Mật khẩu hiện tại"
              />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: 'email', message: "Email không hợp lệ" }
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </div>

          <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Form.Item
              name="citizenId"
              label="Số CMND/CCCD"
              rules={[{ required: true, message: "Vui lòng nhập số CMND/CCCD" }]}
            >
              <Input placeholder="Nhập số CMND/CCCD" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Select placeholder="Chọn giới tính">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
                <Option value="Khác">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dateOfBirth"
              label="Ngày sinh"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </div>

          <h2 className="text-xl font-bold mb-4">Thông tin bác sĩ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="doctorName"
              label="Tên bác sĩ"
              rules={[{ required: true, message: "Vui lòng nhập tên bác sĩ" }]}
            >
              <Input placeholder="Nhập tên bác sĩ" />
            </Form.Item>

            <Form.Item
              name="avatarUrl"
              label="URL ảnh đại diện"
              rules={[{ required: true, message: "Vui lòng nhập URL ảnh đại diện" }]}
            >
              <Input placeholder="Nhập URL ảnh đại diện" />
            </Form.Item>

            <Form.Item
              name="academicTitle"
              label="Học hàm/Học vị"
              rules={[{ required: true, message: "Vui lòng chọn học hàm/học vị" }]}
            >
              <Select placeholder="Chọn học hàm/học vị">
                {academicTitles.map((title) => (
                  <Option key={title} value={title}>
                    {title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="degree"
              label="Trình độ"
              rules={[{ required: true, message: "Vui lòng chọn trình độ" }]}
            >
              <Select placeholder="Chọn trình độ">
                {degrees.map((degree) => (
                  <Option key={degree} value={degree}>
                    {degree}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="currentWork"
              label="Nơi công tác hiện tại"
              rules={[{ required: true, message: "Vui lòng nhập nơi công tác hiện tại" }]}
            >
              <Input placeholder="Nhập nơi công tác hiện tại" />
            </Form.Item>

            <Form.Item
              name="organization"
              label="Tổ chức"
            >
              <Input placeholder="Nhập tổ chức" />
            </Form.Item>
          </div>

          <Form.Item
            name="detailDescription"
            label="Mô tả chi tiết"
            rules={[{ required: true, message: "Vui lòng nhập mô tả chi tiết" }]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả chi tiết về bác sĩ" />
          </Form.Item>

          <Form.Item
            name="workExperience"
            label="Kinh nghiệm làm việc"
            rules={[{ required: true, message: "Vui lòng nhập kinh nghiệm làm việc" }]}
          >
            <TextArea rows={4} placeholder="Nhập kinh nghiệm làm việc (VD: 5 năm kinh nghiệm...)" />
          </Form.Item>

          <Form.Item
            name="trainingProcess"
            label="Quá trình đào tạo"
          >
            <TextArea rows={4} placeholder="Nhập quá trình đào tạo" />
          </Form.Item>

          <Form.Item
            name="researchProject"
            label="Dự án nghiên cứu"
          >
            <TextArea rows={4} placeholder="Nhập dự án nghiên cứu" />
          </Form.Item>

          <Form.Item
            name="prize"
            label="Giải thưởng"
          >
            <TextArea rows={4} placeholder="Nhập giải thưởng" />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Button type="default" onClick={() => router.back()} className="mr-2">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditDoctor; 