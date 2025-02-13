"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CheckboxListProps {
  items: ICheckboxOption[];
  searchParam: string;
}

const CheckboxList = ({ items, searchParam }: CheckboxListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSelectedItems = searchParams.get(searchParam)?.split(",") || [];

  const [selectedItems, setSelectedItems] = useState<string[]>(initialSelectedItems);

  useEffect(() => {
    const updatedSelectedItems =searchParams.get(searchParam)?.split(",") || [];
    setSelectedItems(updatedSelectedItems);
  }, [searchParams, searchParam]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>,key: string) => {
    let updatedSelectedItems = event.target.checked
      ? [...selectedItems, key]
      : selectedItems.filter((item) => item !== key);

    // Tạo query mới và giữ lại các tham số hiện tại trong URL
    const newSearchParams = new URLSearchParams(window.location.search);

    if (updatedSelectedItems.length > 0) {
      newSearchParams.set(searchParam, updatedSelectedItems.join(","));
    } else {
      newSearchParams.delete(searchParam);
    }

    router.push(`/patient/doctors?${newSearchParams.toString()}`, {
      scroll: false,
    });

    setSelectedItems(updatedSelectedItems);
  };

  return (
    <div className="mb-3">
      {items.map((item) => (
        <div className="p-2 gap-3 flex flex-row" key={item.value}>
          <input
            id={item.value}
            type="checkbox"
            checked={selectedItems.includes(item.value)}
            onChange={(e) => handleCheckboxChange(e, item.value)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
