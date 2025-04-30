"use client";

import React from "react";
import { useSidebar } from "@/common/contexts/SidebarContext";

export default function Backdrop() {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
}
