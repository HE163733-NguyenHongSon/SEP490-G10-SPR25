import React from "react";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ search, setSearch, className }) => {
  return (
    <div className={`flex justify-center mb-8 mt-14 ${className}`}>
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
  );
};

export default Search;
