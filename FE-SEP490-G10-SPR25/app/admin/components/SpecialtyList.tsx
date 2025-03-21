"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaCalendarCheck, FaCog, FaList, FaSignOutAlt, FaUser } from 'react-icons/fa';

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('Specialty List');

  const menuItems = [
    { name: 'Specialty List', icon: <FaList />, path: '/specialty-list' },
    { name: 'Appointment', icon: <FaCalendarCheck />, path: '/appointment' },
    { name: 'Appointment page', icon: <FaCalendarCheck />, path: '/appointment-page' },
    { name: 'Setting', icon: <FaCog />, path: '/setting' },
    { name: 'Profile', icon: <FaUser />, path: '/profile' },
    { name: 'Log out', icon: <FaSignOutAlt />, path: '/logout' },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-lg font-semibold">Doctor</h2>
            <p className="text-sm text-gray-500">Ranking: Gold</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <button
                onClick={() => setSelectedMenu(item.name)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all w-full text-left ${
                  selectedMenu === item.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'
                } hover:bg-blue-400 hover:text-white`}
              >
                <span className="mr-2">{item.icon}</span> {item.name}
              </button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg m-4">
        <h1 className="text-2xl font-semibold mb-4">{selectedMenu}</h1>
        <div className="border p-4 rounded-lg">
          <p>List of items for: {selectedMenu}</p>
          {/* Bạn có thể thêm danh sách dữ liệu động vào đây */}
        </div>
      </div>
    </div>
  );
}
