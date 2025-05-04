"use client";
import "@/globals.css";
import Navbar from "@/guest/components/Navbar";
import { Footer } from "@/guest/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

interface GuestLayoutProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <main className="p-4">{children}</main>
      </QueryClientProvider>
      <Footer />
    </div>
  );
}
