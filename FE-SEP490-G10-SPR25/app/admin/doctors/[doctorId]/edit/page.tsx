"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  Card,
  Spin,
  DatePicker,
  Typography,
  Modal,
} from "antd";
import PageBreadCrumb from "../../../components/PageBreadCrumb";
import { doctorService } from "@/common/services/doctorService";
import { specialtyService } from "@/common/services/specialtyService";
import { serviceService } from "@/common/services/serviceService";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

const { TextArea } = Input;
const { Option } = Select;

const DEFAULT_ACADEMIC_TITLES = [
  "GS.TS",
  "PGS.TS",
  "TS",
  "BSCKII",
  "BSCKI",
  "ThS",
  "BS",
];
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
  const [academicTitles, setAcademicTitles] = useState<string[]>(
    DEFAULT_ACADEMIC_TITLES
  );
  const [degrees, setDegrees] = useState<string[]>(DEFAULT_DEGREES);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [actualPassword, setActualPassword] = useState("");
  const [doctorDetail, setDoctorDetail] = useState<IDoctorDetailDTO | null>(
    null
  );
  const router = useRouter();
  const doctorId = parseInt(params.doctorId);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<number[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInitializing(true);

        const fetchedDoctorDetail = await doctorService.getDoctorDetailById(
          doctorId
        );
        setDoctorDetail(fetchedDoctorDetail);

        console.log(
          "API response data:",
          JSON.stringify(fetchedDoctorDetail, null, 2)
        );

        const specialtyList = await specialtyService.getSpecialtyList();
        setSpecialties(specialtyList);
        
        const serviceList = await serviceService.getAllServices();
        setServices(serviceList);
        
        // Xử lý chuyên khoa
        let selectedSpecialtyIds: number[] = [];
        if (fetchedDoctorDetail.specialtyNames && fetchedDoctorDetail.specialtyNames.length > 0) {
          try {
            const matchedSpecialties = specialtyList.filter(s => 
              fetchedDoctorDetail.specialtyNames.includes(s.specialtyName)
            );
            
            if (matchedSpecialties.length > 0) {
              selectedSpecialtyIds = matchedSpecialties
                .map(s => s.specialtyId)
                .map(id => typeof id === 'string' ? parseInt(id) : id)
                .filter(id => !isNaN(id));
              
              setSelectedSpecialties(selectedSpecialtyIds);
            }
          } catch (error) {
            console.error("Error processing specialties:", error);
          }
        }
        
        // Xử lý dịch vụ
        let selectedServiceIds: number[] = [];
        if (fetchedDoctorDetail.services && fetchedDoctorDetail.services.length > 0) {
          try {
            selectedServiceIds = fetchedDoctorDetail.services.map(service => 
              typeof service.serviceId === 'string' ? parseInt(service.serviceId) : service.serviceId
            ).filter(id => !isNaN(id));
            
            setSelectedServices(selectedServiceIds);
          } catch (error) {
            console.error("Error processing services:", error);
          }
        }

        const doctors = await doctorService.getDoctorList();

        const uniqueAcademicTitles = Array.from(
          new Set(
            doctors
              .map((doctor: IDoctor) => doctor.academicTitle)
              .filter(
                (title: string | undefined) => title && title.trim() !== ""
              )
          )
        ) as string[];

        const uniqueDegrees = Array.from(
          new Set(
            doctors
              .map((doctor: IDoctor) => doctor.degree)
              .filter(
                (degree: string | undefined) => degree && degree.trim() !== ""
              )
          )
        ) as string[];

        if (uniqueAcademicTitles.length > 0) {
          setAcademicTitles(uniqueAcademicTitles);
        }

        if (uniqueDegrees.length > 0) {
          setDegrees(uniqueDegrees);
        }

        // Parse date of birth
        let dobValue = undefined;
        try {
          if (fetchedDoctorDetail.dob) {
            // Try to parse the date string using common formats
            const dateFormats = [
              "YYYY-MM-DD",
              "DD/MM/YYYY",
              "MM/DD/YYYY",
              "DD-MM-YYYY",
            ];
            for (const format of dateFormats) {
              const parsedDate = dayjs(fetchedDoctorDetail.dob, format);
              if (parsedDate.isValid()) {
                dobValue = parsedDate;
                break;
              }
            }

            // If parsing with specific formats fails, try automatic parsing
            if (!dobValue) {
              const autoDate = dayjs(fetchedDoctorDetail.dob);
              if (autoDate.isValid()) {
                dobValue = autoDate;
              }
            }
          }
        } catch (error) {
          console.error("Error parsing date:", error);
        }

        if (fetchedDoctorDetail.password) {
          setActualPassword(fetchedDoctorDetail.password);
        }

        form.setFieldsValue({
          userName: fetchedDoctorDetail.userName,
          password: fetchedDoctorDetail.password || "",
          email: fetchedDoctorDetail.email || "",
          doctorName: fetchedDoctorDetail.userName,
          avatarUrl: fetchedDoctorDetail.avatarUrl,
          academicTitle: fetchedDoctorDetail.academicTitle,
          degree: fetchedDoctorDetail.degree,
          currentWork: fetchedDoctorDetail.currentWork,
          organization: fetchedDoctorDetail.organization,
          detailDescription: fetchedDoctorDetail.doctorDescription,
          workExperience: fetchedDoctorDetail.workExperience,
          trainingProcess: fetchedDoctorDetail.trainingProcess,
          researchProject: fetchedDoctorDetail.researchProject,
          prize: fetchedDoctorDetail.prize,
          citizenId: fetchedDoctorDetail.citizenId,
          phone: fetchedDoctorDetail.phone,
          gender: fetchedDoctorDetail.gender,
          dateOfBirth: dobValue,
          address: fetchedDoctorDetail.address,
          specialtyIds: selectedSpecialtyIds,
          serviceIds: selectedServiceIds,
        });
        
        // Ghi log để kiểm tra giá trị đã gán
        console.log("Đã gán giá trị chuyên khoa:", selectedSpecialtyIds);
        console.log("Đã gán giá trị dịch vụ:", selectedServiceIds);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải thông tin bác sĩ. Vui lòng kiểm tra kết nối đến API hoặc thử lại sau."
        );

        setTimeout(() => {
          router.push("/admin/doctors");
        }, 2000);
      } finally {
        setInitializing(false);
      }
    };

    fetchData();
  }, [doctorId, form, router]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const experienceYear = parseInt(
        values.workExperience?.match(/\d+/)?.[0] || "0"
      );

      // Xử lý ngày tháng đúng cách
      let dobValue = "";
      if (values.dateOfBirth) {
        if (values.dateOfBirth.isValid && values.dateOfBirth.isValid()) {
          dobValue = values.dateOfBirth.format("YYYY-MM-DD");
        } else {
          message.error(
            "Định dạng ngày không hợp lệ. Vui lòng chọn ngày hợp lệ."
          );
          return;
        }
      }

      // Chuyển đổi citizenId thành số nguyên
      const citizenIdNum = values.citizenId ? parseInt(values.citizenId.toString()) : 0;
      if (isNaN(citizenIdNum)) {
        message.error("Số CMND/CCCD không hợp lệ. Vui lòng nhập đúng định dạng số.");
        return;
      }

      if (!doctorDetail) {
        message.error("Không có thông tin bác sĩ!");
        return;
      }

      const doctorData = {
        userId: doctorId.toString(),
        userName: values.userName,
        academicTitle: values.academicTitle,
        degree: values.degree,
        avatarUrl: values.avatarUrl,
        currentWork: values.currentWork,
        doctorDescription: values.detailDescription,
        specialtyNames: values.specialtyNames || [],
        numberOfService: values.numberOfService || 0,
        numberOfExamination: values.numberOfExamination || 0,
        rating: values.rating || 0,
        ratingCount: values.ratingCount || 0,
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
        dob: dobValue,
        address: values.address,
        citizenId: citizenIdNum,
        password:
          !values.password || values.password.trim() === ""
            ? actualPassword
            : values.password,
        roleNames: "Doctor",
        isVerify: doctorDetail.isVerify,
        isActive: doctorDetail.isActive,
        specialtyIds: values.specialtyIds,
        serviceIds: values.serviceIds,
      };

      await doctorService.updateDoctor(doctorId, doctorData as any);
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Chỉnh sửa thông tin bác sĩ
        </h1>
      </div>

      <div className="mb-6">
        <PageBreadCrumb pageTitle="Chỉnh sửa thông tin bác sĩ" />
      </div>

      <Card className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Form.Item
              name="userName"
              label="Tên đăng nhập"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập" },
              ]}
            >
              <Input placeholder="Nhập tên đăng nhập" disabled />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu (thay đổi nếu muốn)"
              rules={[{ min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }]}
            >
              <Input.Password placeholder="Mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
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
              rules={[
                { required: true, message: "Vui lòng nhập số CMND/CCCD" },
              ]}
            >
              <Input placeholder="Nhập số CMND/CCCD" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
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
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                allowClear={true}
                placeholder="Chọn ngày sinh"
                popupStyle={{ zIndex: 1060 }}
                disabledDate={(current) => {
                  // Không cho phép chọn ngày trong tương lai
                  return current && current > dayjs().endOf("day");
                }}
              />
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
              rules={[
                { required: true, message: "Vui lòng nhập URL ảnh đại diện" },
              ]}
            >
              <Input placeholder="Nhập URL ảnh đại diện" />
            </Form.Item>

            <Form.Item
              name="academicTitle"
              label="Học hàm/Học vị"
              rules={[
                { required: true, message: "Vui lòng chọn học hàm/học vị" },
              ]}
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
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nơi công tác hiện tại",
                },
              ]}
            >
              <Input placeholder="Nhập nơi công tác hiện tại" />
            </Form.Item>

            <Form.Item
              name="organization"
              label="Tổ chức"
            >
              <Input placeholder="Nhập tổ chức" />
            </Form.Item>

            <Form.Item
              name="specialtyIds"
              label="Chuyên khoa"
              rules={[{ required: true, message: "Vui lòng chọn ít nhất một chuyên khoa" }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn chuyên khoa"
                style={{ width: '100%' }}
                options={specialties.map(s => ({ label: s.specialtyName, value: s.specialtyId }))}
              />
            </Form.Item>
            
            <Form.Item
              name="serviceIds"
              label="Dịch vụ đảm nhận"
              rules={[{ required: true, message: "Vui lòng chọn ít nhất một dịch vụ" }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn dịch vụ đảm nhận"
                style={{ width: '100%' }}
                options={services.map(s => ({ label: s.serviceName, value: s.serviceId }))}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="detailDescription"
            label="Mô tả chi tiết"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả chi tiết" },
            ]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả chi tiết về bác sĩ" />
          </Form.Item>

          <Form.Item
            name="workExperience"
            label="Kinh nghiệm làm việc"
            rules={[
              { required: true, message: "Vui lòng nhập kinh nghiệm làm việc" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Nhập kinh nghiệm làm việc (VD: 5 năm kinh nghiệm...)"
            />
          </Form.Item>

          <Form.Item name="trainingProcess" label="Quá trình đào tạo">
            <TextArea rows={4} placeholder="Nhập quá trình đào tạo" />
          </Form.Item>

          <Form.Item name="researchProject" label="Dự án nghiên cứu">
            <TextArea rows={4} placeholder="Nhập dự án nghiên cứu" />
          </Form.Item>

          <Form.Item name="prize" label="Giải thưởng">
            <TextArea rows={4} placeholder="Nhập giải thưởng" />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Button
              type="default"
              onClick={() => router.back()}
              className="mr-2"
            >
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
