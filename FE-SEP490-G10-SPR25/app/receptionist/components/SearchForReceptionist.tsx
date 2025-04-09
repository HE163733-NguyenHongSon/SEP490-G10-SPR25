"use client";
import React, { useState, useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchForReceptionistProps {
  path: string;
  placeholder: string;
}
interface OptionType {
  value: string;
  label: string;
}

const searchFieldOptions: OptionType[] = [
  { value: "userName", label: "Tên bệnh nhân" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Số điện thoại" },
];

const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    borderRadius: "5px",
    borderColor: "#06b6d4",
    boxShadow: "none",
    "&:hover": { borderColor: "#06b6d4" },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#06b6d4" : isFocused ? "#e0f2fe" : "white",
    color: isSelected ? "white" : "#4a4a4a",
  }),
};

const SearchForReceptionist = ({ path, placeholder }: SearchForReceptionistProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchField, setSearchField] = useState<string>(searchFieldOptions[0].value);
  const [searchValue, setSearchValue] = useState<string>("");

  // Gọi API khi searchField hoặc searchValue thay đổi
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchField, searchValue);
    }, 400); // debounce nhẹ cho UX mượt hơn

    return () => clearTimeout(delayDebounce);
  }, [searchField, searchValue]);

  const handleSearch = (searchFieldCurrent: string, searchValueCurrent: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValueCurrent.trim()) {
      params.set("searchField", searchFieldCurrent);
      params.set("searchValue", searchValueCurrent.trim());
    } else {
      params.delete("searchField");
      params.delete("searchValue");
    }

    router.push(`${path}?${params.toString()}`);
    router.refresh();
  };

  return (
    <div className="flex gap-2 w-full max-w-2xl">
      <div className="w-1/3 min-w-[160px]">
        <Select
          styles={customStyles}
          options={searchFieldOptions}
          value={searchFieldOptions.find((option) => option.value === searchField)}
          onChange={(option ) => {
            if (option) {
              setSearchField((option as OptionType).value);
            }
          }}
          isSearchable={false}
        />
      </div>

      <div className="flex-1">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-2 border-2 border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchForReceptionist;
