import React from 'react';

export default function ReceptionistReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4">{children}</div>;
}