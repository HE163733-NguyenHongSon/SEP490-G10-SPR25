"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/common/contexts/ThemeContext";
import Image from "next/image";
import { useSidebar } from "@/common/contexts/SidebarContext";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  FileText,
  MessageSquare,
  Settings,
  ChevronRight,
  Clock,
  Star,
  BookOpen,
  User,
  Home,
  Users,
  FileBox,
} from "lucide-react";
import { useUser } from "@/common/contexts/UserContext";
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  const { isExpanded, isHovered } = useSidebar();
  const showLabels = isExpanded || isHovered;
  return (
    <Link
      href={href}
      className={`
      flex items-center px-3 py-2 rounded-md transition-colors
      ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }
    `}
    >
      <div className="flex-shrink-0">{icon}</div>
      {showLabels && (
        <span
          className={`ml-3 transition-opacity ${
            showLabels ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      )}
      {isActive && showLabels && (
        <div className="ml-auto">
          <ChevronRight className="h-4 w-4 text-blue-600" />
        </div>
      )}
    </Link>
  );
}

type SidebarProps = {
  setSidebarOpen?: (open: boolean) => void;
};

export default function Sidebar({ setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const {
    isExpanded,
    isHovered,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
    setIsHovered,
  } = useSidebar();
  const { theme } = useTheme();
  const showLabels = isExpanded || isHovered;
  const { user } = useUser();
  const navigation = [
    { name: "Trang chủ", href: "/doctor", icon: <Home className="h-5 w-5" /> },
    {
      name: "Danh sách lịch hẹn",
      href: "/doctor/appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Hồ sơ y tế",
      href: "/doctor/medical-records",
      icon: <FileBox className="h-5 w-5" />,
    },
    {
      name: "Cẩm nang",
      href: "/doctor/blogs",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Hồ sơ cá nhân",
      href: "/doctor/profile",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const sidebarWidth = isExpanded || isHovered ? "w-64" : "w-20";

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden transition-opacity duration-200
        ${isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMobileSidebar}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 
        transition-all duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${sidebarWidth} lg:sticky`}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => isHovered && setIsHovered(false)}
      >
        <div className="h-16 flex items-center justify-start px-4 border-b border-gray-200 bg-blue-50">
          <Link
            href="/doctor"
            className={cn(
              "text-foreground",
              "hover:text-foreground",
              "flex items-center"
            )}
          >
            <div className="flex-shrink-0 relative flex h-10 w-10 items-center justify-center bg-white rounded-md shadow-sm border border-blue-100">
              <Image
                src="/images/logo.png"
                alt="HealthMate Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            {showLabels && (
              <span className="ml-3 text-lg font-semibold tracking-tight text-blue-700 whitespace-nowrap overflow-hidden text-ellipsis">
                Quản Lý Bác Sĩ
              </span>
            )}
          </Link>
        </div>

        <div className="px-4 py-5">
          <div className="mb-6 flex items-center bg-blue-50 p-3 rounded-lg">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white shadow-sm border border-blue-100">
              <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-700 font-medium">
                D
              </div>
            </div>
            {(isExpanded || isHovered) && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.userName}
                </p>
                <p className="text-xs text-blue-600">Chuyên khoa Tim mạch</p>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                href={item.href}
                icon={item.icon}
                label={item.name}
                isActive={
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                }
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
