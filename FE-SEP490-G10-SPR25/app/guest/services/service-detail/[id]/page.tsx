"use client";
import React, { useEffect, useState } from "react";
import { serviceService } from "@/common/services/serviceService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/common/components/BackButton";

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

// Thêm interface cho doctor liên quan nếu cần
interface IRelatedDoctor {
  doctorId: number;
  academicTitle?: string;
  degree?: string;
  doctorName?: string;
  specialtyName?: string;
}

const GuestServiceDetailPage = ({ params }: ServiceDetailPageProps) => {
  const [service, setService] = useState<IServiceDetail | null>(null);
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
          setError("ID dịch vụ không hợp lệ");
          setLoading(false);
          return;
        }

        const serviceData = await serviceService.getServiceDetailById(
          serviceId
        );
        setService(serviceData);
        setError(null);
        setLoading(false);
      } catch (error: unknown) {
        console.error("Lỗi khi tải chi tiết dịch vụ:", error);
        const errorMessage =
          error instanceof Error && error.message.includes("404")
            ? "Không tìm thấy dịch vụ"
            : "Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [params.id, retries]);

  const handleRetry = () => {
    setRetries((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center pt-20">
        <p className="text-red-500">{error || "Không tìm thấy dịch vụ"}</p>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Thử lại
          </button>
          <Link
            href="/guest/services"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Quay lại danh sách dịch vụ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6 pt-28">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 relative">
        <BackButton fallbackPath="/guest/services" />
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6 border-b pb-6 mt-8">
          <div className="relative w-32 h-32 mb-4 md:mb-0">
            <Image
              src={
                service.image
                  ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${service.image}`
                  : "/images/service.png"
              }
              alt={service.serviceName}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{service.serviceName}</h1>
            <p className="text-gray-600">{service.specialtyName}</p>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-2">
              <span className="text-xl md:text-2xl font-semibold text-cyan-600">
                {service.price.toLocaleString()} VNĐ
              </span>
              {service.estimatedTime && (
                <span className="text-sm text-gray-500">
                  Thời gian ước tính: {service.estimatedTime}
                </span>
              )}
            </div>
            <div className="mt-4">
              <Link href="/common/auth/login">
                <button className="px-5 py-2 bg-cyan-500 text-white rounded-lg shadow-md hover:bg-cyan-600 transition">
                  Đăng nhập để đặt lịch
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex space-x-8 text-gray-600 border-b pb-2">
          <span
            className={`cursor-pointer ${
              activeTab === "overall"
                ? "font-semibold text-cyan-600 border-b-2 border-cyan-600 pb-1"
                : ""
            }`}
            onClick={() => setActiveTab("overall")}
          >
            Tổng quan
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "doctors"
                ? "font-semibold text-cyan-600 border-b-2 border-cyan-600 pb-1"
                : ""
            }`}
            onClick={() => setActiveTab("doctors")}
          >
            Bác sĩ
          </span>
        </div>

        {activeTab === "overall" && (
          <>
            {/* Overview Section */}
            <div className="mt-6">
              <h2 className="font-semibold text-lg text-gray-800">Tổng quan</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {service.overview || "Không có thông tin tổng quan."}
              </p>
            </div>

            {/* Process Section */}
            <div className="mt-6">
              <h2 className="font-semibold text-lg text-gray-800">Quy trình</h2>
              <div className="text-gray-600 mt-2 whitespace-pre-line">
                {service.process ? (
                  <div dangerouslySetInnerHTML={{ __html: service.process }} />
                ) : (
                  "Không có thông tin về quy trình."
                )}
              </div>
            </div>

            {/* Treatment Techniques Section */}
            <div className="mt-6">
              <h2 className="font-semibold text-lg text-gray-800">Kỹ thuật điều trị</h2>
              <div className="text-gray-600 mt-2 whitespace-pre-line">
                {service.treatmentTechniques ? (
                  <div dangerouslySetInnerHTML={{ __html: service.treatmentTechniques }} />
                ) : (
                  "Không có thông tin về kỹ thuật điều trị."
                )}
              </div>
            </div>

            {/* Devices Section */}
            {service.requiredDevices && service.requiredDevices.length > 0 && (
              <div className="mt-6">
                <h2 className="font-semibold text-lg text-gray-800">Thiết bị yêu cầu</h2>
                <ul className="text-gray-600 mt-2 list-disc pl-6">
                  {service.requiredDevices.map(
                    (device: string, index: number) => (
                      <li key={index} className="mb-1">
                        {device}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </>
        )}

        {activeTab === "doctors" && (
          <div className="mt-6">
            <h2 className="font-semibold text-lg text-gray-800">
              Bác sĩ cung cấp dịch vụ này
            </h2>
            {service.relatedDoctors && service.relatedDoctors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {service.relatedDoctors.map((doctor, index) => {
                  const isObjectDoctor = typeof doctor !== "string" && doctor !== null;
                  const doctorObj = isObjectDoctor ? doctor as unknown as IRelatedDoctor : null;
                  
                  return (
                    <Link 
                      key={index}
                      href={isObjectDoctor && doctorObj?.doctorId 
                        ? `/guest/doctors/doctor-detail/${doctorObj.doctorId}` 
                        : "#"
                      }
                      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
                    >
                      <div className="font-medium text-cyan-600">
                        {typeof doctor === "string"
                          ? doctor
                          : isObjectDoctor && doctorObj
                          ? `${doctorObj.academicTitle || ""} ${doctorObj.degree || ""} ${
                              doctorObj.doctorName || ""
                            }`.trim()
                          : "Chưa rõ thông tin"}
                      </div>
                      {isObjectDoctor && doctorObj?.specialtyName && (
                        <div className="text-sm text-gray-600 mt-1">
                          Chuyên khoa: {doctorObj.specialtyName}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600 mt-2">
                Hiện không có bác sĩ nào cung cấp dịch vụ này.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="text-center mt-8 mb-4 w-full max-w-4xl">
        <p className="text-lg mb-4">Hãy đăng nhập để đặt lịch khám với dịch vụ {service.serviceName}</p>
        <Link href="/common/auth/login">
          <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white text-lg font-medium">
            Đăng nhập ngay
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GuestServiceDetailPage; 