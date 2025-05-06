"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/common/contexts/SidebarContext";
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navigation: NavItem[] = [
  { name: "Trang Chủ ", href: "/receptionist", icon: HomeIcon },
  { name: "Quản lý Bệnh nhân", href: "/receptionist/patient", icon: UserGroupIcon },
  {
    name: "Quản lý lịch bác sĩ",
    href: "/receptionist/doctorSchedule",
    icon: CalendarIcon,
  },
  {
    name: "Quản lý lịch hẹn",
    href: "/receptionist/reservation",
    icon: ClipboardDocumentListIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out bg-white border-r border-gray-200 ${
        isMobileOpen
          ? "translate-x-0"
          : isExpanded || isHovered
          ? "translate-x-0 lg:w-[290px]"
          : "-translate-x-full lg:translate-x-0 lg:w-[90px]"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1
            className={`text-xl font-semibold ${
              !isExpanded && !isHovered ? "hidden" : ""
            }`}
          >
          Quản Lý Lễ Tân 
          </h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span
                  className={`ml-3 ${
                    !isExpanded && !isHovered ? "hidden" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
