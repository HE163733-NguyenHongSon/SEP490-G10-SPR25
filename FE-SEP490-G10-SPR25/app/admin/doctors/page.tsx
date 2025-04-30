"use client";
import React, { useEffect, useState } from "react";
import PageBreadCrumb from "../components/PageBreadCrumb";
import { Button, Table, Space, Popconfirm, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { doctorService } from "@/common/services/doctorService";
import Link from "next/link";

const DoctorsManagement = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctorDetailDTO | null>(
    null
  );

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await doctorService.getDoctorList();
      setDoctors(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      message.error("Lỗi khi tải danh sách bác sĩ");
      setLoading(false);
    }
  };

  const handleViewDetail = async (doctorId: number) => {
    try {
      setLoading(true);
      const doctorDetail = await doctorService.getDoctorDetailById(doctorId);
      setSelectedDoctor(doctorDetail);
      setDetailModalVisible(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      message.error("Lỗi khi tải thông tin chi tiết bác sĩ");
      setLoading(false);
    }
  };

  const showDeleteConfirm = (doctorId: number) => {
    setSelectedDoctorId(doctorId);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedDoctorId) return;

    try {
      setLoading(true);
      await doctorService.deleteDoctor(selectedDoctorId);
      message.success("Xóa bác sĩ thành công");
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      message.error(
        "Lỗi khi xóa bác sĩ. Bác sĩ có thể đang có lịch khám hoặc cuộc hẹn đang hoạt động."
      );
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setSelectedDoctorId(null);
    }
  };

  const renderDoctorDetailModal = () => {
    return (
      <Modal
        title="Chi tiết bác sĩ"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {selectedDoctor && (
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={selectedDoctor.avatarUrl || "/avatar-placeholder.png"}
                alt={selectedDoctor.userName}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold">
                  {selectedDoctor.academicTitle} {selectedDoctor.degree}{" "}
                  {selectedDoctor.userName}
                </h2>
                <p className="text-gray-500">{selectedDoctor.currentWork}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-bold">Tên đăng nhập</h3>
                <p>{selectedDoctor.userName || "Không có"}</p>
              </div>
              <div>
                <h3 className="font-bold">Mật khẩu</h3>
                <p>••••••••</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold">Chuyên ngành</h3>
                <p>{selectedDoctor.specialtyNames?.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-bold">Kinh nghiệm</h3>
                <p>
                  {selectedDoctor.workExperience?.match(/\d+/)?.[0] || "0"} năm
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold">Mô tả</h3>
              <p>{selectedDoctor.doctorDescription}</p>
            </div>

            <div>
              <h3 className="font-bold">Quá trình đào tạo</h3>
              <p>{selectedDoctor.trainingProcess}</p>
            </div>

            <div>
              <h3 className="font-bold">Kinh nghiệm làm việc</h3>
              <p>{selectedDoctor.workExperience}</p>
            </div>

            <div>
              <h3 className="font-bold">Tổ chức</h3>
              <p>{selectedDoctor.organization}</p>
            </div>

            <div>
              <h3 className="font-bold">Giải thưởng</h3>
              <p>{selectedDoctor.prize}</p>
            </div>

            <div>
              <h3 className="font-bold">Dự án nghiên cứu</h3>
              <p>{selectedDoctor.researchProject}</p>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "doctorId",
      key: "doctorId",
      width: "5%",
    },
    {
      title: "Ảnh",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      width: "8%",
      render: (avatarUrl: string) => (
        <img
          src={avatarUrl || "/avatar-placeholder.png"}
          alt="Doctor Avatar"
          className="w-12 h-12 object-cover rounded-full"
        />
      ),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
      width: "10%",
      render: (userName: string, record: IDoctor) =>
        userName || record.userName,
    },
    {
      title: "Mật khẩu",
      key: "password",
      width: "10%",
      render: () => "••••••••",
    },
    {
      title: "Tên bác sĩ",
      key: "fullName",
      width: "15%",
      render: (record: IDoctor) => (
        <span>
          {record.academicTitle} {record.degree} {record.userName}
        </span>
      ),
    },
    {
      title: "Chuyên khoa",
      dataIndex: "specialtyNames",
      key: "specialtyNames",
      width: "12%",
      render: (specialtyNames: string[]) => specialtyNames?.join(", "),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      width: "8%",
      render: (rating: number) => rating?.toFixed(1) || "Chưa có đánh giá",
    },
    {
      title: "Thao tác",
      key: "actions",
      width: "15%",
      render: (_: unknown, record: IDoctor) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(parseInt(record.userId))}
            type="default"
            size="small"
          >
            Chi tiết
          </Button>
          <Button icon={<EditOutlined />} type="primary" size="small">
            <Link href={`/admin/doctors/${record.userId}/edit`}>Sửa</Link>
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
            onClick={() => showDeleteConfirm(parseInt(record.userId))}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const confirmDeleteModal = () => (
    <Modal
      title="Xác nhận xóa"
      open={deleteModalVisible}
      onOk={handleDelete}
      onCancel={() => setDeleteModalVisible(false)}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <p>
        Bạn có chắc chắn muốn xóa bác sĩ này không? Hành động này không thể hoàn
        tác.
      </p>
      <p className="text-yellow-600 mt-2">
        Lưu ý: Không thể xóa bác sĩ nếu họ có lịch khám hoặc cuộc hẹn đang hoạt
        động. Vui lòng hủy tất cả các cuộc hẹn đang hoạt động trước khi xóa.
      </p>
    </Modal>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý bác sĩ
        </h1>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <PageBreadCrumb pageTitle="Quản lý bác sĩ" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Table
          dataSource={doctors}
          columns={columns}
          loading={loading}
          rowKey="doctorId"
          pagination={{ pageSize: 10 }}
          className="w-full"
        />
      </div>

      {renderDoctorDetailModal()}
      {confirmDeleteModal()}
    </div>
  );
};

export default DoctorsManagement;
