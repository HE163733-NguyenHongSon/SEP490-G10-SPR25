"use client";
import ServicesPage from "@/common/pages/ServicesPage";

export default function GuestServicesPage() {
  return <ServicesPage isGuest={true} basePath="/guest" />;
} 