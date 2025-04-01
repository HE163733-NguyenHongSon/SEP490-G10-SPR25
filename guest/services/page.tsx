"use client";
import React, { useEffect, useState } from "react";
import { serviceService, Service } from "@/services/serviceSerivce";
import { requireAuth } from "@/services/authService";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight, FaSearch, FaFilter } from "react-icons/fa";

// Mở rộng interface Service để thêm specialtyName
interface ServiceWithExtras extends Service {
  specialtyName?: string;
}

const GuestServicesPage = () => {
  const [services, setServices] = useState<ServiceWithExtras[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState<ServiceWithExtras[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAllServices();
        setServices(data);
        setFilteredServices(data);
      } catch (err) {
        setError('Không thể tải danh sách dịch vụ');
        console.error('Lỗi khi tải danh sách dịch vụ:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service => 
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);

  // Xử lý đặt dịch vụ
  const handleBookService = (serviceId: number) => {
    // Sử dụng requireAuth để kiểm tra xác thực và chuyển hướng nếu chưa đăng nhập
    requireAuth(() => {
      // Chỉ chạy nếu người dùng đã đăng nhập
      window.location.href = `/patient/services/service-booking/${serviceId}`;
    });
  };

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
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_services.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      
      <div className="relative z-30 w-full">
        {/* Thanh tìm kiếm */}
        <div className="flex justify-center mb-3 mt-20">
          <div className="relative flex items-center w-[400px] bg-white rounded-full shadow-md border border-gray-300 overflow-hidden">
            <button className="flex items-center bg-blue-500 text-white px-3 py-2">
              Name <FaChevronRight className="ml-2" />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              className="w-full px-3 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 text-gray-500">
              <FaSearch />
            </button>
          </div>
        </div>
        
        {/* Danh sách dịch vụ */}
        <div className="p-10 relative z-20 bg-gray-100 min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filteredServices.map((service) => (
              <div key={service.serviceId} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between hover:shadow-lg transition-shadow cursor-pointer text-center border border-gray-200 h-full">
                <div className="mb-4 w-full">
                  <div className="relative w-full h-36 mb-4">
                    <Image 
                      src={service.image?.startsWith('/') ? service.image : 
                           service.image?.startsWith('http') ? service.image : 
                           service.image ? `/${service.image}` : "/images/service.png"}
                      alt={service.serviceName}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">{service.serviceName}</h3>
                  <p className="text-sm text-gray-500 mt-1">{service.specialtyName || "Chuyên khoa chung"}</p>
                  <p className="text-blue-600 font-bold mt-2">{service.price?.toLocaleString() || "0"} VNĐ</p>
                </div>
                
                <div className="flex flex-col w-full mt-4 gap-2">
                  <Link 
                    href={`/guest/services/${service.serviceId}`}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Xem chi tiết
                  </Link>
                  <button
                    onClick={() => handleBookService(service.serviceId)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md text-sm transition-colors w-full"
                  >
                    Đặt dịch vụ
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {filteredServices.length > 0 ? (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">←</button>
              <button className="px-4 py-2 border rounded-md bg-blue-500 text-white">1</button>
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">2</button>
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">→</button>
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600">
              Không tìm thấy dịch vụ nào phù hợp với tìm kiếm của bạn
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestServicesPage; 