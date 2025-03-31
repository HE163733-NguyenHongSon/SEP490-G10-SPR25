"use client";

import React, { ReactNode, useEffect } from 'react';
import Navbar from "../patient/components/Navbar";
import { Footer } from "../patient/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCurrentUser } from '../services/authService';

interface GuestLayoutProps {
  children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  const queryClient = new QueryClient();
  
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Hide any error messages or create placeholders for images
      const errorElement = document.querySelector('.bg-red-100');
      if (errorElement) {
        errorElement.classList.add('hidden');
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <main>
          {children}
        </main>
      </QueryClientProvider>
      <Footer />
    </div>
  );
} 