"use client";
import { specialtyService } from "@/services/specialtyService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export const SpecialtyList = () => {
  const [specialtys, setSpecialtys] = useState<ISpecialty[]>([]);
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await specialtyService.getSpecialtyList();
        setSpecialtys(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchSpecialties();
  }, []);
  return (
    <div className="p-10 relative z-20">
      {/* Thanh tìm kiếm */}
      <div className="flex justify-center mb-8 mt-14">
        <div className="relative flex items-center w-[500px] bg-white rounded-full shadow-md border border-gray-300">
          <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-l-full">
            <span className="text-sm font-semibold">Name</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.292 7.293a1 1 0 011.415 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter the service's name to search"
            className="w-full px-4 py-2 rounded-r-full outline-none text-gray-700"
          />
          <button className="absolute right-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a6 6 0 100 12 6 6 0 000-12zM2 10a8 8 0 1114.32 4.906l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A8 8 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Danh sách dịch vụ */}
      <h2 className="text-2xl font-bold mb-4">
        SpecialtyList (<span className="text-blue-500">{specialtys.length}</span>)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialtys.map((specialty, index) => (
          <Link
            key={index}
            href={`specialties/${specialty.specialtyId}`} 
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer block"
          >
            <Image
              src={specialty.image}
              alt={specialty.specialtyName}
              className="object-cover rounded-t-lg"
              width={40} height={40}
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{specialty.specialtyName}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button className="px-4 py-2 bg-gray-200 rounded">1</button>
        <button className="px-4 py-2 bg-gray-200 rounded">2</button>
        <button className="px-4 py-2 bg-gray-200 rounded">3</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">→</button>
      </div>
    </div>
  );
};
