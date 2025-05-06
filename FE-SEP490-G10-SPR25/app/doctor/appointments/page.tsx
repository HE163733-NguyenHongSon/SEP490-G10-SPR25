"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { doctorService } from "../../common/services/doctorService";
import { getCurrentUser } from "../../common/services/authService";

export default function DoctorAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Xác nhận");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IReservation | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentDoctor, setCurrentDoctor] = useState<any>(null);

  // Group appointments by date
  const appointmentsByDate = appointments.reduce(
    (groups: Record<string, IReservation[]>, appointment) => {
      const date = new Date(appointment.appointmentDate).toLocaleDateString(
        "vi-VN"
      );
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appointment);
      return groups;
    },
    {}
  );

  // Debug: Log the grouped appointments
  useEffect(() => {
    if (appointments.length > 0) {
     
    }
  }, [appointments, appointmentsByDate]);

  // Get current user ID from auth
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentDoctor(user);
  }, []);

  // Get current user ID
  const getUserId = () => {
    if (currentDoctor && currentDoctor.userId) {
      return currentDoctor.userId;
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
          statusFilter
        );
       
        setAppointments(data);
        if (data.length === 0) {
        }
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
  }, [statusFilter, currentDoctor]);

  const handleOpenCancelModal = (appointment: IReservation) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCancelAppointment = async () => {
    if (!selectedAppointment || !cancellationReason.trim()) return;

    try {
      await doctorService.cancelAppointment(
        parseInt(selectedAppointment.reservationId),
        cancellationReason
      );

      // Refresh the appointment list
      const doctorId = getUserId();
      const data = await doctorService.getDoctorAppointments(
        doctorId,
        statusFilter
      );
      setAppointments(data);

      // Close the modal and reset state
      setIsModalOpen(false);
      setSelectedAppointment(null);
      setCancellationReason("");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filterAppointments = (appointment: IReservation) => {
    const patientName = appointment.patientName?.toLowerCase() || 
                        appointment.patient?.userName?.toLowerCase() || 
                        "";
    return patientName.includes(searchTerm.toLowerCase());
  };

  const handleStartExamination = (appointment: IReservation) => {
    router.push(`/doctor/appointments/${appointment.reservationId}`);
  };

  // Debug: Check if we have any dates to render
  const hasAppointments = Object.keys(appointmentsByDate).length > 0;

  // Get current date in local date format (no time)
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toLocaleDateString('vi-VN');
  }, []);
  
  // Count appointments for today and future
  const appointmentCounts = useMemo(() => {
    const todayCount = appointments.filter(app => 
      new Date(app.appointmentDate).toLocaleDateString('vi-VN') === today
    ).length;
    
    const futureCount = appointments.length - todayCount;
    
    return { today: todayCount, future: futureCount };
  }, [appointments, today]);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Lịch Hẹn Sắp Tới</h1>
          <div className="flex space-x-2">
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Từ {new Date().toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 mb-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bệnh nhân..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={statusFilter}
                onChange={handleFilterChange}
              >
                <option value="Xác nhận">Đã xác nhận</option>
                <option value="Đang chờ">Chờ xác nhận</option>
                <option value="Hoàn thành">Đã hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <button className="p-2 border rounded-md hover:bg-gray-50">
                <Filter className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {appointments.length > 0 && !loading && !error && (
        <div className="col-span-12 mb-2">
          <div className="flex flex-wrap gap-3">
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200">
              Hôm nay: {appointmentCounts.today} cuộc hẹn
            </div>
            {appointmentCounts.future > 0 && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                Sắp tới: {appointmentCounts.future} cuộc hẹn
              </div>
            )}
            <div className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">
              Tổng cộng: {appointments.length} cuộc hẹn
            </div>
          </div>
        </div>
      )}

      <div className="col-span-12 space-y-4">
        {loading ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-700">
            <p>{error}</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p>Không có lịch hẹn nào trong trạng thái {statusFilter} từ ngày hôm nay trở đi</p>
            <p className="text-sm text-gray-500 mt-2">Vui lòng kiểm tra lại sau hoặc chọn trạng thái khác</p>
          </div>
        ) : !hasAppointments ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p>
              Có dữ liệu nhưng không thể nhóm theo ngày. Kiểm tra định dạng ngày
              tháng.
            </p>
            <pre className="mt-2 text-xs text-left bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(appointments[0], null, 2)}
            </pre>
          </div>
        ) : (
          Object.entries(appointmentsByDate).map(([date, dateAppointments]) => (
            <div key={date} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Lịch hẹn ngày {date}</h2>
                <div className="text-sm text-gray-500">
                  Số lượng: {dateAppointments.length}
                </div>
              </div>

              <div className="space-y-4">
                {dateAppointments
                  .filter(filterAppointments)
                  .map((appointment) => (
                    <div
                      key={appointment.reservationId}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 border-b flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium mr-3">
                            {(appointment.patientName || appointment.patient?.userName || "?").charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-indigo-700">
                              Bệnh nhân: {appointment.patientName || appointment.patient?.userName || "Không có tên"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {appointment.patient?.dob &&
                                `${
                                  new Date().getFullYear() -
                                  new Date(
                                    appointment.patient.dob
                                  ).getFullYear()
                                } tuổi, `}
                              {appointment.patient?.gender || "Không rõ"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0 flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm font-medium">
                              {appointment.doctorSchedule?.slotStartTime?.substring(
                                0,
                                5
                              ) || "--:--"}{" "}
                              -{" "}
                              {appointment.doctorSchedule?.slotEndTime?.substring(
                                0,
                                5
                              ) || "--:--"}
                            </p>
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                appointment.status === "Xác nhận"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "Đang chờ"
                                  ? "bg-blue-100 text-blue-800"
                                  : appointment.status === "Hoàn thành"
                                  ? "bg-gray-100 text-gray-800"
                                  : appointment.status === "Đã hủy"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            {appointment.status === "Xác nhận" && (
                              <button
                                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                onClick={() =>
                                  handleStartExamination(appointment)
                                }
                              >
                                Bắt đầu
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-2">
                              Lý do khám
                            </h4>
                            <p className="text-sm text-gray-700">
                              {appointment.reason || "Không có thông tin"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-2">
                              Phòng khám
                            </h4>
                            <p className="text-sm text-gray-700">
                              {appointment.doctorSchedule?.roomId ||
                                "Chưa có phòng"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-2">
                              Dịch vụ
                            </h4>
                            <p className="text-sm text-gray-700">
                              {appointment.doctorSchedule?.serviceId ||
                                "Không có thông tin"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancellation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Hủy lịch hẹn</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-4">
              Vui lòng cung cấp lý do hủy lịch hẹn với{" "}
              {selectedAppointment?.patient?.userName || "bệnh nhân"}.
            </p>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              rows={4}
              placeholder="Nhập lý do hủy lịch..."
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleCancelAppointment}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={!cancellationReason.trim()}
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
