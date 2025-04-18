import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bệnh Nhân",
  description: "Quản lý bệnh nhân của bạn",
};

export default function DoctorPatientsPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Bệnh Nhân Của Tôi</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bệnh nhân..."
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
              Thêm Bệnh Nhân
            </button>
          </div>
        </div>
      </div>
      
      <div className="col-span-12">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bệnh Nhân
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên Hệ
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tuổi/Giới Tính
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lần Khám Gần Nhất
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
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {index === 1 && "Nguyễn Văn A"}
                            {index === 2 && "Trần Thị B"}
                            {index === 3 && "Lê Văn C"}
                            {index === 4 && "Phạm Thị D"}
                            {index === 5 && "Hoàng Văn E"}
                          </div>
                          <div className="text-sm text-gray-500">P-10{index}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {index === 1 && "0912 345 678"}
                        {index === 2 && "0923 456 789"}
                        {index === 3 && "0934 567 890"}
                        {index === 4 && "0945 678 901"}
                        {index === 5 && "0956 789 012"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {index === 1 && "nguyenvana@example.com"}
                        {index === 2 && "tranthib@example.com"}
                        {index === 3 && "levanc@example.com"}
                        {index === 4 && "phamthid@example.com"}
                        {index === 5 && "hoangvane@example.com"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {index === 1 && "42 / Nam"}
                        {index === 2 && "35 / Nữ"}
                        {index === 3 && "28 / Nam"}
                        {index === 4 && "31 / Nữ"}
                        {index === 5 && "45 / Nam"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index === 1 && "15/05/2023"}
                      {index === 2 && "10/05/2023"}
                      {index === 3 && "28/04/2023"}
                      {index === 4 && "22/04/2023"}
                      {index === 5 && "15/04/2023"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        index === 1 ? 'bg-green-100 text-green-800' : 
                        index === 2 ? 'bg-yellow-100 text-yellow-800' : 
                        index === 3 ? 'bg-blue-100 text-blue-800' : 
                        index === 4 ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {index === 1 && "Đang Hoạt Động"}
                        {index === 2 && "Đang Điều Trị"}
                        {index === 3 && "Theo Dõi"}
                        {index === 4 && "Không Hoạt Động"}
                        {index === 5 && "Nguy Cấp"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        Xem
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Hồ Sơ
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
    </div>
  );
} 