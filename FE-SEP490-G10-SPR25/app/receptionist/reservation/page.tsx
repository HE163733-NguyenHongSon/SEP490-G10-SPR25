"use client";
import { Button, Space, Table, message } from "antd";
import { useState } from "react";

interface IReservation {
  reservationId: number;
  ServiceInformation: string;
  DoctorScheduleInformation: string;
  ReasonOfReservation: string;
  updateDate: string;
}

const Reservation = () => {
  const [reservations, setReservations] = useState<IReservation[]>([
    {
      reservationId: 1,
      ServiceInformation: "General Consultation Service - 135.000vnd",
      DoctorScheduleInformation: "Examination by PGS.TS.BS.CKII Trần Văn Hinh doctor\nExamination on 15/04/2025 from 9h15p to 10h15p in room A102",
      ReasonOfReservation: "Routine health check",
      updateDate: "2025-04-10",
    },
    {
      reservationId: 2,
      ServiceInformation: "General Consultation Service - 140.000vnd",
      DoctorScheduleInformation: "Examination by PGS.TS.BS.CKII Trần Văn Hinh doctor\nExamination on 10/05/2025 - 9h15p - room A102",
      ReasonOfReservation: "Annual dental maintenance",
      updateDate: "2025-04-11",
    },
    {
      reservationId: 3,
      ServiceInformation: "General Consultation Service - 160.000vnd",
      DoctorScheduleInformation: "Examination by PGS.TS.BS.CKII Trần Văn Hinh doctor\nExamination on 25/05/2025 - 9h15p - room A102",
      ReasonOfReservation: "Vision issues",
      updateDate: "2025-04-12",
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
      title: "Reservation Id",
      dataIndex: "reservationId",
      key: "reservationId",
    },
    {
      title: "Service Information",
      dataIndex: "ServiceInformation",
      key: "ServiceInformation",
      render: (text: string) => (
        <div className="flex items-start space-x-4">
          <img
            src="https://via.placeholder.com/60"
            alt="Service"
            className="w-14 h-14 object-cover rounded-md"
          />
          <div className="text-sm text-gray-900">{text}</div>
        </div>
      ),
    },
    {
      title: "Doctor Schedule Information",
      dataIndex: "DoctorScheduleInformation",
      key: "DoctorScheduleInformation",
      render: (text: string) => (
        <div className="text-sm whitespace-pre-line text-gray-700">
          {text}
        </div>
      ),
    },
    {
      title: "Reason Of Reservation",
      dataIndex: "ReasonOfReservation",
      key: "ReasonOfReservation",
    },
    {
      title: "Update Date",
      dataIndex: "updateDate",
      key: "updateDate",
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

      <Table dataSource={reservations} columns={columns} rowKey="reservationId" />
    </div>
  );
};

export default Reservation;
