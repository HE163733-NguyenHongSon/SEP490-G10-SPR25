"use client";
import { useUser } from "@/common/contexts/UserContext";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Select,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Console } from "console";

interface IReservation {
  reservationId: number;
  patient: {
    userName: string;
    phone: string;
    email: string;
    citizenId: string;
  };
  doctorSchedule: {
    doctorScheduleId: number;
    doctorName: string;
    degree: string;
    roomName: string;
    location: string;
    serviceName: string;
    servicePrice: string;
    dayOfWeek: string;
    slotStartTime: string;
    slotEndTime: string;
  };
  appointmentDate: string;
  updatedDate: string;
  status: string;
  paymentStatus: string;
}

const statusFilters = [
  { text: "Đang chờ", value: "Đang chờ" },
  { text: "Xác nhận", value: "Xác nhận" },
  { text: "Đã hủy", value: "Đã hủy" },
  { text: "Hoàn thành", value: "Hoàn thành" },
  { text: "Không đến", value: "Không đến" },
];

const statusColors: Record<string, string> = {
  "Đang chờ": "orange",
  "Xác nhận": "blue",
  "Đã hủy": "red",
  "Hoàn thành": "green",
  "Không đến": "black",
};

const paymentStatusColors: Record<string, string> = {
  "Đã thanh toán": "green",
  "Đang xử lý": "orange",
  "Đã hoàn tiền": "blue",
};

const Reservation = () => {
  const [form] = Form.useForm();
  const [selectedReservation, setSelectedReservation] =
    useState<IReservation | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [alternativeDoctors, setAlternativeDoctors] = useState<any[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [showDoctorList, setShowDoctorList] = useState(false);

  const { user } = useUser();
  const fetchReservations = async () => {
    const response = await axios.get("http://localhost:5220/api/Reservations");
    setReservations(response.data);
  };
  useEffect(() => {
    fetchReservations();
  }, []);

  const handleUpdateDoctorSchedule = async () => {
    if (!selectedReservation || !selectedDoctorId) {
      message.warning("Vui lòng chọn bác sĩ thay thế.");
      return;
    }

    try {
      const url = `http://localhost:5220/api/Reservations/ReplaceDoctor?reservationId=${selectedReservation.reservationId}&doctorScheduleId=${selectedDoctorId}`;

      await axios.put(url);
      setShowDoctorList(false);

      message.success("Đã cập nhật bác sĩ thành công!");

      setAlternativeDoctors([]);
      setSelectedDoctorId(null);
      setIsModalVisible(false);

      // ✅ Gọi lại hàm lấy danh sách lịch hẹn
      fetchReservations(); // <- bạn phải có sẵn hàm này
    } catch (error) {
      message.error("Lỗi khi cập nhật bác sĩ.");
    }
  };

  const handleChangeDoctor = () => {
    if (!selectedReservation) return;
    const reservationId = selectedReservation.reservationId; // <-- Lưu ý: bạn cần đảm bảo object này tồn tại

    handleGetAlternativeDoctors(reservationId);
    setShowDoctorList(true);
  };

  const handleGetAlternativeDoctors = async (reservationId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5220/api/DoctorSchedules/GetAlternativeDoctorList/${reservationId}`
      );

      if (response.data && response.data.length > 0) {
        // Có bác sĩ thay thế, hiển thị danh sách
        setAlternativeDoctors(response.data);
        // setShowDoctorList(true);  // Hiển thị danh sách bác sĩ
        message.success("Danh sách bác sĩ thay thế đã được tải thành công.");
      } else {
        // Không có bác sĩ thay thế
        setAlternativeDoctors([]); // Xóa danh sách bác sĩ
        setShowDoctorList(false); // Ẩn danh sách bác sĩ
        message.warning("Không có bác sĩ phù hợp thay thế.");
      }
    } catch (error) {
      // Lỗi khi gọi API
      setAlternativeDoctors([]); // Xóa danh sách bác sĩ nếu có lỗi
      setShowDoctorList(false); // Ẩn danh sách bác sĩ
      message.error("Lỗi khi tải danh sách bác sĩ thay thế.");
    }
  };

  const handleConfirm = async (record: IReservation) => {
    try {
      await axios.put(
        "http://localhost:5220/api/Reservations/UpdateReservationStatus",
        {
          reservationId: record.reservationId,
          cancellationReason: "",
          status: "Xác nhận",
          updatedByUserId: user?.userId,
          updatedDate: new Date().toISOString(),
        }
      );
      setReservations((prev) =>
        prev.map((r) =>
          r.reservationId === record.reservationId
            ? { ...r, status: "Xác nhận" }
            : r
        )
      );
      message.success(`Xác nhận lịch hẹn ID: ${record.reservationId}`);
    } catch (error) {
      message.error("Xác nhận lịch hẹn thất bại");
    }
  };

  const handleCancel = async (record: IReservation) => {
    try {
      await axios.put(
        "http://localhost:5220/api/Reservations/UpdateReservationStatus",
        {
          reservationId: record.reservationId,
          cancellationReason: "",
          status: "Đã hủy",
          updatedByUserId: user?.userId,
          updatedDate: new Date().toISOString(),
        }
      );
      setReservations((prev) =>
        prev.map((r) =>
          r.reservationId === record.reservationId
            ? { ...r, status: "Đã hủy" }
            : r
        )
      );
      message.warning(`Đã hủy lịch hẹn ID: ${record.reservationId}`);
    } catch (error) {
      message.error("Hủy lịch hẹn thất bại");
    }
  };
  const handleConfirmCancel = async (record: IReservation) => {
    Modal.confirm({
      title: "Xác nhận hủy lịch hẹn",
      content: `Bạn có chắc chắn muốn hủy và hoàn tiền cho lịch hẹn mã ${record.reservationId}?`,
      okText: "Xác nhận",
      cancelText: "Thoát",
      onOk: async () => {
        try {
          const response = await fetch(
            `http://localhost:5220/api/Payments/UpdateStatus?reservationId=${record.reservationId}&status=Đã hoàn tiền`,
            {
              method: "PUT",
            }
          );

          if (!response.ok) {
            throw new Error("Cập nhật thất bại");
          }

          message.success("Đã cập nhật trạng thái hoàn tiền thành công");

          // Cập nhật lại danh sách (nếu có hàm load data thì gọi lại)
          fetchReservations?.();
        } catch (error) {
          console.error("Lỗi khi cập nhật:", error);
          message.error("Cập nhật trạng thái thất bại");
        }
      },
    });
  };

  const handleComplete = async (record: IReservation) => {
    try {
      await axios.put(
        "http://localhost:5220/api/Reservations/UpdateReservationStatus",
        {
          reservationId: record.reservationId,
          cancellationReason: "",
          status: "Hoàn thành",
          updatedByUserId: user?.userId,
          updatedDate: new Date().toISOString(),
        }
      );
      setReservations((prev) =>
        prev.map((r) =>
          r.reservationId === record.reservationId
            ? { ...r, status: "Hoàn thành" }
            : r
        )
      );
      message.success(`Hoàn thành lịch hẹn ID: ${record.reservationId}`);
    } catch (error) {
      message.error("Hoàn thành lịch hẹn thất bại");
    }
  };

  const handleViewDetail = (record: IReservation) => {
    setSelectedReservation(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const renderActions = (record: IReservation) => {
    return (
      <Space>
        <Button onClick={() => handleViewDetail(record)} size="small">
          Chi tiết
        </Button>

        {record.paymentStatus === "Đang xử lý" && (
          <Button
            danger
            size="small"
            onClick={() => handleConfirmCancel(record)}
          >
            Xác nhận hủy
          </Button>
        )}
      </Space>
    );
  };

  const columns: ColumnsType<IReservation> = [
    {
      title: "Mã lịch hẹn",
      dataIndex: "reservationId",
      key: "reservationId",
      sorter: (a, b) => a.reservationId - b.reservationId,
    },
    {
      title: "Tên bệnh nhân",
      key: "name",
      sorter: (a, b) => a.patient.userName.localeCompare(b.patient.userName),
      render: (_, record) => record.patient.userName,
    },
    {
      title: "CCCD",
      key: "citizenId",
      render: (_, record) => record.patient.citizenId,
    },
    {
      title: "Số điện thoại",
      key: "phone",
      render: (_, record) => record.patient.phone,
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => record.patient.email,
    },
    {
      title: "Ngày hẹn",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      sorter: (a, b) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedDate",
      key: "updatedDate",
      sorter: (a, b) =>
        new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime(),
    },
    {
      title: "Trạng thái lịch hẹn",
      key: "status",
      render: (_, record) => (
        <Tag color={statusColors[record.status]}>{record.status}</Tag>
      ),
      filters: statusFilters,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Tiền dịch vụ",
      key: "servicePrice",
      render: (_, record) => record.doctorSchedule.servicePrice,
    },
    {
      title: "Trạng thái thanh toán",
      key: "paymentStatus",
      render: (_, record) => (
        <Tag color={paymentStatusColors[record.paymentStatus]}>
          {record.paymentStatus}
        </Tag>
      ),
      filters: [
        { text: "Đã thanh toán", value: "Đã thanh toán" },
        { text: "Đang xử lý", value: "Đang xử lý" },
        { text: "Đã hoàn tiền", value: "Đã hoàn tiền" },
      ],
      onFilter: (value, record) => record.paymentStatus === value,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => renderActions(record),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quản lý lịch hẹn</h1>
      </div>

      <Table
        dataSource={reservations}
        columns={columns}
        rowKey="reservationId"
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
        }}
      />

      <Modal
        title="Chi tiết lịch hẹn"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={700}
        footer={[
          selectedReservation?.status === "Xác nhận" && !showDoctorList && (
            <Button
              key="change-doctor"
              type="default"
              onClick={() => {
                handleChangeDoctor(); // Gọi API lấy danh sách bác sĩ thay thế
                // setShowDoctorList(true);    // Cho phép hiển thị nút cập nhật + select
              }}
              style={{ backgroundColor: "#4CAF50", color: "#fff" }}
            >
              Danh sách bác sĩ có thể đổi ca
            </Button>
          ),
          selectedReservation?.status === "Xác nhận" && showDoctorList && (
            <Button
              key="update-doctor"
              type="primary"
              onClick={handleUpdateDoctorSchedule}
              disabled={!selectedDoctorId}
            >
              Cập nhật bác sĩ
            </Button>
          ),
          <Button
            key="back"
            onClick={() => {
              setIsModalVisible(false);
              setShowDoctorList(false); // Reset lại khi đóng modal
            }}
          >
            Đóng
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={selectedReservation || {}}
          onFinish={(values) => {
            console.log("Updated values:", values);
            setIsModalVisible(false);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label>
                  Tên bệnh nhân: {selectedReservation?.patient?.userName}{" "}
                </label>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label>CCCD: {selectedReservation?.patient?.citizenId} </label>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label>
                  Số điện thoại: {selectedReservation?.patient?.phone}{" "}
                </label>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label>Email: {selectedReservation?.patient?.email} </label>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label>
                  Tên bác sĩ: {selectedReservation?.doctorSchedule?.doctorName}{" "}
                </label>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label>
                  Chuyên khoa: {selectedReservation?.doctorSchedule?.degree}{" "}
                </label>
              </div>
            </Col>
          </Row>
          <Row>
            <div>
              <label>
                Dịch vụ: {selectedReservation?.doctorSchedule?.serviceName}{" "}
              </label>
            </div>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label>
                  Phòng khám: {selectedReservation?.doctorSchedule?.roomName}{" "}
                </label>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label>
                  Giá dịch vụ:{" "}
                  {selectedReservation?.doctorSchedule?.servicePrice}{" "}
                </label>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label>Ngày hẹn: {selectedReservation?.appointmentDate} </label>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label>
                  Trạng thái lịch hẹn: {selectedReservation?.status}{" "}
                </label>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <label>
                  thời gian: {selectedReservation?.doctorSchedule.slotStartTime}{" "}
                  - {selectedReservation?.doctorSchedule.slotEndTime}{" "}
                </label>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label>
                  Trạng thái thanh toán: {selectedReservation?.paymentStatus}{" "}
                </label>
              </div>
            </Col>
          </Row>
          {selectedReservation?.status === "Xác nhận" &&
            showDoctorList &&
            alternativeDoctors.length > 0 && (
              <Form.Item label="Chọn bác sĩ thay thế">
                <Select
                  placeholder="Chọn bác sĩ mới"
                  value={selectedDoctorId ?? undefined}
                  onChange={(value) => setSelectedDoctorId(value)}
                >
                  {alternativeDoctors.map((doctor) => (
                    <Select.Option
                      key={doctor.doctorScheduleId}
                      value={doctor.doctorScheduleId}
                    >
                      {doctor.doctorName} - {doctor.doctorId}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
        </Form>
      </Modal>
    </div>
  );
};

export default Reservation;
