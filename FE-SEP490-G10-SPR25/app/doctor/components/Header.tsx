"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSidebar } from '@/common/contexts/SidebarContext';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/common/contexts/UserContext';
import { logout } from '@/common/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
  const { toggleMobileSidebar } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useUser();
  const router = useRouter();
  
  // Mock session data
  const session = {
    user: {
      name: user?.userName,
      image: null
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      toast.success("Đăng xuất thành công!");
      router.replace('/common/auth/login');
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đăng xuất");
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
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              onClick={toggleMobileSidebar}
              className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center">
            {/* Notifications dropdown */}
            <div className="relative ml-3" ref={notificationsRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Bell className="h-6 w-6" />
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
            <div className="relative ml-3" ref={dropdownRef}>
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
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 