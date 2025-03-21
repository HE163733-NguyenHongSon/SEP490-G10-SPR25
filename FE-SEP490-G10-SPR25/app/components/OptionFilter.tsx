"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { assets } from "@/public/images/assets";
const OptionFilter = ({ searchParamList }: { searchParamList: string[] }) => {
  const searchParams = useSearchParams();

  const selectedOptions = useMemo(() => {
    return searchParamList
      .flatMap((sp) => searchParams.get(sp)?.split(",") || [])
      .filter(Boolean);
  }, [searchParams, searchParamList]);

  return (
    <div className="flex flex-row  ">
      <label className="font-medium text-gray-700 flex items-center gap-1">
        <Image src={assets.filter} width={20} height={20} alt="Filter" />
        <h2>Lọc</h2>
      </label>
      <div className="text-cyan-500 flex flex-col ml-2 gap-2">
        {selectedOptions.length > 0 ? (
          selectedOptions.map((value: string) => (
            <span key={value} className="border p-1 border-cyan-500 rounded-md">
              {value.trim()}
            </span>
          ))
        ) : (
          <span className="flex  text-gray-500 border w-[200px] px-2 py-1 rounded-md border-gray-500 ">
            Chọn lọc
          </span>
        )}
      </div>
    </div>
  );
};
export default OptionFilter;
