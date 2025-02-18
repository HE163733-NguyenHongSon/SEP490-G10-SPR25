"use client";
import React, { useState } from "react";


const Search = ({
  optionSearch,
  initialSearchValue,
}: {
  optionSearch: string[];
  initialSearchValue: string;
}) => {
  const [searchBy, setSearchBy] = useState<string>(initialSearchValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSearchChange = (option: string) => {
    setSearchBy(option);
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center w-[500px]  bg-white rounded-full shadow-md border border-gray-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex flex-row items-center border-2  border-cyan-500 text-cyan-500 w-[195px] rounded-l-full px-3 py-1 text-left focus:outline-cyan-500"
        >
          {optionSearch.find((opt) => opt === searchBy)}

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

        {isOpen && (
          <ul className="absolute text-gray-700 top-10 mt-2 w-fit border border-cyan-500 rounded-md bg-white shadow-lg z-10">
            {optionSearch.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSearchChange(option)}
                className={`px-4 py-1 cursor-pointer hover:bg-cyan-500 hover:text-white border-2 border-white rounded-md ${
                  searchBy === option ? "bg-cyan-500 text-white" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          placeholder="Enter the doctor's info to search"
          className="w-full px-4 py-1 rounded-r-full outline-none text-gray-700"    
        />
        <button className="absolute right-3 text-gray-500">
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
  );
};

export default Search;
