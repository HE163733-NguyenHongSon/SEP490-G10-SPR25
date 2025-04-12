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
=======
import React, { useState } from 'react';
import { format } from 'date-fns';

interface Reservation {
  id: number;
  patientId: number;
  name: string;
  phone: string;
  email: string;
  appointmentDate: Date;
  updateDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function ReservationManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      patientId: 23,
      name: 'Patient One',
      phone: '0912345693',
      email: 'patient1@example.com',
      appointmentDate: new Date('2025-01-10T09:15:00'),
      updateDate: new Date('2025-01-10T09:15:00'),
      status: 'pending'
    },
    {
      id: 2,
      patientId: 24,
      name: 'Patient Two',
      phone: '0912345694',
      email: 'patient2@example.com',
      appointmentDate: new Date('2025-01-20T13:00:00'),
      updateDate: new Date('2025-01-20T13:00:00'),
      status: 'pending'
    },
    {
      id: 3,
      patientId: 25,
      name: 'Patient Three',
      phone: '0912345695',
      email: 'patient3@example.com',
      appointmentDate: new Date('2025-01-21T15:00:00'),
      updateDate: new Date('2025-01-29T13:30:00'),
      status: 'pending'
    }
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleConfirm = (reservationId: number) => {
    setReservations(reservations.map(res => 
      res.id === reservationId ? { ...res, status: 'confirmed' } : res
    ));
  };

  const handleCancel = (reservationId: number) => {
    setReservations(reservations.map(res => 
      res.id === reservationId ? { ...res, status: 'cancelled' } : res
    ));
  };

  const filteredReservations = reservations.filter(reservation =>
    reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reservation.phone.includes(searchQuery) ||
    reservation.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Appointment Booking Management</h1>
      
      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter patient's information to search"
          className="w-full p-2 border rounded-lg"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Reservation Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Patient Care</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Reservation ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Patient ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone Number</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Appointment Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Update Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">Support</td>
                <td className="px-4 py-3 text-sm text-gray-600">#{reservation.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">#{reservation.patientId}</td>
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">{reservation.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{reservation.phone}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{reservation.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {format(reservation.appointmentDate, 'yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {format(reservation.updateDate, 'yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className="px-4 py-3 text-sm space-x-2">
                  <button
                    onClick={() => handleConfirm(reservation.id)}
                    className={`px-3 py-1 rounded ${
                      reservation.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                    disabled={reservation.status !== 'pending'}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleCancel(reservation.id)}
                    className={`px-3 py-1 rounded ${
                      reservation.status === 'cancelled' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    disabled={reservation.status !== 'pending'}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
