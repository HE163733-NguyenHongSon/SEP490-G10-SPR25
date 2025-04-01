"use client";

import React, { ReactNode, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { AppRole } from '../types/roles';
import { useSidebar } from "@/contexts/SidebarContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Backdrop from "./components/Backdrop";

import { Outfit } from "next/font/google";
import "@/globals.css";

import { SidebarProvider } from "@/contexts/SidebarContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  useEffect(() => {
    console.log('AdminLayout mounted - Admin page is loading');
    console.log('AdminLayout - Current pathname:', window.location.pathname);
  }, []);

  return (
    <ProtectedRoute allowedRoles={[AppRole.Admin]}>
      <div>
        <ThemeProvider>
          <SidebarProvider>
            <LayoutContent>{children}</LayoutContent>
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
