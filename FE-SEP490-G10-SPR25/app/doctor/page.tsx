"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Calendar, Clock, Star, FileText, BookOpen, User } from "lucide-react";
import { doctorService } from "../common/services/doctorService";
import { getCurrentUser } from "../common/services/authService";

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todayAppointments, setTodayAppointments] = useState<IReservation[]>(
    []
  );

  // Get current user ID
  const getUserId = (): number => {
    const currentDoctor = getCurrentUser();
    if (currentDoctor && currentDoctor.userId) {
      return Number(currentDoctor.userId);
    }
    // Fallback to hardcoded ID if auth fails
    console.warn("Failed to get user ID from auth, using fallback ID");
    return 33;
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const doctorId = getUserId();

        const data = await doctorService.getDoctorAppointments(
          doctorId,
          "Xác nhận"
        );

        setAppointments(data);

        // Filter for today's appointments
        // Create today date object for comparison - using only date part, no time
        const today = new Date();
        const todayDateStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        
        
        const todayAppts = data.filter((appointment) => {
          // Chuyển đổi ngày trong appointment thành định dạng dd/MM/yyyy để so sánh
          const apptDate = new Date(appointment.appointmentDate);
          const apptDateStr = `${apptDate.getDate().toString().padStart(2, '0')}/${(apptDate.getMonth() + 1).toString().padStart(2, '0')}/${apptDate.getFullYear()}`;
          
          // Log để debug
          
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
    <div className="space-y-6">
      {/* Lịch hẹn hôm nay - full width */}
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bệnh Nhân
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thời Gian
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Lý Do
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trạng Thái
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thao Tác
                  </th>
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
                      {appointment.doctorSchedule?.slotStartTime?.substring(
                        0,
                        5
                      ) || "--:--"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.reason || "Không có lý do"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/doctor/appointments/${appointment.reservationId}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Xem
                      </Link>
                      <Link
                        href={`/doctor/appointments/${appointment.reservationId}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Bắt đầu
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Grid 2 cột bên dưới */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái */}
        <div className="space-y-6">
          {/* Lịch sắp tới */}
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Lịch Sắp Tới</h2>
              <Link href="/doctor/appointments" className="text-sm text-blue-600 hover:text-blue-800">Xem Lịch</Link>
            </div>
            {loading ? (
              <div className="p-4 text-center">
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-600">
                <p>{error}</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="p-4 text-center text-gray-600">
                <p>Không có lịch hẹn nào sắp tới</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Group appointments by date */}
                {Object.entries(
                  appointments.reduce(
                    (groups: Record<string, IReservation[]>, appointment) => {
                      const date = new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString("vi-VN");
                      if (!groups[date]) {
                        groups[date] = [];
                      }
                      groups[date].push(appointment);
                      return groups;
                    },
                    {}
                  )
                )
                  .slice(0, 3)
                  .map(([date, dateAppointments]) => (
                    <div
                      key={date}
                      className="p-3 border rounded-lg flex justify-between items-center"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {date} - {dateAppointments.length} Cuộc hẹn
                          </p>
                          <p className="text-sm text-gray-500">
                            {dateAppointments.length > 0 &&
                              dateAppointments[0].doctorSchedule?.slotStartTime?.substring(
                                0,
                                5
                              )}{" "}
                            -
                            {dateAppointments.length > 0 &&
                              dateAppointments[
                                dateAppointments.length - 1
                              ].doctorSchedule?.slotEndTime?.substring(0, 5)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          {/* Thao tác nhanh */}
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Thao Tác Nhanh</h2>
            </div>
            <div className="space-y-3">
              <Link
                href="/doctor/schedule"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Cập Nhật Lịch Làm Việc</p>
                  <p className="text-sm text-gray-500">
                    Quản lý thời gian làm việc
                  </p>
                </div>
              </Link>
              <Link
                href="/doctor/profile"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Chỉnh Sửa Hồ Sơ</p>
                  <p className="text-sm text-gray-500">
                    Cập nhật thông tin cá nhân
                  </p>
                </div>
              </Link>
              <Link
                href="/doctor/blogs/new"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Viết Bài Cẩm Nang</p>
                  <p className="text-sm text-gray-500">
                    Chia sẻ kiến thức y khoa
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* Cột phải */}
        <div className="space-y-6">
          {/* Cẩm nang gần đây */}
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Cẩm Nang Gần Đây</h2>
              <Link href="/doctor/blogs" className="text-sm text-blue-600 hover:text-blue-800">Xem Tất Cả</Link>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="font-medium mb-1">
                    Hiểu Về Tăng Huyết Áp: Nguyên Nhân và Phòng Ngừa
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">Đăng ngày 10/05/2023</p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    Tăng huyết áp ảnh hưởng đến hàng triệu người trên toàn thế giới
                    và là nguyên nhân hàng đầu gây bệnh tim. Trong bài viết này,
                    chúng tôi thảo luận về các nguyên nhân phổ biến và chiến lược
                    phòng ngừa...
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <span>542 lượt xem</span>
                      <span className="mx-2">•</span>
                      <span>15 bình luận</span>
                    </div>
                    <Link
                      href="/doctor/blogs/edit/1"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Chỉnh sửa
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="font-medium mb-1">
                    Hướng Dẫn Dinh Dưỡng Cho Bệnh Nhân Tiểu Đường
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">Đăng ngày 05/05/2023</p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    Chế độ ăn uống đóng vai trò quan trọng trong việc kiểm soát bệnh
                    tiểu đường. Bài viết này cung cấp các hướng dẫn cụ thể về những
                    loại thực phẩm nên ăn và nên tránh...
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <span>328 lượt xem</span>
                      <span className="mx-2">•</span>
                      <span>7 bình luận</span>
                    </div>
                    <Link
                      href="/doctor/blogs/edit/2"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Chỉnh sửa
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
