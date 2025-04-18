import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Calendar, Clock, Star, FileText, BookOpen, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Trang Quản Lý Bác Sĩ",
  description: "Trang quản lý dành cho bác sĩ",
};

export default function DoctorDashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Trang Quản Lý Bác Sĩ</h1>
          <div className="flex space-x-2">
            <Link href="/doctor/appointments">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Xem Lịch Hẹn
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Lịch Hẹn Hôm Nay</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bệnh Nhân</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời Gian</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý Do</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Smith</div>
                      <div className="text-sm text-gray-500">john.smith@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09:00 AM</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Khám sức khỏe định kỳ</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Đã xác nhận</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href="/doctor/appointments/1" className="text-blue-600 hover:text-blue-900 mr-3">Xem</Link>
                  <button className="text-blue-600 hover:text-blue-900">Bắt đầu</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Mary Johnson</div>
                      <div className="text-sm text-gray-500">mary.j@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11:30 AM</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tái khám sau điều trị</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Đã xác nhận</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href="/doctor/appointments/2" className="text-blue-600 hover:text-blue-900 mr-3">Xem</Link>
                  <button className="text-blue-600 hover:text-blue-900">Bắt đầu</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Thao Tác Nhanh</h2>
          </div>
          <div className="space-y-3">
            <Link href="/doctor/schedule" className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Cập Nhật Lịch Làm Việc</p>
                <p className="text-sm text-gray-500">Quản lý thời gian làm việc</p>
              </div>
            </Link>
            <Link href="/doctor/profile" className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Chỉnh Sửa Hồ Sơ</p>
                <p className="text-sm text-gray-500">Cập nhật thông tin cá nhân</p>
              </div>
            </Link>
            <Link href="/doctor/blogs/new" className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Viết Bài Cẩm Nang</p>
                <p className="text-sm text-gray-500">Chia sẻ kiến thức y khoa</p>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Đánh Giá Của Tôi</h2>
            <Link href="/doctor/ratings" className="text-sm text-blue-600 hover:text-blue-800">Xem Tất Cả</Link>
          </div>
          <div className="flex items-center mb-4">
            <div className="bg-yellow-50 p-4 rounded-full mr-3">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-3xl font-bold">4.8</span>
                <span className="text-sm text-gray-500 ml-2">/ 5.0</span>
              </div>
              <p className="text-sm text-gray-500">Dựa trên 157 đánh giá</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="w-14">5 sao</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="w-9 text-right">75%</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-14">4 sao</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <span className="w-9 text-right">20%</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-14">3 sao</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
              <span className="w-9 text-right">5%</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Hồ Sơ Y Tế</h2>
            <Link href="/doctor/medical-records" className="text-sm text-blue-600 hover:text-blue-800">Xem Tất Cả</Link>
          </div>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <p className="font-medium">John Smith</p>
                <span className="text-xs text-gray-500">Hôm nay</span>
              </div>
              <p className="text-sm text-gray-500">Tạo hồ sơ y tế mới</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <p className="font-medium">Mary Johnson</p>
                <span className="text-xs text-gray-500">Hôm qua</span>
              </div>
              <p className="text-sm text-gray-500">Cập nhật kế hoạch điều trị</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <p className="font-medium">Robert Brown</p>
                <span className="text-xs text-gray-500">2 ngày trước</span>
              </div>
              <p className="text-sm text-gray-500">Thêm ghi chú tái khám</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-6 p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Lịch Sắp Tới</h2>
          <Link href="/doctor/schedule" className="text-sm text-blue-600 hover:text-blue-800">Xem Lịch</Link>
        </div>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg flex justify-between items-center">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Hôm nay - 8 Cuộc hẹn</p>
                <p className="text-sm text-gray-500">09:00 AM - 05:00 PM</p>
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-lg flex justify-between items-center">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Ngày mai - 5 Cuộc hẹn</p>
                <p className="text-sm text-gray-500">10:00 AM - 04:00 PM</p>
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-lg flex justify-between items-center">
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium">Hội Nghị Y Khoa</p>
                <p className="text-sm text-gray-500">20/05/2023 - Cả ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-6 p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Cẩm Nang Gần Đây</h2>
          <Link href="/doctor/blogs" className="text-sm text-blue-600 hover:text-blue-800">Xem Tất Cả</Link>
        </div>
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium mb-1">Hiểu Về Tăng Huyết Áp: Nguyên Nhân và Phòng Ngừa</h3>
              <p className="text-sm text-gray-500 mb-2">Đăng ngày 10/05/2023</p>
              <p className="text-sm text-gray-700 line-clamp-2">Tăng huyết áp ảnh hưởng đến hàng triệu người trên toàn thế giới và là nguyên nhân hàng đầu gây bệnh tim. Trong bài viết này, chúng tôi thảo luận về các nguyên nhân phổ biến và chiến lược phòng ngừa...</p>
              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <span>542 lượt xem</span>
                  <span className="mx-2">•</span>
                  <span>15 bình luận</span>
                </div>
                <Link href="/doctor/blogs/edit/1" className="text-blue-600 hover:text-blue-800 text-sm">Chỉnh sửa</Link>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium mb-1">Hướng Dẫn Dinh Dưỡng Cho Bệnh Nhân Tiểu Đường</h3>
              <p className="text-sm text-gray-500 mb-2">Đăng ngày 05/05/2023</p>
              <p className="text-sm text-gray-700 line-clamp-2">Chế độ ăn uống đóng vai trò quan trọng trong việc kiểm soát bệnh tiểu đường. Bài viết này cung cấp các hướng dẫn cụ thể về những loại thực phẩm nên ăn và nên tránh...</p>
              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <span>328 lượt xem</span>
                  <span className="mx-2">•</span>
                  <span>7 bình luận</span>
                </div>
                <Link href="/doctor/blogs/edit/2" className="text-blue-600 hover:text-blue-800 text-sm">Chỉnh sửa</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 