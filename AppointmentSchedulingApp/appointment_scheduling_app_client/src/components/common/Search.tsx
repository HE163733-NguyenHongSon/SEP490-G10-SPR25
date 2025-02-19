"use client";
import React, { useState, FunctionComponent } from "react";
import Select, {
  components,
  ClearIndicatorProps,
  StylesConfig,
} from "react-select";
import { CSSObject } from "@emotion/react";

export interface ColourOption {
  value: string;
  label: string;
}

export const colourOptions: ColourOption[] = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
];

const CustomClearText: FunctionComponent = () => <>Clear all</>;
const ClearIndicator = (props: ClearIndicatorProps<ColourOption, true>) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props) as React.CSSProperties}
      className="cursor-pointer text-cyan-600 hover:text-cyan-800"
    >
      <div style={{ padding: "0px 4px" }}>{children}</div>
    </div>
  );
};

const customStyles: StylesConfig<ColourOption, true> = {
  control: (base) => ({
    ...base,
    borderRadius: "0px 20px 20px 0px",
    borderColor: "#0284c7",
    outline: "none",
    boxShadow: "none",
    "&:hover": { borderColor: "#0284c7" },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#0284c7" : isFocused ? "#e0f2fe" : "white",
    color: isSelected ? "white" : "black",
    cursor: "pointer",
    padding: "8px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    padding: "4px",
    backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#bae6fd",
    borderRadius: "8px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#0284c7",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#0369a1",
    "&:hover": { backgroundColor: "#0284c7", color: "white" },
  }),
};

const Search = ({
  optionSearch,
  initialSearchValue,
}: {
  optionSearch: string[];
  initialSearchValue: string;
}) => {
  const [searchBy, setSearchBy] = useState<string>(initialSearchValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSearchChange = (option: string) => {
    setSearchBy(option);
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center w-[700px] bg-white rounded-full shadow-md border-2 border-cyan-500">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center  text-cyan-500 w-[195px] rounded-l-full px-3 py-1 text-left focus:outline-none"
        >
          {optionSearch.find((opt) => opt === searchBy)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.292 7.293a1 1 0 011.415 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute text-gray-700 top-8 mt-2 w-fit border border-cyan-500 rounded-md bg-white shadow-lg z-10">
            {optionSearch.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSearchChange(option)}
                className={`px-6 py-1 cursor-pointer hover:bg-cyan-500 hover:text-white border-2 border-white rounded-md ${
                  searchBy === option ? "bg-cyan-500 text-white" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}

        {/* 🟢 React-Select Component */}
        <Select
          closeMenuOnSelect={false}
          components={{ ClearIndicator }}
          styles={customStyles}
          isMulti
          options={colourOptions}
          className="w-full"
        />

        {/* 🔍 Nút tìm kiếm */}
        {/* <button className="absolute right-3 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a6 6 0 100 12 6 6 0 000-12zM2 10a8 8 0 1114.32 4.906l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A8 8 0 012 10z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default Search;
