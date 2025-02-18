'use client';
import Image from "next/image";
import { useState } from "react";
import { FaSearch, FaChevronRight } from "react-icons/fa";
import { BsFilter } from "react-icons/bs";

export function ServiceList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("Cardiology");
  const [selectedCategory, setSelectedCategory] = useState("Surgery");
  const [selectedDate, setSelectedDate] = useState("27/1/2025 - 15h30");

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="relative w-full pt-10">
      {/* Search Bar */}
      <div className="flex justify-center mb-3">
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
      {/* Content container */}
      <div className="relative z-1 mt-0 bg-white p-6 shadow-lg rounded-lg w-[105%] mx-auto flex flex-col">
        <h2 className="text-center text-xl font-semibold mb-1">Service (22 result)</h2>
        <div className="flex">
          {/* Sidebar (Filter & Sort Panel) */}
          <div className="w-1/4 bg-white p-4 rounded-xl shadow-md text-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold">Filter & Sort</h2>
              <button className="text-blue-500 text-xs">Clear</button>
            </div>
            <div className="space-y-3">
              <button className="flex items-center gap-2 px-3 py-2 border rounded-xl w-full">
                <BsFilter /> Filter (2 options)
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border rounded-xl w-full">
                Sort by Rating
              </button>
              <div>
                <h3 className="font-medium mb-1">Specialty</h3>
                <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-xl">
                  {selectedSpecialty}
                </button>
              </div>
              <div>
                <h3 className="font-medium mb-1">Category</h3>
                <button className="w-full px-3 py-2 bg-gray-200 rounded-xl">
                  {selectedCategory}
                </button>
              </div>
              <div>
                <h3 className="font-medium mb-1">Date and time</h3>
                <button className="w-full px-3 py-2 bg-blue-100 rounded-xl">
                  {selectedDate}
                </button>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-3/4 pl-6">
            {/* Service List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                  <Image src="/service-image.jpg" alt="Service" width={200} height={150} className="rounded-md" />
                  <h3 className="text-lg font-semibold mt-2">General Consultation</h3>
                  <p className="text-gray-600">Basic health counseling services...</p>
                  <p className="text-blue-500 font-semibold">350.000vnd</p>
                  <p className="text-yellow-500">⭐ 4.7 (123 ratings)</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2 text-sm">
          <button className="px-3 py-1 bg-blue-500 text-white rounded-full">1</button>
          <button className="px-3 py-1 bg-gray-200 rounded-full">2</button>
          <button className="px-3 py-1 bg-gray-200 rounded-full">3</button>
          <button className="px-3 py-1 bg-gray-200 rounded-full">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
