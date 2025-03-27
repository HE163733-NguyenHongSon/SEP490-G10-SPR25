"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/public/images/assets";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectSortProps {
  options: ISortOption[];
  path: string;
  initialSelectedValue: string;
}

const SelectSort: React.FC<SelectSortProps> = ({
  options,
  path,
  initialSelectedValue,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || initialSelectedValue
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("sortBy", value);
    setSortBy(value);
    router.push(`${path}?${newSearchParams.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <div className="flex items-center gap-x-3">
        <label className="font-medium text-gray-700 flex items-center gap-1">
          <Image src={assets.sort} width={20} height={20} alt="Sort" />
         Sắp xếp
        </label>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex flex-row items-center border-2  border-cyan-500 text-cyan-500 w-[200px] rounded-md px-2 py-1 text-left focus:outline-cyan-500"
        >
          {options.find((opt) => opt.value === sortBy)?.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.292 7.293a1 1 0 011.415 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul className="absolute text-gray-700 left-16 mt-2  border border-gray-300 rounded-md bg-white shadow-lg z-10 w-[200px]">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-1 cursor-pointer hover:bg-cyan-500 hover:text-white border-2 border-white rounded-md ${
                sortBy === option.value ? "bg-cyan-500 text-white" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectSort;
