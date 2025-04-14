"use client";
import { Button, Space, Table, message } from "antd";
import { useState } from "react";

interface IReservation {
  reservationId: number;
  patientId: number;
  name: string;
  phoneNumber: string;
  email: string;
  appointmentDate: string;
  updateDate: string;
}

const Reservation = () => {
  const [reservations] = useState<IReservation[]>([
    {
      reservationId: 1,
      patientId: 23,
      name: "Patient One",
      phoneNumber: "0912345693",
      email: "patient1@example.com",
      appointmentDate: "2025-01-10 09:15:00",
      updateDate: "2025-01-10 09:15:00",
    },
    {
      reservationId: 2,
      patientId: 24,
      name: "Patient Two",
      phoneNumber: "0912345694",
      email: "patient2@example.com",
      appointmentDate: "2025-01-20 13:00:00",
      updateDate: "2025-01-20 13:00:00",
    },
    {
      reservationId: 3,
      patientId: 25,
      name: "Patient Three",
      phoneNumber: "0912345695",
      email: "patient3@example.com",
      appointmentDate: "2025-01-21 15:00:00",
      updateDate: "2025-01-29 13:30:00",
    },
    {
      reservationId: 4,
      patientId: 26,
      name: "Patient Four",
      phoneNumber: "0912345696",
      email: "patient4@example.com",
      appointmentDate: "2025-01-25 11:00:00",
      updateDate: "2025-01-26 09:00:00",
    },
    {
      reservationId: 5,
      patientId: 27,
      name: "Patient Five",
      phoneNumber: "0912345697",
      email: "patient5@example.com",
      appointmentDate: "2025-02-01 16:00:00",
      updateDate: "2025-02-02 10:00:00",
    },
    {
      reservationId: 6,
      patientId: 28,
      name: "Patient Six",
      phoneNumber: "0912345698",
      email: "patient6@example.com",
      appointmentDate: "2025-02-05 14:30:00",
      updateDate: "2025-02-06 09:00:00",
    },
    {
      reservationId: 7,
      patientId: 29,
      name: "Patient Seven",
      phoneNumber: "0912345699",
      email: "patient7@example.com",
      appointmentDate: "2025-02-10 10:00:00",
      updateDate: "2025-02-10 15:00:00",
    },
    {
      reservationId: 8,
      patientId: 30,
      name: "Patient Eight",
      phoneNumber: "0912345700",
      email: "patient8@example.com",
      appointmentDate: "2025-02-15 09:45:00",
      updateDate: "2025-02-16 11:15:00",
    },
  ]);

  const handleConfirm = (record: IReservation) => {
    message.success(`Confirmed reservation ID: ${record.reservationId}`);
  };

  const handleCancel = (record: IReservation) => {
    message.warning(`Cancelled reservation ID: ${record.reservationId}`);
  };

  const columns = [
    {
      title: "ReservationId",
      dataIndex: "reservationId",
      key: "reservationId",
      sorter: (a: IReservation, b: IReservation) => a.reservationId - b.reservationId,
    },
    {
      title: "Patient Id",
      dataIndex: "patientId",
      key: "patientId",
      sorter: (a: IReservation, b: IReservation) => a.patientId - b.patientId,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: IReservation, b: IReservation) => a.name.localeCompare(b.name),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      dataIndex: "updateDate",
      key: "updateDate",
      sorter: (a: IReservation, b: IReservation) =>
        new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime(),
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
          pageSize: 7,
          position: ["bottomCenter"],
        }}
        scroll={{ y: 500 }}
      />
    </div>
  );
};

export default Reservation;
