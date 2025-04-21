import React from 'react';
import type { Metadata } from "next";
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft, User, FileText, Plus, CheckCircle, AlarmClock } from 'lucide-react';

export const metadata: Metadata = {
  title: "Chi Tiết Lịch Hẹn",
  description: "Xem và quản lý chi tiết lịch hẹn",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function AppointmentDetailPage({ params }: PageProps) {
  const appointmentId = params.id;
  
  // Dữ liệu lịch hẹn mẫu - trong ứng dụng thực tế, dữ liệu này sẽ được lấy dựa trên ID
  const appointment = {
    id: parseInt(appointmentId),
    patient: {
      id: 101,
      name: "Nguyễn Văn A",
      age: 42,
      gender: "Nam",
      email: "nguyenvana@example.com",
      phone: "0912 345 678",
      image: null
    },
    date: "18/05/2023",
    time: "09:00 - 09:30",
    reason: "Khám định kỳ cho bệnh tăng huyết áp",
    status: "Đã xác nhận",
    previousTreatment: "Kê đơn lisinopril 10mg hàng ngày. Huyết áp 140/85 tại lần khám gần nhất.",
    medicalHistory: [
      { date: "18/04/2023", diagnosis: "Tăng huyết áp", treatment: "Lisinopril 10mg hàng ngày" },
      { date: "15/01/2023", diagnosis: "Cảm cúm thông thường", treatment: "Điều trị triệu chứng" },
      { date: "10/10/2022", diagnosis: "Khám sức khỏe định kỳ", treatment: "Không yêu cầu điều trị" }
    ],
    vitalSigns: {
      bloodPressure: "140/85",
      heartRate: "72 nhịp/phút",
      respiratoryRate: "16 nhịp/phút",
      temperature: "37°C",
      oxygenSaturation: "98%"
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex items-center mb-4">
          <Link href="/doctor/appointments" className="mr-4">
            <button className="p-2 border rounded-md hover:bg-gray-50">
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold">Chi Tiết Lịch Hẹn</h1>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">Thông Tin Bệnh Nhân</h2>
              <p className="text-gray-500">Lịch hẹn #{appointment.id}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/doctor/medical-records/new?patientId=${appointment.patient.id}&appointmentId=${appointment.id}`}>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Cập Nhật Hồ Sơ Y Tế
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold mr-4">
                  {appointment.patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{appointment.patient.name}</h3>
                  <p className="text-gray-500">{appointment.patient.age} tuổi, {appointment.patient.gender}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm">{appointment.patient.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Điện thoại</p>
                  <p className="text-sm">{appointment.patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Trạng thái lịch hẹn</p>
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 md:border-l md:pl-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                    <h4 className="font-medium">Ngày</h4>
                  </div>
                  <p className="text-gray-700 ml-7">{appointment.date}</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                    <h4 className="font-medium">Thời gian</h4>
                  </div>
                  <p className="text-gray-700 ml-7">{appointment.time}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-indigo-500 mr-2" />
                    <h4 className="font-medium">Lý do khám</h4>
                  </div>
                  <p className="text-gray-700 ml-7">{appointment.reason}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-indigo-500 mr-2" />
                    <h4 className="font-medium">Điều trị trước đó</h4>
                  </div>
                  <p className="text-gray-700 ml-7">{appointment.previousTreatment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Cập Nhật Hồ Sơ Y Tế</h2>
            <p className="text-gray-500 mt-1">Thêm hồ sơ y tế mới cho lịch hẹn này</p>
          </div>
          <div className="p-6">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Triệu chứng chính</label>
                  <textarea
                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Nhập triệu chứng chính của bệnh nhân"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chẩn đoán</label>
                  <textarea
                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Nhập chẩn đoán"
                  ></textarea>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Dấu hiệu sinh tồn</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Huyết áp</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="VD: 120/80"
                      defaultValue={appointment.vitalSigns.bloodPressure}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nhịp tim</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="VD: 72 nhịp/phút"
                      defaultValue={appointment.vitalSigns.heartRate}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nhịp thở</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="VD: 16 nhịp/phút"
                      defaultValue={appointment.vitalSigns.respiratoryRate}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nhiệt độ</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="VD: 37°C"
                      defaultValue={appointment.vitalSigns.temperature}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SpO2</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="VD: 98%"
                      defaultValue={appointment.vitalSigns.oxygenSaturation}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kế hoạch điều trị</label>
                <textarea
                  className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Mô tả kế hoạch điều trị cho bệnh nhân"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Đơn thuốc</label>
                <textarea
                  className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Nhập thuốc, liều lượng và hướng dẫn sử dụng"
                ></textarea>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="follow-up"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="follow-up" className="ml-2 block text-sm text-gray-700">
                    Đặt lịch tái khám
                  </label>
                </div>
                <div className="ml-6 mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày tái khám</label>
                    <input
                      type="date"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lý do tái khám</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="VD: Kiểm tra tiến triển"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Lưu nháp
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Hoàn thành khám
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-indigo-50 border-b border-indigo-100">
            <h2 className="font-semibold text-indigo-900">Tiền sử bệnh án</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {appointment.medicalHistory.map((record, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{record.diagnosis}</h3>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{record.treatment}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href={`/doctor/medical-records?patientId=${appointment.patient.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                Xem đầy đủ lịch sử bệnh án →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <h2 className="font-semibold text-blue-900">Ghi chú</h2>
          </div>
          <div className="p-4">
            <textarea
              className="w-full h-32 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Thêm ghi chú cá nhân về lịch hẹn này..."
            ></textarea>
            <div className="mt-3 flex justify-end">
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                Lưu ghi chú
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 