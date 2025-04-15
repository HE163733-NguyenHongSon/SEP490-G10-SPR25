"use client";
import { Button, Space, Table, message } from "antd";
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
      />
    </div>
  );
};

export default Reservation;
