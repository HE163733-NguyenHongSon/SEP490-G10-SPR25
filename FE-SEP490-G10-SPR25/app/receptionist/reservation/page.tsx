"use client";
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