"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { assets } from "@/public/images/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCurrentUser,
  logout,
  User,
} from "../../common/services/authService";
import { specialtyService } from "@/common/services/specialtyService";
import { doctorService } from "@/common/services/doctorService";
import { serviceService } from "@/common/services/serviceService";
import HomeSearch from "./HomeSearch";
const Navbar: React.FC = () => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const currentPath = usePathname();
  const [suggestedData, setSuggestedData] = useState<ISearchOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specialties = await specialtyService.getSpecialtyList();
        const doctors = await doctorService.getDoctorList();
        const services = await serviceService.getAllServices();

        const suggestedData = [
          ...specialties.map((s: ISpecialty) => ({
            label: s.specialtyName,
            value: s.specialtyId?.toString() || "",
            image: s.image || "",
            type: "specialty",
          })),
          ...doctors.map((d: IDoctor) => ({
            label: d.userName,
            value: d.userId?.toString() || "",
            image: d.avatarUrl || "",
            type: "doctor",
          })),
          ...services.map((s) => ({
            label: s.serviceName,
            value: String(s.serviceId) || "",
            image: s.image || "",
            type: "service",
          })),
        ].filter((item) => item.value !== "");

        setSuggestedData(suggestedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu gợi ý:", error);
      }
    };

    fetchData();
  }, []);

  // Kiểm tra xem có đang ở trang guest không
  const isGuestPage = currentPath?.includes("/guest");

  // Các route chính
  const getHomeRoute = () => (currentUser && !isGuestPage ? "/patient" : "/");

  const routes = [
    { path: getHomeRoute(), name: "Trang chủ" },
    { path: "/patient/specialties", name: "Chuyên khoa" },
    {
      path: "/patient/doctors?sortBy=highest_rated&displayView=grid",
      name: "Bác sĩ",
    },
    { path: "/patient/services", name: "Dịch vụ" },
    { path: "/patient/appointment-booking", name: "Hẹn lịch" },
    { path: "/patient/blogs", name: "Cẩm nang" },
  ];

  // Các route có thể truy cập khi chưa đăng nhập
  const publicRoutes = [
    { path: "/", name: "Trang chủ" },
    { path: "/guest/specialties", name: "Chuyên khoa" },
    { path: "/guest/doctors", name: "Bác sĩ" },
    { path: "/guest/services", name: "Dịch vụ" },
    { path: "/guest/blogs", name: "Cẩm nang" },
  ];

  // Chọn routes hiển thị dựa vào trạng thái đăng nhập và trang hiện tại
  const displayRoutes = currentUser && !isGuestPage ? routes : publicRoutes;

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    toast.success("Đăng xuất thành công!", {
      position: "top-right",
      onClose: () => {
        // Chuyển hướng sau khi toast đóng hoặc sau thời gian ngắn
        setTimeout(() => {
          window.location.href = "/common/auth/login";
        }, 1000); // Đợi 1 giây sau thông báo để người dùng thấy thông báo
      },
    });
  };

  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập khi component được render
    const user = getCurrentUser();
    setCurrentUser(user);

    // Thêm event listener để bắt sự kiện storage thay đổi (đăng nhập/đăng xuất từ tab khác)
    const handleStorageChange = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isShowMobileMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShowMobileMenu]);

  return (
    <div className="fixed top-0 left-0 w-full z-30 bg-black bg-opacity-60 backdrop-blur-md shadow-md">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <div className="flex items-center">
          <Link href={getHomeRoute()} className="flex items-center">
            <Image
              width={40}
              height={40}
              src={assets.logo}
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="ml-2 text-white font-semibold text-lg hidden sm:block">
              Hospital App
            </span>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center justify-center flex-1 ">
          <ul className="flex items-center space-x-8">
            {displayRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={`text-base font-medium hover:text-cyan-400 transition-colors duration-200 ${
                    currentPath === route.path
                      ? "text-cyan-400 font-bold"
                      : "text-white"
                  }`}
                >
                  {route.name}
                </Link>
              </li>
            ))}
            <li>
              <HomeSearch
                fields={[
                  {
                    label: "Tìm tất cả",
                    value: "all",
                    placeholder: "Tìm tất cả...",
                  },
                  {
                    label: "Chuyên khoa",
                    value: "specialty",
                    placeholder: "Tìm chuyên khoa...",
                  },
                  {
                    label: "Bác sĩ",
                    value: "doctor",
                    placeholder: "Tìm bác sĩ...",
                  },
                  {
                    label: "Dịch vụ",
                    value: "service",
                    placeholder: "Tìm dịch vụ...",
                  },
                ]}
                suggestedData={suggestedData}
              />
            </li>
          </ul>
        </nav>
        {/* Authentication - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {currentUser && !isGuestPage ? (
            <div className="flex items-center">
              {/* <div className="text-white mr-4 font-medium">
                Xin chào, {currentUser.userName}
              </div> */}
              <div className="flex items-center gap-3">
                <Link
                  href="/patient/person"
                  className="text-white hover:text-cyan-400 transition-colors duration-200 text-sm font-medium"
                >
                  {currentUser.userName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors duration-200"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/common/auth/login"
                className="text-white hover:text-cyan-400 font-medium transition-colors duration-200"
              >
                Đăng nhập
              </Link>
              <Link
                href="/common/auth/register"
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsShowMobileMenu(true)}
          className="md:hidden text-white p-2 rounded-md hover:bg-gray-700"
          aria-label="Menu"
        >
          <Image
            width={24}
            height={24}
            className="w-6 h-6"
            src={assets.menu}
            alt="Menu"
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isShowMobileMenu && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto">
          <div className="p-4 flex items-center justify-between border-b">
            <Link
              href={getHomeRoute()}
              className="flex items-center"
              onClick={() => setIsShowMobileMenu(false)}
            >
              <Image
                width={40}
                height={40}
                src={assets.logo}
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="ml-2 font-semibold text-lg">Hospital App</span>
            </Link>
            <button
              onClick={() => setIsShowMobileMenu(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700"
            >
              <Image src={assets.close} width={24} height={24} alt="Close" />
            </button>
          </div>

          <div className="px-4 py-6 space-y-1">
            {displayRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  currentPath === route.path
                    ? "text-cyan-600 bg-gray-100"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsShowMobileMenu(false)}
              >
                {route.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 pb-3">
            {currentUser && !isGuestPage ? (
              <div className="px-4 space-y-3">
                <div className="text-base font-medium text-gray-800">
                  Xin chào, {currentUser.userName}
                </div>
                <Link
                  href="/patient/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsShowMobileMenu(false)}
                >
                  Thông tin cá nhân
                </Link>
                <button
                  onClick={() => {
                    setIsShowMobileMenu(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="px-4 flex flex-col space-y-3">
                <Link
                  href="/common/auth/login"
                  className="w-full px-3 py-2 rounded-md text-base font-medium text-center text-white bg-cyan-600 hover:bg-cyan-700"
                  onClick={() => setIsShowMobileMenu(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/common/auth/register"
                  className="w-full px-3 py-2 rounded-md text-base font-medium text-center text-cyan-600 border border-cyan-600 hover:bg-cyan-50"
                  onClick={() => setIsShowMobileMenu(false)}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Navbar;
