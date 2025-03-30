"use client";
import React, { useEffect, useState } from "react";
import { specialtyService } from "@/services/specialtyService";
import { requireAuth } from "@/services/authService";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight, FaSearch } from "react-icons/fa";

// Mở rộng interface ISpecialty để phù hợp với dữ liệu từ API
interface ExtendedSpecialty {
  specialtyId: string; 
  specialtyName: string;
  image: string;
  description?: string;
  imageUrl?: string;
}

const GuestSpecialtiesPage = () => {
  const [specialties, setSpecialties] = useState<ExtendedSpecialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState<ExtendedSpecialty[]>([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await specialtyService.getSpecialtyList();
        // Chuyển đổi data để đảm bảo có các trường cần thiết
        const extendedData: ExtendedSpecialty[] = data.map(specialty => ({
          ...specialty,
          description: specialty.description || '',
          imageUrl: specialty.imageUrl || specialty.image
        }));
        setSpecialties(extendedData);
        setFilteredSpecialties(extendedData);
      } catch (err) {
        setError('Không thể tải danh sách chuyên khoa');
        console.error('Lỗi khi tải danh sách chuyên khoa:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSpecialties(specialties);
    } else {
      const filtered = specialties.filter(specialty => 
        specialty.specialtyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSpecialties(filtered);
    }
  }, [searchTerm, specialties]);

  // Xử lý đặt lịch theo chuyên khoa
  const handleBookAppointment = (specialtyId: string) => {
    // Sử dụng requireAuth để kiểm tra xác thực và chuyển hướng nếu chưa đăng nhập
    requireAuth(() => {
      // Chỉ chạy nếu người dùng đã đăng nhập
      window.location.href = `/patient/appointment-booking?specialtyId=${specialtyId}`;
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
      style={{ backgroundImage: 'url("/images/background_specialties.jpeg")' }}
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
              placeholder="Tìm kiếm chuyên khoa..."
              className="w-full px-3 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 text-gray-500">
              <FaSearch />
            </button>
          </div>
        </div>
        
        {/* Danh sách chuyên khoa */}
        <div className="p-10 relative z-20 bg-gray-100 min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filteredSpecialties.map((specialty, index) => (
              <Link
                key={specialty.specialtyId || index}
                href={`/guest/specialties/${specialty.specialtyId}`} 
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer text-center border border-gray-200"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-blue-500 p-4">
                  <Image
                    src={specialty.image || specialty.imageUrl || "/images/specialty-placeholder.png"}
                    alt={specialty.specialtyName}
                    className="object-contain"
                    width={60} height={60}
                  />
                </div>
                <h3 className="text-lg font-semibold mt-4 text-gray-700">{specialty.specialtyName}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{specialty.description || ''}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleBookAppointment(specialty.specialtyId);
                  }}
                  className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Đặt lịch khám
                </button>
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          {filteredSpecialties.length > 0 ? (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">←</button>
              <button className="px-4 py-2 border rounded-md bg-blue-500 text-white">1</button>
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">2</button>
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">→</button>
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600">
              Không tìm thấy chuyên khoa nào phù hợp với tìm kiếm của bạn
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestSpecialtiesPage; 