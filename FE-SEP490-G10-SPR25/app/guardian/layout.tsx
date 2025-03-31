"use client";

import React, { ReactNode } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { AppRole } from '../types/roles';

interface GuardianLayoutProps {
  children: ReactNode;
}

export default function GuardianLayout({ children }: GuardianLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[AppRole.Guardian]}>
      <div className="min-h-screen bg-gray-50">
        {/* Guardian layout components như sidebar, header, etc. */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
} 