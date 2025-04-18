import React from 'react';
import type { Metadata } from "next";
import { Mail, Phone, Calendar, MapPin, Globe, Award, Bookmark, Edit } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Hồ Sơ Bác Sĩ",
  description: "Xem và chỉnh sửa thông tin hồ sơ của bạn",
};

export default function DoctorProfilePage() {
  const doctorData = {
    name: "Bs. Nguyễn Thị Minh",
    specialization: "Bác sĩ Tim mạch",
    image: null,
    email: "bs.nguyen.minh@example.com",
    phone: "0912 345 678",
    address: "123 Đường Y Khoa, Phòng 500, Quận 1, TP. Hồ Chí Minh",
    experience: "15 năm",
    education: [
      { degree: "Bác sĩ Y khoa", institution: "Đại học Y Hà Nội", year: "2008" },
      { degree: "Thực tập nội trú Nội khoa", institution: "Bệnh viện Bạch Mai", year: "2011" },
      { degree: "Chuyên khoa Tim mạch", institution: "Viện Tim mạch Quốc gia", year: "2014" }
    ],
    certificates: [
      { name: "Chứng chỉ hành nghề chuyên khoa Tim mạch", year: "2015" },
      { name: "Chứng nhận Hồi sức Tim phổi nâng cao (ACLS)", year: "2022" },
      { name: "Thành viên Hội Tim mạch Việt Nam", year: "2018" }
    ],
    languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Pháp"],
    bio: "Bs. Nguyễn Thị Minh là bác sĩ chuyên khoa Tim mạch với hơn 15 năm kinh nghiệm trong chẩn đoán và điều trị các bệnh lý tim mạch. Bác sĩ chuyên về tim mạch dự phòng, quản lý suy tim và phục hồi chức năng tim. Phương pháp chăm sóc bệnh nhân của bác sĩ nhấn mạnh vào dự phòng, giáo dục và kế hoạch điều trị cá nhân hóa.",
    workingHours: [
      { day: "Thứ Hai", hours: "9:00 - 17:00" },
      { day: "Thứ Ba", hours: "9:00 - 17:00" },
      { day: "Thứ Tư", hours: "9:00 - 13:00" },
      { day: "Thứ Năm", hours: "9:00 - 17:00" },
      { day: "Thứ Sáu", hours: "9:00 - 16:00" },
      { day: "Thứ Bảy", hours: "Nghỉ" },
      { day: "Chủ Nhật", hours: "Nghỉ" }
    ]
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hồ Sơ Của Tôi</h1>
          <Link href="/doctor/profile/edit">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh Sửa Hồ Sơ
            </button>
          </Link>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-32 w-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-bold mb-4">
                {doctorData.name.charAt(0)}
              </div>
              <h2 className="text-xl font-semibold">{doctorData.name}</h2>
              <p className="text-indigo-600 font-medium">{doctorData.specialization}</p>
              <div className="mt-4 flex justify-center space-x-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                  {doctorData.experience} Kinh Nghiệm
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Thông Tin Liên Hệ</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-600">{doctorData.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Điện thoại</p>
                    <p className="text-sm text-gray-600">{doctorData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Địa chỉ</p>
                    <p className="text-sm text-gray-600">{doctorData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t mt-6 pt-4">
              <h3 className="text-lg font-medium mb-3">Giờ Làm Việc</h3>
              <div className="space-y-2">
                {doctorData.workingHours.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm font-medium">{item.day}</span>
                    <span className="text-sm text-gray-600">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t mt-6 pt-4">
              <h3 className="text-lg font-medium mb-3">Ngôn Ngữ</h3>
              <div className="flex flex-wrap gap-2">
                {doctorData.languages.map((language, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Giới Thiệu</h2>
          <p className="text-gray-700">{doctorData.bio}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Học Vấn</h2>
          <div className="space-y-4">
            {doctorData.education.map((edu, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Chứng Chỉ</h2>
          <div className="space-y-4">
            {doctorData.certificates.map((cert, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Bookmark className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-gray-500">Cấp năm: {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lịch Làm Việc</h2>
            <Link href="/doctor/schedule">
              <button className="px-3 py-1 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                Cập Nhật Lịch
              </button>
            </Link>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              Bạn có thể cập nhật chi tiết giờ làm việc và lịch khám từ trang Lịch làm việc.
            </p>
            <Link href="/doctor/schedule" className="text-sm text-indigo-600 hover:text-indigo-800">
              Xem lịch đầy đủ của bạn →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 