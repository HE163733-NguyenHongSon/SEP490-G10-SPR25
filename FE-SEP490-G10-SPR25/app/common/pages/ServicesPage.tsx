"use client";
import React, { useEffect, useState } from "react";
import { ServiceList } from "../../guest/components/ServiceList";
import ListService from "../../guest/components/ListService";
import { serviceService } from "../services/serviceService";

interface ServicesPageProps {
  isGuest?: boolean;
  basePath: string; // "/guest" or "/patient"
}

const ServicesPage = ({ isGuest = false, basePath }: ServicesPageProps) => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAllServices();
        setServices(data);
      } catch (err) {
        setError("Failed to fetch services");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center z-10"
      style={{ backgroundImage: 'url("/images/background_specialties.jpeg")' }}
      id="Body"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="relative z-30 w-full">
        <ServiceList services={services} showLoginButton={isGuest} />
      </div>
    </div>
  );
};

export default ServicesPage;
