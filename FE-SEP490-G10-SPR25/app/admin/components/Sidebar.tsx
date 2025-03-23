'use client';

import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white p-6 shadow rounded-lg h-full flex flex-col items-center">
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/avatar.png" // thay bằng ảnh thực tế
          alt="Doctor Avatar"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h2 className="mt-2 text-gray-800 font-semibold text-lg">Bác sĩ</h2>
        <span className="text-sm text-gray-500">Ranking: Gold</span>
        <span className="text-xs text-blue-500 border border-blue-500 rounded-full px-2 mt-1">Verified</span>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {[
          'Danh sách chuyên khoa',
          'Appointment',
          'Appointment page',
          'Setting',
          'Profile',
          'Log out',
        ].map((label, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full text-sm ${
              i === 0
                ? 'bg-blue-500 text-white'
                : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
