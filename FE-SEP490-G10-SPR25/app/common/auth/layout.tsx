"use client";
import "@/globals.css";
import Navbar from "@/guest/components/Navbar";
import { Footer } from "@/guest/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/images/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hospital appoiment</title>
      </head>
      <body>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}
