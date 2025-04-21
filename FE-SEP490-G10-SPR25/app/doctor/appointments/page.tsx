import React from 'react';
import type { Metadata } from "next";
import Link from 'next/link';
import { Calendar, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Lịch Hẹn Bác Sĩ",
  description: "Quản lý lịch hẹn của bạn",
};

export default function DoctorAppointmentsPage() {
  const appointments = [
    {
      id: 1,
      patient: {
        id: 101,
        name: "Nguyễn Văn A",
        age: 42,
        gender: "Nam",
        image: null
      },
      date: "18/05/2023",
      time: "09:00 - 09:30",
      reason: "Khám định kỳ cho bệnh tăng huyết áp",
      status: "Đã xác nhận",
      previousTreatment: "Kê đơn lisinopril 10mg hàng ngày. Huyết áp 140/85 tại lần khám gần nhất.",
      medicalHistory: "Chẩn đoán tăng huyết áp vào năm 2018. Không có tình trạng bệnh đáng kể nào khác."
    },
    {
      id: 2,
      patient: {
        id: 102,
        name: "Lê Thị B",
        age: 35,
        gender: "Nữ",
        image: null
      },
      date: "18/05/2023",
      time: "10:30 - 11:00",
      reason: "Tái khám sau điều trị nhiễm khuẩn",
      status: "Đã xác nhận",
      previousTreatment: "Kê đơn amoxicillin 500mg, ngày 3 lần trong 7 ngày từ 11/05.",
      medicalHistory: "Nhiễm trùng đường tiết niệu tái phát. Dị ứng với penicillin."
    },
    {
      id: 3,
      patient: {
        id: 103,
        name: "Trần Văn C",
        age: 65,
        gender: "Nam",
        image: null
      },
      date: "18/05/2023",
      time: "13:00 - 13:30",
      reason: "Đau ngực và khó thở",
      status: "Đã xác nhận",
      previousTreatment: "Không có - Lần đầu khám cho tình trạng này",
      medicalHistory: "Tiểu đường type 2, rối loạn lipid máu. Tiền sử gia đình có bệnh động mạch vành."
    },
    {
      id: 4,
      patient: {
        id: 104,
        name: "Phạm Thị D",
        age: 28,
        gender: "Nữ",
        image: null
      },
      date: "19/05/2023",
      time: "09:30 - 10:00",
      reason: "Khám thai - 3 tháng giữa",
      status: "Đã lên lịch",
      previousTreatment: "Kê đơn vitamin tiền sản chuẩn. Siêu âm ở tuần 12 cho thấy phát triển bình thường.",
      medicalHistory: "G1P0. Không có biến chứng cho đến nay. Không có tiền sử bệnh đáng kể."
    },
    {
      id: 5,
      patient: {
        id: 105,
        name: "Vũ Văn E",
        age: 52,
        gender: "Nam",
        image: null
      },
      date: "19/05/2023",
      time: "11:30 - 12:00",
      reason: "Tái khám đau lưng dưới",
      status: "Đã lên lịch",
      previousTreatment: "Vật lý trị liệu 2 lần/tuần trong 4 tuần. Kê đơn naproxen 500mg, 2 lần/ngày khi cần.",
      medicalHistory: "Đau lưng dưới mãn tính trong hơn 5 năm. Thoái hóa đĩa đệm L4-L5."
    }
  ];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Lịch Hẹn</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Hôm nay
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Lịch hẹn mới
            </button>
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
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Tất cả trạng thái</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="scheduled">Đã lên lịch</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
              <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Tất cả ngày</option>
                <option value="today">Hôm nay</option>
                <option value="tomorrow">Ngày mai</option>
                <option value="this_week">Tuần này</option>
                <option value="next_week">Tuần sau</option>
              </select>
              <button className="p-2 border rounded-md hover:bg-gray-50">
                <Filter className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lịch hẹn hôm nay</h2>
            <div className="text-sm text-gray-500">18/05/2023</div>
          </div>
          
          <div className="space-y-4">
            {appointments.filter(app => app.date === "18/05/2023").map((appointment) => (
              <div key={appointment.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium mr-3">
                      {appointment.patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.patient.name}</h3>
                      <p className="text-sm text-gray-500">{appointment.patient.age} tuổi, {appointment.patient.gender}</p>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">{appointment.time}</p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'Đã xác nhận' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'Đã lên lịch' ? 'bg-blue-100 text-blue-800' : 
                        appointment.status === 'Đã hoàn thành' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'
                      }`}>{appointment.status}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/doctor/appointments/${appointment.id}`}>
                        <button className="px-3 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">
                          Xem
                        </button>
                      </Link>
                      <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Bắt đầu
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Lý do khám</h4>
                      <p className="text-sm text-gray-700">{appointment.reason}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Điều trị trước đó</h4>
                      <p className="text-sm text-gray-700">{appointment.previousTreatment}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Tiền sử bệnh</h4>
                      <p className="text-sm text-gray-700">{appointment.medicalHistory}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href={`/doctor/medical-records?patientId=${appointment.patient.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                      Xem đầy đủ tiền sử bệnh →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lịch hẹn sắp tới</h2>
            <div className="text-sm text-gray-500">19/05/2023</div>
          </div>
          
          <div className="space-y-4">
            {appointments.filter(app => app.date === "19/05/2023").map((appointment) => (
              <div key={appointment.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium mr-3">
                      {appointment.patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.patient.name}</h3>
                      <p className="text-sm text-gray-500">{appointment.patient.age} tuổi, {appointment.patient.gender}</p>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">{appointment.time}</p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'Đã xác nhận' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'Đã lên lịch' ? 'bg-blue-100 text-blue-800' : 
                        appointment.status === 'Đã hoàn thành' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'
                      }`}>{appointment.status}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/doctor/appointments/${appointment.id}`}>
                        <button className="px-3 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">
                          Xem
                        </button>
                      </Link>
                      <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Bắt đầu
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Lý do khám</h4>
                      <p className="text-sm text-gray-700">{appointment.reason}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Điều trị trước đó</h4>
                      <p className="text-sm text-gray-700">{appointment.previousTreatment}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Tiền sử bệnh</h4>
                      <p className="text-sm text-gray-700">{appointment.medicalHistory}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href={`/doctor/medical-records?patientId=${appointment.patient.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                      Xem đầy đủ tiền sử bệnh →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-12 mt-4 flex items-center justify-between">
        <button className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Trước
        </button>
        <div className="flex items-center">
          <span className="px-4 py-2 border rounded-md bg-indigo-50 text-indigo-600 font-medium">1</span>
          <span className="px-4 py-2 text-gray-600">2</span>
          <span className="px-4 py-2 text-gray-600">3</span>
          <span className="px-4 py-2 text-gray-600">...</span>
          <span className="px-4 py-2 text-gray-600">8</span>
        </div>
        <button className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50">
          Sau
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
} 