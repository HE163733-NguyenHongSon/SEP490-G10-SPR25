
import React from "react";
import { SortOption } from "../../types/sortOption";


interface SelectSortProps {
  options: SortOption[];
  onSortChange: (value: string) => void;
}

const SelectSort: React.FC<SelectSortProps> = ({ options, onSortChange }) => {
  return (
    <div className="flex flex-row  gap-2 h-fit">
      <label htmlFor="sort" className="font-medium text-gray-700">
        Sort:
      </label>
      <select
        id="sort"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:bg-cyan-500"
        
        onChange={(e) => onSortChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSort;
