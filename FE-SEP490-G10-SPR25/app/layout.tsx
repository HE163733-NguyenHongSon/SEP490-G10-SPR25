import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/common/contexts/UserContext";
import { SignalRProvider } from '@/common/contexts/SignalRContext';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Appointment System",
  description: "Hospital Appointment System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SignalRProvider hubUrl="http://localhost:5220/hubs/notifications">
          <UserProvider>
            {children}
          </UserProvider>
        </SignalRProvider>
      </body>
    </html>
  );
}
