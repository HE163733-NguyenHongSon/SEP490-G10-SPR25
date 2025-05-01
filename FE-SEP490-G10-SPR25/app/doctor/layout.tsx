"use client";

import React, { ReactNode } from "react";
import ProtectedRoute from "../common/components/ProtectedRoute";
import { AppRole } from "../common/types/roles";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import "../globals.css";

import { SidebarProvider } from "../common/contexts/SidebarContext"
import { ThemeProvider } from "../common/contexts/ThemeContext"
import Backdrop from "../doctor/components/Backdrop"

interface DoctorLayoutProps {
  children: ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[AppRole.Doctor]}>
      <div>
        <ThemeProvider>
          <SidebarProvider>
            <div className="min-h-screen xl:flex">
              <Sidebar />
              <Backdrop />
              <div className="flex-1">
                <Header />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </div>
    </ProtectedRoute>
  );
}
