// app/receptionist/layout.tsx
import React from 'react';

export default function ReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4">{children}</div>;
}