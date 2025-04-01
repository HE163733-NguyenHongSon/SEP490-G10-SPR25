// app/admin/layout.tsx

"use client";

import React, { ReactNode } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { AppRole } from '../types/roles';

interface ReceptionistLayoutProps {
  children: ReactNode;
}

export default function ReceptionistLayout({ children }: ReceptionistLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[AppRole.Receptionist]}>
      <div className="min-h-screen bg-gray-50">
        {/* Receptionist layout components như sidebar, header, etc. */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
