'use client';
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { serviceService, ServiceDetail } from "../../../../services/serviceSerivce";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ServiceDetailPageProps {
    params: {
        id: string;
    };
}

const ServiceDetailPage = ({ params }: ServiceDetailPageProps) => {
    const [service, setService] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("overall");
    const [retries, setRetries] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                setLoading(true);
                const serviceId = parseInt(params.id);
                if (isNaN(serviceId)) {
                    setError("Invalid service ID");
                    setLoading(false);
                    return;
                }
                
                const serviceData = await serviceService.getServiceDetailById(serviceId);
                setService(serviceData);
                setError(null);
                setLoading(false);
            } catch (error: any) {
                console.error("Error fetching service detail:", error);
                const errorMessage = error.response?.status === 404 
                    ? "Service not found" 
                    : "Failed to load service details. Please try again later.";
                setError(errorMessage);
                setLoading(false);
            }
        };

        fetchServiceDetail();
    }, [params.id, retries]);

    const handleRetry = () => {
        setRetries(prev => prev + 1);
    };

    const handleBookService = () => {
        if (service) {
            router.push(`/patient/booking?serviceId=${service.serviceId}`);
        }
    };

    if (loading) {
        return <div className="min-h-screen w-full flex items-center justify-center">Loading...</div>;
    }

    if (error || !service) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center">
                <p className="text-red-500">{error || "Service not found"}</p>
                <div className="mt-4 flex space-x-4">
                    <button 
                        onClick={handleRetry}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                    <Link href="/patient/services" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6 mt-16">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
                {/* Header Section */}
                <div className="flex items-center space-x-6 border-b pb-4">
                    <div className="relative w-24 h-24">
                        <Image 
                            src={service.image?.startsWith('/') ? service.image : 
                                 service.image?.startsWith('http') ? service.image : 
                                 service.image ? `/${service.image}` : "/images/service.png"} 
                            alt={service.serviceName} 
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{service.serviceName}</h1>
                        <p className="text-gray-500">{service.specialtyName}</p>
                        <div className="flex items-center space-x-4 mt-2">
                            <span className="text-2xl font-semibold text-blue-600">
                                {service.price.toLocaleString()} VNĐ
                            </span>
                            {service.estimatedTime && (
                                <span className="text-sm text-gray-500">
                                    Est. time: {service.estimatedTime}
                                </span>
                            )}
                        </div>
                        <button 
                            onClick={handleBookService}
                            className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Book Service
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-4 flex space-x-8 text-gray-600 border-b pb-2">
                    <span 
                        className={`cursor-pointer ${activeTab === "overall" ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}
                        onClick={() => setActiveTab("overall")}
                    >
                        Overall
                    </span>
                    <span 
                        className={`cursor-pointer ${activeTab === "doctors" ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}
                        onClick={() => setActiveTab("doctors")}
                    >
                        Doctors
                    </span>
                </div>

                {activeTab === "overall" && (
                    <>
                        {/* Overview Section */}
                        <div className="mt-6">
                            <h2 className="font-semibold text-lg">Overview</h2>
                            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                                {service.overview || "No overview information available."}
                            </p>
                        </div>

                        {/* Process Section */}
                        <div className="mt-6">
                            <h2 className="font-semibold text-lg">Process</h2>
                            <p className="text-gray-600 mt-2 text-sm whitespace-pre-line">
                                {service.process || "No process information available."}
                            </p>
                        </div>

                        {/* Treatment Techniques Section */}
                        <div className="mt-6">
                            <h2 className="font-semibold text-lg">Treatment Techniques</h2>
                            <p className="text-gray-600 mt-2 text-sm whitespace-pre-line">
                                {service.treatmentTechniques || "No treatment techniques information available."}
                            </p>
                        </div>

                        {/* Devices Section */}
                        {service.requiredDevices && service.requiredDevices.length > 0 && (
                            <div className="mt-6">
                                <h2 className="font-semibold text-lg">Required Devices</h2>
                                <ul className="text-gray-600 mt-2 text-sm list-disc pl-6">
                                    {service.requiredDevices.map((device, index) => (
                                        <li key={index}><b>{device}</b></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}

                {activeTab === "doctors" && (
                    <div className="mt-6">
                        <h2 className="font-semibold text-lg">Doctors Providing This Service</h2>
                        {service.relatedDoctors && service.relatedDoctors.length > 0 ? (
                            <ul className="text-gray-600 mt-2 text-sm list-disc pl-6">
                                {service.relatedDoctors.map((doctor, index) => (
                                    <li key={index}>{doctor}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 mt-2 text-sm">No doctors currently providing this service.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceDetailPage; 