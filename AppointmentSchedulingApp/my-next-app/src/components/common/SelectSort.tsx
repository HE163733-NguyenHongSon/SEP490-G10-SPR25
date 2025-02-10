import React from "react";
import Image from "next/image";
import { assets } from "../../../public/images/assets";

interface SelectSortProps {
  options: ISortOption[];
  onSortChange: (value: string) => void;
  selectedOption: string;
}

const SelectSort: React.FC<SelectSortProps> = ({
  options,
  onSortChange,
  selectedOption,
}) => {
  return (
    <div className="flex flex-row items-center justify-start  gap-x-2  ">
      <label htmlFor="sort" className="font-medium text-gray-700 flex flex-row gap-1">
        <Image src={assets.sort} width={20} height={20} alt="Sort" />
        Sort by
      </label>
      <select
        id="sort"
        className="border-2  border-cyan-500 rounded-md px-2     py-2 focus:outline-cyan-500  "
        value={selectedOption}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {options.map((option) => (
          <option
            className={`${
              selectedOption === option.value ? "text-cyan-500" : ""
            }`}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSort;
