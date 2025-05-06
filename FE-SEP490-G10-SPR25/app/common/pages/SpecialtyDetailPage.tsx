"use client";

import Image from 'next/image';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { doctorService } from "@/common/services/doctorService";

interface SpecialtyDetailPageProps {
  params: {
    id: string;
  };
}

interface IService {
  serviceId: number;
  serviceName: string;
  overview: string;
  process: string;
  price: number;
  image: string;
}

interface SpecialtyDetail {
  specialtyId: number;
  specialtyName: string;
  specialtyDescription: string;
  image: string;
  devices: string[];
  services: IService[];
  Doctors: {
    userId: number;
    academicTitle: string;
    degree: string;
    userName: string;
    workExperience: string;
    avatarUrl: string;
  }[];
}

const SpecialtyDetailPage = ({ params }: SpecialtyDetailPageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = params;
  const isGuestPage = pathname?.includes('/guest/');

  const [specialty, setSpecialty] = useState<SpecialtyDetail | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [doctorsLoading, setDoctorsLoading] = useState<boolean>(false);
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
  }, [id]);

  // New function to load doctors when clicking on the doctors tab
  const fetchDoctorsBySpecialty = async () => {
    if (activeTab === 'doctors' && doctors.length === 0 && !doctorsLoading) {
      setDoctorsLoading(true);
      try {
        const doctorData = await doctorService.getDoctorsBySpecialtyId(id);
        setDoctors(doctorData);
      } catch (error) {
        console.error("Error fetching doctors by specialty:", error);
      } finally {
        setDoctorsLoading(false);
      }
    }
  };

  // Call fetchDoctorsBySpecialty when tab changes to doctors
  useEffect(() => {
    fetchDoctorsBySpecialty();
  }, [activeTab]);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      <div className="relative container w-90 text-gray-600 p-5 mt-20 mb-5 z-30 bg-white rounded-xl shadow-2xl">
        {/* Nút Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:underline mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Quay lại
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-row items-center mb-6">
              {/* Image on the left */}
              <div className="w-64 h-48 mr-8 flex-shrink-0">
                <Image
                  src={`${imgUrl}/${specialty?.image}`}
                  alt="Chuyên khoa"
                  width={256}
                  height={192}
                  className="w-full h-full object-cover rounded-lg shadow"
                  unoptimized
                />
              </div>
              {/* Text on the right */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-black">{specialty?.specialtyName || "Đang tải..."}</h1>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-4 border-b mb-6">
              <button 
                className={`pb-2 ${activeTab === 'overall' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => setActiveTab('overall')}
              >
                Tổng quan
              </button>
              <button 
                className={`pb-2 ${activeTab === 'doctors' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => setActiveTab('doctors')}
              >
                Bác sĩ
              </button>
              <button 
                className={`pb-2 ${activeTab === 'services' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
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
                          href={`/patient/services/service-detail/${service.serviceId}`}
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
                          <p className="text-sm text-blue-600 mt-2 font-semibold">{service.price.toLocaleString('vi-VN')} VNĐ</p>
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
                <h2 className="text-lg font-semibold mb-4 text-black">Bác sĩ thuộc {specialty?.specialtyName}</h2>
                {doctorsLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : doctors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                      <Link 
                        key={doctor.userId} 
                        href={`/patient/doctors/${doctor.userId}`}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center"
                      >
                        <div className="w-32 h-32 mb-3 rounded-full overflow-hidden">
                          <Image
                            src={doctor.avatarUrl ? `${imgUrl}/${doctor.avatarUrl}` : "https://via.placeholder.com/150?text=Doctor"}
                            alt={doctor.userName}
                            className="w-full h-full object-cover"
                            width={150}
                            height={150}
                            unoptimized
                          />
                        </div>
                        <h3 className="font-semibold text-md text-center">
                          {doctor.academicTitle} {doctor.degree} {doctor.userName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 text-center">Chuyên khoa {specialty?.specialtyName}</p>
                        <p className="text-sm text-gray-600 mt-1 text-center">{doctor.workExperience}</p>
                      </Link>
                    ))}
                  </div>
                ) : specialty?.Doctors && specialty.Doctors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialty.Doctors.map((doctor) => (
                      <Link 
                        key={doctor.userId} 
                        href={`/patient/doctors/${doctor.userId}`}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center"
                      >
                        <div className="w-32 h-32 mb-3 rounded-full overflow-hidden">
                          <Image
                            src={doctor.avatarUrl ? `${imgUrl}/${doctor.avatarUrl}` : "https://via.placeholder.com/150?text=Doctor"}
                            alt={doctor.userName}
                            className="w-full h-full object-cover"
                            width={150}
                            height={150}
                            unoptimized
                          />
                        </div>
                        <h3 className="font-semibold text-md text-center">
                          {doctor.academicTitle} {doctor.degree} {doctor.userName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 text-center">Chuyên khoa {specialty.specialtyName}</p>
                        <p className="text-sm text-gray-600 mt-1 text-center">{doctor.workExperience}</p>
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
                        href={`/patient/services/service-detail/${service.serviceId}`}
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
                        <p className="text-sm text-blue-600 mt-2 font-semibold">{service.price.toLocaleString('vi-VN')} VNĐ</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">Không có dịch vụ nào cho chuyên khoa này.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SpecialtyDetailPage; 