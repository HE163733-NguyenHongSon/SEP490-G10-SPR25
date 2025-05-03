"use client";

import Image from 'next/image';
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "@/common/components/BackButton";

export default function GuestSpecialtyDetails() {
  const router = useRouter();
  const { id } = useParams()

  interface SpecialtyDetail {
    specialtyId: number;
    specialtyName: string;
    specialtyDescription: string;
    image: string;
    devices: string[];
    services: IService[];
    doctors: {
      doctorId: number;
      academicTitle: string;
      degree: string;
      doctorName: string;
      experience: string;
      avatarImage: string;
    }[];
  }

  const [specialty, setSpecialty] = useState<SpecialtyDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overall");
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Specialties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecialty(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching specialty:", error);
        setLoading(false);
      });
  }, [id])

  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-28">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto relative">
        {/* Nút Back */}
        <BackButton fallbackPath="/guest/specialties" />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-start mb-6 mt-8">
              {/* Left - text */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-black">{specialty?.specialtyName || "Loading..."}</h1>
                <div className="text-gray-600 mt-2 space-y-2">
                  <Link href="/common/auth/login" className="block">
                    <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg shadow hover:bg-cyan-600 transition">
                      Đăng nhập để đặt lịch
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right - image */}
              <div className="w-64 h-48 ml-2">
                <Image
                  src={`${imgUrl}/${specialty?.image}`}
                  alt="Specialty"
                  width={256}
                  height={192}
                  className="w-full h-full object-cover rounded-lg shadow"
                  unoptimized
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b mb-6">
              <button 
                className={`pb-2 ${activeTab === 'overall' ? 'border-b-2 border-cyan-500 text-cyan-500 font-semibold' : 'text-gray-500 hover:text-cyan-500'}`}
                onClick={() => setActiveTab('overall')}
              >
                Tổng quan
              </button>
              <button 
                className={`pb-2 ${activeTab === 'doctors' ? 'border-b-2 border-cyan-500 text-cyan-500 font-semibold' : 'text-gray-500 hover:text-cyan-500'}`}
                onClick={() => setActiveTab('doctors')}
              >
                Bác sĩ
              </button>
              <button 
                className={`pb-2 ${activeTab === 'services' ? 'border-b-2 border-cyan-500 text-cyan-500 font-semibold' : 'text-gray-500 hover:text-cyan-500'}`}
                onClick={() => setActiveTab('services')}
              >
                Dịch vụ
              </button>
            </div>

            {/* Content */}
            {activeTab === 'overall' && (
              <div>
                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-black">Mô tả</h2>
                  <p className="text-gray-700">
                    {specialty?.specialtyDescription || "Không có mô tả."}
                  </p>
                </div>

                {/* Devices */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-black">Thiết bị</h2>
                  {specialty?.devices && specialty.devices.length > 0 ? (
                    <ul className="text-gray-700 list-disc pl-5">
                      {specialty.devices.map((device, index) => (
                        <li key={index}>{device}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">Không có thông tin về thiết bị.</p>
                  )}
                </div>

                {/* Process - Hiển thị process từ dịch vụ đầu tiên nếu có */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-black">Quy trình</h2>
                  {specialty?.services && specialty.services.length > 0 && specialty.services[0].process ? (
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: specialty.services[0].process }} />
                  ) : (
                    <ul className="text-gray-700 list-disc pl-5">
                      <li>Đăng ký qua đường dây nóng hoặc tại bệnh viện.</li>
                      <li>Nhận xác nhận và chuẩn bị tài liệu.</li>
                      <li>Tham khảo ý kiến bác sĩ và thực hiện các hành động y tế cần thiết.</li>
                      <li>Nhận đơn thuốc và thuốc.</li>
                    </ul>
                  )}
                </div>

                {/* Relevant Services */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-black">Dịch vụ liên quan</h2>
                  {specialty?.services && specialty.services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {specialty.services.map((service) => (
                        <Link 
                          key={service.serviceId} 
                          href={`/guest/services/service-detail/${service.serviceId}`}
                          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                        >
                          <div className="w-full h-40 mb-3">
                            <Image
                              src={service.image ? `${imgUrl}/${service.image}` : "https://via.placeholder.com/150?text=Service"}
                              alt={service.serviceName}
                              className="w-full h-full object-cover rounded-t-lg"
                              width={150}
                              height={150}
                              unoptimized
                            />
                          </div>
                          <h3 className="font-semibold text-md">{service.serviceName}</h3>
                          <p className="text-sm text-gray-600 mt-1 truncate">{service.overview}</p>
                          <p className="text-sm text-cyan-600 mt-2 font-semibold">{service.price.toLocaleString('vi-VN')} VNĐ</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">Không có dịch vụ nào cho chuyên khoa này.</p>
                  )}
                </div>
              </div>
            )}

            {/* Doctors Tab */}
            {activeTab === 'doctors' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-black">Bác sĩ chuyên khoa {specialty?.specialtyName}</h2>
                {specialty?.doctors && specialty.doctors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialty.doctors.map((doctor) => (
                      <Link 
                        key={doctor.doctorId} 
                        href={`/guest/doctors/doctor-detail/${doctor.doctorId}`}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center"
                      >
                        <div className="w-32 h-32 mb-3 rounded-full overflow-hidden">
                          <Image
                            src={doctor.avatarImage ? `${imgUrl}/${doctor.avatarImage}` : "https://via.placeholder.com/150?text=Doctor"}
                            alt={doctor.doctorName}
                            className="w-full h-full object-cover"
                            width={150}
                            height={150}
                            unoptimized
                          />
                        </div>
                        <h3 className="font-semibold text-md text-center">
                          {doctor.academicTitle} {doctor.degree} {doctor.doctorName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 text-center">Chuyên khoa {specialty.specialtyName}</p>
                        <p className="text-sm text-gray-600 mt-1 text-center">{doctor.experience}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">Không có bác sĩ nào cho chuyên khoa này.</p>
                )}
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-black">Dịch vụ của {specialty?.specialtyName}</h2>
                {specialty?.services && specialty.services.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialty.services.map((service) => (
                      <Link 
                        key={service.serviceId} 
                        href={`/guest/services/service-detail/${service.serviceId}`}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="w-full h-40 mb-3">
                          <Image
                            src={service.image ? `${imgUrl}/${service.image}` : "https://via.placeholder.com/150?text=Service"}
                            alt={service.serviceName}
                            className="w-full h-full object-cover rounded-t-lg"
                            width={150}
                            height={150}
                            unoptimized
                          />
                        </div>
                        <h3 className="font-semibold text-md">{service.serviceName}</h3>
                        <p className="text-sm text-gray-600 mt-1 truncate">{service.overview}</p>
                        <p className="text-sm text-cyan-600 mt-2 font-semibold">{service.price.toLocaleString('vi-VN')} VNĐ</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">Không có dịch vụ nào cho chuyên khoa này.</p>
                )}
              </div>
            )}

            <div className="text-center mt-8">
              <p className="text-lg mb-4">Hãy đăng nhập để đặt lịch khám</p>
              <Link href="/common/auth/login">
                <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white text-lg font-medium">
                  Đăng nhập ngay
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 