'use client'
import React, { useState } from "react";

interface CheckboxListProps {
  items: ICheckboxOption[];
}

const CheckboxList = ({
  items, 
}: CheckboxListProps) => {

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (event.target.checked) {
      setSelectedItems((prev) => [...prev, key]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== key));
    }
  };

  return (
    <div className="mb-3">
      {items.map((item) => (
        <div
          className=" p-2  gap-3 flex flex-row"
          key={item.value}
        >
          <input
            id={item.value}
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e,item.value)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
     
    </div>
  );
};

export default CheckboxList;
