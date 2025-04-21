import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ Sơ Y Tế",
  description: "Quản lý hồ sơ y tế của bệnh nhân",
};

export default function DoctorMedicalRecordsPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hồ Sơ Y Tế</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm hồ sơ..."
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Hồ Sơ Mới
            </button>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Hồ Sơ Y Tế Gần Đây</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bệnh Nhân
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại Hồ Sơ
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao Tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200"></div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {index === 1 && "Nguyễn Văn A"}
                            {index === 2 && "Trần Thị B"}
                            {index === 3 && "Lê Văn C"}
                            {index === 4 && "Phạm Thị D"}
                            {index === 5 && "Hoàng Văn E"}
                          </div>
                          <div className="text-xs text-gray-500">P-10{index}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {index === 1 && "Khám Bệnh"}
                        {index === 2 && "Kết Quả Xét Nghiệm"}
                        {index === 3 && "Tiền Sử Bệnh"}
                        {index === 4 && "Đơn Thuốc"}
                        {index === 5 && "Báo Cáo Phẫu Thuật"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index === 1 && "15/05/2023"}
                      {index === 2 && "10/05/2023"}
                      {index === 3 && "05/05/2023"}
                      {index === 4 && "01/05/2023"}
                      {index === 5 && "28/04/2023"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        index === 1 || index === 3 ? 'bg-green-100 text-green-800' : 
                        index === 2 ? 'bg-yellow-100 text-yellow-800' : 
                        index === 4 ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {index === 1 && "Hoàn Thành"}
                        {index === 2 && "Đang Chờ"}
                        {index === 3 && "Hoàn Thành"}
                        {index === 4 && "Đang Xem Xét"}
                        {index === 5 && "Đã Lưu Trữ"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        Xem
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">42</span> kết quả
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Trước
                </button>
                <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Loại Hồ Sơ</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">Khám Bệnh</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">24</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">Kết Quả Xét Nghiệm</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">18</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">Tiền Sử Bệnh</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">15</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">Đơn Thuốc</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">32</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">Báo Cáo Phẫu Thuật</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">7</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Hoạt Động Gần Đây</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-800">Đã thêm kết quả xét nghiệm mới cho <span className="font-medium">Trần Thị B</span></p>
                <p className="text-xs text-gray-500">30 phút trước</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-800">Đã cập nhật tiền sử bệnh cho <span className="font-medium">Lê Văn C</span></p>
                <p className="text-xs text-gray-500">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-800">Đã hoàn thành khám bệnh cho <span className="font-medium">Nguyễn Văn A</span></p>
                <p className="text-xs text-gray-500">5 giờ trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}