"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "../../../public/images/assets";
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

  return (
    <div className="flex flex-row items-center justify-start gap-x-4">
      <label
        htmlFor="sort"
        className="font-medium text-gray-700 flex flex-row gap-1"
      >
        <Image src={assets.sort} width={20} height={20} alt="Sort" />
        Sort
      </label>
      <select
        id="sort"
        className="border-2 w-full   border-cyan-500 rounded-md  mx-2 p-1  focus:outline-cyan-500 "
        value={sortBy}
        onChange={(e) => {
          const newSearchParams = new URLSearchParams(window.location.search);
          const newSort = e.target.value;
          newSearchParams.set("sortBy", newSort);
          setSortBy(newSort);
          router.push(`${path}?${newSearchParams.toString()}`);
        }}
      >
        {options.map((option) => (
          <option
            className={sortBy === option.value ? "bg-cyan-500 text-white" : ""}
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
