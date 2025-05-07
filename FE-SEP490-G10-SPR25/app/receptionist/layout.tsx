// app/admin/layout.tsx

"use client";

import React, { ReactNode } from "react";
import ProtectedRoute from "../common/components/ProtectedRoute";
import { AppRole } from "../common/types/roles";
import { useSidebar } from "@/common/contexts/SidebarContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Backdrop from "./components/Backdrop";
import { SignalRProvider } from "@/common/contexts/SignalRContext";

import "@/globals.css";

import { SidebarProvider } from "@/common/contexts/SidebarContext";
import { ThemeProvider } from "@/common/contexts/ThemeContext";

interface ReceptionistLayoutProps {
  children: ReactNode;
}

export default function ReceptionistLayout({
  children,
}: ReceptionistLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[AppRole.Receptionist]}>
      <div>
        <ThemeProvider>
          <SidebarProvider>
            <SignalRProvider hubUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5220'}/hubs/notification`}>
              <LayoutContent>{children}</LayoutContent>
            </SignalRProvider>
          </SidebarProvider>
        </ThemeProvider>
      </div>
    </ProtectedRoute>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <Sidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <Header />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
