"use client";

import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { Calendar, Clock, User, Users, FileText, Clipboard } from "lucide-react";
import { getCurrentUser } from "../common/services/authService";

// Import receptionistService with the IReservation interface
import { receptionistService } from "../common/services/receptionistService"; 
import ReservationDetailModal from "./components/ReservationDetailModal";

interface IReservation {
  reservationId: number;
  patient?: {
    userId?: number;
    userName?: string;
    email?: string;
  };
  doctor?: {
    userId?: number;
    userName?: string;
  };
  doctorSchedule?: {
    slotStartTime?: string;
    slotEndTime?: string;
  };
  appointmentDate: string | Date;
  status: string;
  reason?: string;
}

export default function ReceptionistDashboardPage() {
  const [appointments, setAppointments] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todayAppointments, setTodayAppointments] = useState<IReservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get appointments from service
        const data = await receptionistService.getTodayAppointments();
        
        setAppointments(data);
        
        // Filter for today's appointments
        const today = new Date();
        const todayDateStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        
        const todayAppts = data.filter((appointment: IReservation) => {
          const apptDate = new Date(appointment.appointmentDate);
          const apptDateStr = `${apptDate.getDate().toString().padStart(2, '0')}/${(apptDate.getMonth() + 1).toString().padStart(2, '0')}/${apptDate.getFullYear()}`;
          
          return apptDateStr === todayDateStr;
        });

        setTodayAppointments(todayAppts);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError(
          `Không thể tải dữ liệu: ${
            error instanceof Error ? error.message : "Lỗi không xác định"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trang Quản Lý Lễ Tân</h1>
        <Link href="/receptionist/reservation">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Quản Lý Lịch Hẹn
          </button>
        </Link>
      </div>

      {/* 2 box ngang */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Thao tác nhanh */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Thao Tác Nhanh</h2>
          <div className="space-y-3">
            <Link
              href="/receptionist/reservation"
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Quản Lý Lịch Hẹn</p>
                <p className="text-sm text-gray-500">Xem và cập nhật lịch hẹn</p>
              </div>
            </Link>
            <Link
              href="/receptionist/patient"
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Quản Lý Bệnh Nhân</p>
                <p className="text-sm text-gray-500">Xem danh sách bệnh nhân</p>
              </div>
            </Link>
            <Link
              href="/receptionist/doctorSchedule"
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Lịch Làm Việc Bác Sĩ</p>
                <p className="text-sm text-gray-500">Xem lịch trình của các bác sĩ</p>
              </div>
            </Link>
          </div>
        </div>
        {/* Số liệu tổng quan */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold mb-4">Số Liệu Tổng Quan</h2>
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-xl font-bold">{todayAppointments.length}</span>
            <span className="ml-2 text-gray-600">lịch hẹn hôm nay</span>
          </div>
        </div>
      </div>

      {/* Bảng lịch hẹn hôm nay */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Lịch Hẹn Hôm Nay</h2>
        <div className="border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-4 text-center">
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-600">
              <p>{error}</p>
            </div>
          ) : todayAppointments.length === 0 ? (
            <div className="p-4 text-center text-gray-600">
              <p>Không có lịch hẹn nào cho hôm nay</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bệnh Nhân</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bác Sĩ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời Gian</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todayAppointments.map((appointment) => (
                  <tr key={appointment.reservationId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {appointment.patient?.userName?.charAt(0) || "?"}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patient?.userName || "Không có tên"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.patient?.email || "Không có email"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.doctor?.userName || "Chưa phân công"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.doctorSchedule?.slotStartTime?.substring(0,5) || "--:--"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === "Xác nhận" ? "bg-green-100 text-green-800" : 
                        appointment.status === "Chờ xác nhận" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => {
                          setSelectedReservation(appointment);
                          setIsModalVisible(true);
                        }}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal chi tiết */}
      <ReservationDetailModal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        reservation={selectedReservation}
      />
    </div>
  );
}
