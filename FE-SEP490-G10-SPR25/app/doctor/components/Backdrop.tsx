"use client";

import React from "react";
import { useSidebar } from "@/common/contexts/SidebarContext";

export default function Backdrop() {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden transition-opacity duration-200
      ${isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={toggleMobileSidebar}
    ></div>
  );
}
