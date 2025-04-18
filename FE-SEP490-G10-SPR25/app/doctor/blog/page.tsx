"use client";

import React from 'react';

export default function DoctorBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cẩm Nang</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Các bài viết mẫu - trong thực tế sẽ lấy từ API */}
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4">
              <span className="text-sm text-blue-600 dark:text-blue-400">
                {new Date(2023, 5 + idx, 1).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <h2 className="text-xl font-semibold mt-2 mb-3">
                Bài viết mẫu {idx + 1}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Đây là mô tả mẫu cho bài viết. Trong ứng dụng thực tế, phần này sẽ chứa nội dung xem trước của bài viết.
              </p>
              <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Đọc Thêm
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 