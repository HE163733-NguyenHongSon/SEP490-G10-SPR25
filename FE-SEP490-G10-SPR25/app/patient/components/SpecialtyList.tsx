"use client";
import { specialtyService } from "@/services/specialtyService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronRight, FaSearch } from "react-icons/fa";

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
    <div className="relative w-full pt-10">   
      {/* Thanh tìm kiếm */}
      <div className="flex justify-center mb-3 mt-20 relative z-30">
        <div className="relative flex items-center w-[400px] bg-white rounded-full shadow-md border border-gray-300 overflow-hidden">
          <button className="flex items-center bg-blue-500 text-white px-3 py-2">
            Name <FaChevronRight className="ml-2" />
          </button>
          <input
            type="text"
            placeholder="Enter the service's name to search"
            className="w-full px-3 py-2 outline-none"
          />
          <button className="absolute right-3 text-gray-500">
            <FaSearch />
          </button>
        </div>
      </div>
 


      {/* Danh sách dịch vụ */}
      <div className="p-10 relative z-20 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {specialtys.map((specialty, index) => (
            <Link
              key={index}
              href={`specialties/${specialty.specialtyId}`} 
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer text-center border border-gray-200"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-blue-500 p-4">
                <Image
                  src={specialty.image}
                  alt={specialty.specialtyName}
                  className="object-contain"
                  width={60} height={60}
                />
              </div>
              <h3 className="text-lg font-semibold mt-4 text-gray-700">{specialty.specialtyName}</h3>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          {[1, 2, 3, 4].map((num) => (
            <button key={num} className={`px-4 py-2 border rounded-md ${num === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'}`}>{num}</button>
          ))}
          <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">→</button>
        </div>
      </div>
    </div>

  );
};
