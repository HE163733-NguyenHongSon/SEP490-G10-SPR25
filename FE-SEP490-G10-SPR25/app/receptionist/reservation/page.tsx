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
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface IReservation {
  reservationId: number;
  patient: {
    userName: string;
    phone: string;
    email: string;
    citizenId: string;
  };
  doctorSchedule: {
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
}

const Reservation = () => {
  const [form] = Form.useForm();
  const [selectedReservation, setSelectedReservation] =
    useState<IReservation | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const { user } = useUser();
  
  useEffect(() => {
    const fetchReservations = async () => {
      const response = await axios.get(
        "http://localhost:5220/api/Reservations"
      );
      const filtered = response.data.filter(
        (r: IReservation) => r.status === "Đang chờ"
      );
      setReservations(filtered);
    };
    fetchReservations();
  }, []);

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
        prev.filter((r) => r.reservationId !== record.reservationId)
      );
      message.success(`Đã xác nhận lịch hẹn ID: ${record.reservationId}`);
    } catch (error) {
      message.error("Xác nhận thất bại");
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
        prev.filter((r) => r.reservationId !== record.reservationId)
      );
      message.warning(`Đã hủy lịch hẹn ID: ${record.reservationId}`);
    } catch (error) {
      message.error("Hủy lịch thất bại");
    }
  };

  const handleViewDetail = (record: IReservation) => {
    setSelectedReservation(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Mã đặt lịch",
      dataIndex: "reservationId",
      key: "reservationId",
      sorter: (a: IReservation, b: IReservation) =>
        a.reservationId - b.reservationId,
    },
    {
      title: "Họ tên",
      key: "name",
      sorter: (a: IReservation, b: IReservation) =>
        a.patient.userName.localeCompare(b.patient.userName),
      render: (_: any, record: IReservation) => record.patient.userName,
    },
    {
      title: "CCCD",
      key: "citizenId",
      render: (_: any, record: IReservation) => record.patient.citizenId,
    },
    {
      title: "Số điện thoại",
      key: "phone",
      render: (_: any, record: IReservation) => record.patient.phone,
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, record: IReservation) => record.patient.email,
    },
    {
      title: "Ngày hẹn",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      sorter: (a: IReservation, b: IReservation) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedDate",
      key: "updatedDate",
      sorter: (a: IReservation, b: IReservation) =>
        new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime(),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: IReservation) => (
        <Space size="middle">
          <Button
            onClick={() => handleConfirm(record)}
            type="primary"
            size="small"
          >
            Xác nhận
          </Button>
          <Button onClick={() => handleCancel(record)} danger size="small">
            Hủy
          </Button>
          <Button onClick={() => handleViewDetail(record)} size="small">
            Xem chi tiết
          </Button>
        </Space>
      ),
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
        title="Chi tiết đặt lịch"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={700}
      >
        <Form layout="vertical" form={form} initialValues={selectedReservation || {}}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ tên" name={["patient", "userName"]}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CCCD" name={["patient", "citizenId"]}>
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name={["patient", "phone"]}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name={["patient", "email"]}>
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Tên bác sĩ" name={["doctorSchedule", "doctorName"]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Bằng cấp" name={["doctorSchedule", "degree"]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Phòng khám" name={["doctorSchedule", "roomName"]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Địa chỉ" name={["doctorSchedule", "location"]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Dịch vụ" name={["doctorSchedule", "serviceName"]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Giá dịch vụ" name={["doctorSchedule", "servicePrice"]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Ngày trong tuần" name={["doctorSchedule", "dayOfWeek"]}>
            <Input disabled />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Giờ bắt đầu" name={["doctorSchedule", "slotStartTime"]}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giờ kết thúc" name={["doctorSchedule", "slotEndTime"]}>
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Reservation;
