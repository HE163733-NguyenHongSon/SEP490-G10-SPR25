"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CheckboxListProps {
  items: ICheckboxOption[];
  searchParam: string;
  basePath: string;

}

const CheckboxList = ({ items, searchParam ,basePath}: CheckboxListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const initialSelectedItems = searchParams.get(searchParam)?.split(",") || [];

  const [selectedItems, setSelectedItems] =
    useState<string[]>(initialSelectedItems);

  useEffect(() => {
    const updatedSelectedItems =
      searchParams.get(searchParam)?.split(",") || [];
    setSelectedItems(updatedSelectedItems);
  }, [searchParams, searchParam]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const updatedSelectedItems = event.target.checked
      ? [...selectedItems, key]
      : selectedItems.filter((item) => item !== key);

    // Tạo query mới và giữ lại các tham số hiện tại trong URL
    const newSearchParams = new URLSearchParams(window.location.search);

    if (updatedSelectedItems.length > 0) {
      newSearchParams.set(searchParam, updatedSelectedItems.join(","));
      newSearchParams.delete("searchBy");
    } else {
      newSearchParams.delete(searchParam);
    }

    router.push(`${basePath}/doctors?${newSearchParams.toString()}`, {
      scroll: false,
    });

    setSelectedItems(updatedSelectedItems);
  };

  return (
    <div className="mb-3">
      {items.map((item) => (
        <div className="py-2 gap-3 flex flex-row" key={item.value}>
          <input
            id={item.value}
            type="checkbox"
            ref={checkboxRef}
            checked={selectedItems.includes(item.value)}
            onChange={(e) => handleCheckboxChange(e, item.value)}
            className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-cyan-500 checked:border-none relative 
             checked:before:content-['✓'] checked:before:text-white checked:before:absolute 
             checked:before:left-1/2 checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 
             checked:before:text-base checked:before:font-bold"
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
