"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../../common/services/authService";

export default function PatientDashboard() {
  interface User {
    userName: string;
    // Add other properties of the user object here if needed
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      <h1 className="text-3xl font-bold mb-6">Chào mừng, {user.userName}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lịch hẹn sắp tới</h2>
          <p className="text-gray-600">Bạn không có lịch hẹn nào sắp tới.</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Đặt lịch hẹn mới
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Hồ sơ bệnh án</h2>
          <p className="text-gray-600">
            Xem lịch sử khám bệnh và đơn thuốc của bạn.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Xem hồ sơ
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
          <p className="text-gray-600">
            Cập nhật thông tin cá nhân và liên hệ của bạn.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Chỉnh sửa thông tin
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tin tức và thông báo</h2>
        <div className="border-b pb-4 mb-4">
          <h3 className="font-medium">Cập nhật dịch vụ khám mới</h3>
          <p className="text-gray-600">
            Bệnh viện vừa triển khai dịch vụ khám sức khỏe tổng quát với công
            nghệ mới.
          </p>
          <span className="text-sm text-gray-500">2 ngày trước</span>
        </div>
        <div className="border-b pb-4 mb-4">
          <h3 className="font-medium">Lời nhắc tiêm chủng</h3>
          <p className="text-gray-600">
            Đã đến lịch tiêm chủng định kỳ cho bạn. Vui lòng đặt lịch hẹn.
          </p>
          <span className="text-sm text-gray-500">1 tuần trước</span>
        </div>
        <button className="mt-2 text-blue-500 hover:underline">
          Xem tất cả thông báo
        </button>
      </div>
    </div>
  );
}
