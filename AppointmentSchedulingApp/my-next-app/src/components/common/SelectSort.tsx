"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "../../../public/images/assets";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface SelectSortProps {
  options: ISortOption[];
  url: string;
  initialSelectedValue: string;
}

const SelectSort: React.FC<SelectSortProps> = ({
  options,
  url,
  initialSelectedValue,
}) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const [sortBy, setSortBy] = useState<string>(initialSelectedValue);

  // Cập nhật `sortBy` mỗi khi URL thay đổi
  useEffect(() => {
    const currentSort = searchParam.get("sortBy") || initialSelectedValue;
    setSortBy(currentSort);
  }, [searchParam, initialSelectedValue]);

  return (
    <div className="flex flex-row items-center justify-start gap-x-2">
      <label
        htmlFor="sort"
        className="font-medium text-gray-700 flex flex-row gap-1"
      >
        <Image src={assets.sort} width={20} height={20} alt="Sort" />
        Sort by
      </label>
      <select
        id="sort"
        className={`border-2 rounded-md px-2 py-2 focus:outline-cyan-500 ${
          sortBy ? "border-cyan-500 text-cyan-500" : "border-gray-300"
        }`}
        value={sortBy} // Đảm bảo phản ánh đúng giá trị từ URL
        onChange={(e) => {
          setSortBy(e.target.value);
          router.push(`${url}?sortBy=${e.target.value}`);
        }}
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
