"use client";

import React, { useEffect, useState } from "react";
import { doctorService } from "@/services/doctorService";
import { requireAuth } from "@/services/authService";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight, FaSearch, FaStar } from "react-icons/fa";
import RatingStars from "@/components/RatingStars";

// Sử dụng interface từ doctorService thay vì tạo mới
type Doctor = Awaited<ReturnType<typeof doctorService.getDoctorList>>[number];
type SearchOption = { label: string; value: string };

const GuestDoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Lấy danh sách bác sĩ
        const data = await doctorService.getDoctorList();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        setError('Không thể tải danh sách bác sĩ');
        console.error('Lỗi khi tải danh sách bác sĩ:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor => 
        doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialtyNames.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, doctors]);

  // Xử lý đặt lịch khám với bác sĩ
  const handleBookAppointment = (doctorId: number) => {
    // Sử dụng requireAuth để kiểm tra xác thực và chuyển hướng nếu chưa đăng nhập
    requireAuth(() => {
      // Chỉ chạy nếu người dùng đã đăng nhập
      window.location.href = `/patient/appointment-booking?doctorId=${doctorId}`;
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
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
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
              placeholder="Tìm kiếm bác sĩ..."
              className="w-full px-3 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 text-gray-500">
              <FaSearch />
            </button>
          </div>
        </div>
        
        <div className="p-10 relative z-20 bg-gray-100 min-h-screen">
          <div className="w-full grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-col-4 gap-5 text-gray-500 max-w-6xl mx-auto">
            {filteredDoctors.map((doctor) => (
              <Link
                key={doctor.doctorId}
                href={`/guest/doctor-detail/${doctor.doctorId}`}
                className="border border-gray-300 rounded-md shadow-md bg-white"
              >
                <h1 className="text-center font-semibold text-lg text-gray-700 mt-3">
                  <span className="mr-2">
                    {doctor.academicTitle}.{doctor.degree}
                  </span>
                  {doctor.doctorName}
                </h1>

                <div className="grid grid-cols-3 my-3">
                  <div className="gap-3 col-span-1 flex flex-col items-center justify-start p-2 border-r border-gray-300">
                    <Image
                      className="rounded-lg"
                      src={doctor.avatarUrl || "/images/avatar-placeholder.png"}
                      height={200}
                      width={100}
                      alt="avatar doctor"
                    /> 
                    <p className="text-cyan-500 font-light text-center">
                      <span className="font-semibold text-lg mr-1">
                        {doctor.experienceYear || "5+"}
                      </span>
                      năm kinh nghiệm
                    </p>
                    <button 
                      className="bg-cyan-500 text-white px-3 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        handleBookAppointment(doctor.doctorId);
                      }}
                    >
                      Hẹn bác sĩ
                    </button>
                  </div>
                  <div className="col-span-2 flex flex-col justify-between font-sans px-3">
                    <h2 className="text-lg text-gray-700">{doctor.currentWork}</h2>
                    <p>{doctor.basicDescription || `Bác sĩ ${doctor.doctorName} là chuyên gia trong lĩnh vực ${doctor.specialtyNames.join(", ")}`}...</p>
                    <p className="text-gray-400">
                      {doctor.specialtyNames.join(", ")}
                    </p>
                    <p className="font-semibold">
                      ({doctor.numberOfService} dịch vụ khám)
                    </p>
                    <div className="flex flex-row gap-2">
                      <RatingStars rating={doctor.rating} />
                      <p>({doctor.numberOfExamination} đã khám)</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          {filteredDoctors.length > 0 ? (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">←</button>
              <button className="px-4 py-2 border rounded-md bg-blue-500 text-white">1</button>
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">2</button>
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">→</button>
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600">
              Không tìm thấy bác sĩ nào phù hợp với tìm kiếm của bạn
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestDoctorsPage; 