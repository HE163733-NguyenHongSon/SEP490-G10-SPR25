"use client";
import { Button, Form, Input, message, Modal, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface IReservation {
  reservationId: number;
  patient: {
    userName: string;
    phoneNumber: string;
    email: string;
    citizenId: string;
  };
  appointmentDate: string;
  updatedDate: string;
}

const Reservation = () => {
  const [form] = Form.useForm();
  const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  useEffect(() => {
    const fetchReservations = async () => {
      const response = await axios.get("http://localhost:5220/api/Reservations")
      setReservations(response.data)

      console.log(response.data)
    }
    fetchReservations()
  }, [])
  const handleConfirm = (record: IReservation) => {
    message.success(`Confirmed reservation ID: ${record.reservationId}`);
  };

  const handleCancel = (record: IReservation) => {
    message.warning(`Cancelled reservation ID: ${record.reservationId}`);
  };
  const handleViewDetail = (record: IReservation) => {
    setSelectedReservation(record);
    form.setFieldsValue(record); // Đặt giá trị vào form
    setIsModalVisible(true);
  };
  
  
  const columns = [
    {
      title: "ReservationId",
      dataIndex: "reservationId",
      key: "reservationId",
      sorter: (a: IReservation, b: IReservation) => a.reservationId - b.reservationId,
    },    
    {
      title: "Name",
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
      title: "Phone number",
      key: "phoneNumber",
      render: (_: any, record: IReservation) => record.patient.phoneNumber,
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, record: IReservation) => record.patient.email,
    },
    {
      title: "Appointment date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      sorter: (a: IReservation, b: IReservation) =>
        new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime(),
    },
    {
      title: "Update date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      sorter: (a: IReservation, b: IReservation) =>
        new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IReservation) => (
        <Space size="middle">
          <Button onClick={() => handleConfirm(record)} type="primary" size="small">
            Confirm
          </Button>
          <Button onClick={() => handleCancel(record)} danger size="small">
            Cancel
          </Button>
          <Button onClick={() => handleViewDetail(record)} size="small">
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reservation Management</h1>
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
        title="Edit Reservation"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        width={700}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={selectedReservation || {}}
          onFinish={(values) => {
            console.log("Updated values:", values);
            message.success("Reservation updated successfully!");
            setIsModalVisible(false);
          }}
        >
          <Form.Item label="Reservation ID" name="reservationId">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Name"
            name={["patient", "userName"]}
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CCCD"
            name={["patient", "citizenId"]}
            rules={[{ required: true, message: "Please enter CCCD" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name={["patient", "phoneNumber"]}
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name={["patient", "email"]}
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Appointment Date"
            name="appointmentDate"
            rules={[{ required: true, message: "Please enter appointment date" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Updated Date"
            name="updatedDate"
            rules={[{ required: true, message: "Please enter updated date" }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item>
            <div className="flex justify-end">
              <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form.Item> */}
        </Form>
      </Modal>


    </div>
    
  );
  
};

export default Reservation;
