"use client";
import "@/globals.css";
import Navbar from "@/patient/components/Navbar";
import { Footer } from "@/patient/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { AppRole } from '../types/roles';

interface PatientLayoutProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export default function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[AppRole.Patient, AppRole.Guardian]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <main className="p-4">
            {children}
          </main>
        </QueryClientProvider>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
