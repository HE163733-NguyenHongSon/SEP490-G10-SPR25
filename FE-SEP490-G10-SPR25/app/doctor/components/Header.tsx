"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
export default function Header() {
  const { toggleMobileSidebar } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { user } = useUser()
  
  // Mock session data
  const session = {
    user: {
      name: user?.userName,
      image: null
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleMobileSidebar}
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-end">
          {/* Notifications */}
          <div className="relative mr-4" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold">Thông Báo</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">Lịch hẹn mới đã được đặt</p>
                    <p className="text-sm text-gray-500">Bệnh nhân: Nguyễn Văn B lúc 10:30 AM</p>
                    <p className="text-xs text-gray-400 mt-1">5 phút trước</p>
                  </div>
                  <div className="p-4 border-b border-gray-200 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">Hồ sơ y tế đã được cập nhật</p>
                    <p className="text-sm text-gray-500">Bệnh nhân: Trần Thị C</p>
                    <p className="text-xs text-gray-400 mt-1">2 giờ trước</p>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-200 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-sm focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 mr-2 overflow-hidden">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Ảnh đại diện"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-medium">
                    {session?.user?.name?.charAt(0) || 'B'}
                  </div>
                )}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {session?.user?.name || 'Bs. Nguyễn Văn A'}
              </span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                <Link href="/doctor/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Hồ sơ cá nhân
                </Link>
                <Link href="/doctor/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Cài đặt
                </Link>
                <div className="border-t border-gray-200"></div>
                <Link href="/auth/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Đăng xuất
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 