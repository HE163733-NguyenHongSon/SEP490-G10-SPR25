"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { assets } from "../../../public/images/assets";
const OptionFilter = ({ searchParamList }: { searchParamList: string[] }) => {
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-row  ">
      <label className="font-medium text-gray-700 flex items-center gap-1">
        <Image src={assets.filter} width={20} height={20} alt="Filter" />
        <h2>Filter</h2>
      </label>
      <div className="text-cyan-500 flex flex-col ml-2 gap-2 ">
        {searchParamList
          .flatMap((sp) => searchParams.get(sp)?.split(",") || [])
          .filter(Boolean)
          .map((value, index) => (
            <span
              key={index}
              className=" border p-1 border-cyan-500 rounded-md"
            >
              {value.trim()}
            </span>
          ))}
      </div>
    </div>
  );
};
export default OptionFilter;
