"use client";
import React, { useEffect, useState } from "react";
import type { Metadata } from "next";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
  Award,
  Bookmark,
  Edit,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@/common/contexts/UserContext";
import { Image } from "antd";
// export const metadata: Metadata = {
//   title: "Hồ Sơ Bác Sĩ",
//   description: "Xem và chỉnh sửa thông tin hồ sơ của bạn",
// };
interface IDoctor {
  userName: string;
  currentWork: string;
  avatarUrl: string;
  email: string;
  phone: string;
  phoneNumber: string;
  address: string;
  degree: string;
  doctorDescription: string;
  workExperience: string;
}
const DoctorProfilePage = () => {
  const [doctorData, setDoctorData] = useState<IDoctor | null>(null);
  const { user } = useUser();
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5220/api/Doctors/${user?.userId}`
        );
        setDoctorData(response.data);
        console.log("Doctor Data:", response.data);
      } catch (error) {
        console.error("Lỗi khi fetch bác sĩ:", error);
      }
    };

    fetchDoctor();
  }, []);
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hồ Sơ Của Tôi</h1>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-32 w-32 rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold mb-4">
                <Image
                  src={`${imgUrl}/${doctorData?.avatarUrl}`}
                  alt="Doctor"
                  width={256}
                  className="w-full h-full object-cover rounded-lg shadow"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <h2 className="text-xl font-semibold">{doctorData?.userName}</h2>
              <p className="text-indigo-600 font-medium">
                {doctorData?.currentWork}
              </p>
              <div className="mt-4 flex justify-center space-x-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                  {doctorData?.workExperience}
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
                    <p className="text-sm text-gray-600">{doctorData?.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Điện thoại</p>
                    <p className="text-sm text-gray-600">{doctorData?.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Địa chỉ</p>
                    <p className="text-sm text-gray-600">
                      {doctorData?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="border-t mt-6 pt-4">
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
            </div> */}
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Giới Thiệu</h2>
          <p className="text-gray-700">{doctorData?.doctorDescription}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Học Vấn</h2>
          <div className="space-y-4">
            {/* {doctorData.education.map((edu, index) => ( */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">{doctorData?.degree}</h3>
                {/* <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p> */}
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>

        {/* <div className="bg-white rounded-lg shadow p-6">
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
        </div> */}
      </div>
    </div>
  );
};
export default DoctorProfilePage;
