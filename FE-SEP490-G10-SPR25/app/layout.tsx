"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/common/contexts/UserContext";
import { Provider } from "react-redux";
import { store } from "./store";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Hospital Appointment System",
//   description: "Hospital Appointment System",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <UserProvider>
          <body className={inter.className}>{children}</body>
        </UserProvider>
      </Provider>
    </html>
  );                        
}
