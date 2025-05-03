"use client";
import "@/globals.css";
import Navbar from "@/patient/components/Navbar";
import { Footer } from "@/patient/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../patient/store";

interface GuestLayoutProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <main className="p-4">{children}</main>
        </QueryClientProvider>
        <Footer />
      </div>
    </Provider>
  );
} 