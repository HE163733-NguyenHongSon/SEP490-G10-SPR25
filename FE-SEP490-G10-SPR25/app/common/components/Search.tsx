"use client";
import React, { useState, FunctionComponent, useEffect } from "react";
import Select, { ClearIndicatorProps, StylesConfig } from "react-select";
import { useRouter, useSearchParams } from "next/navigation";

const CustomClearText: FunctionComponent = () => <>Bỏ tất cả</>;
const ClearIndicator = (props: ClearIndicatorProps<ISearchOption, true>) => {
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

const customStyles: StylesConfig<ISearchOption, true> = {
  control: (base) => ({
    ...base,
    borderRadius: "5px",
    padding: "0px 0px",
    borderColor: "#06b6d4",
    outline: "none",
    fontSize: "18px",
    boxShadow: "none",
    "&:hover": { borderColor: "#06b6d4" },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    borderRadius: "5px",
    backgroundColor: isSelected ? "#06b6d4" : isFocused ? "#e0f2fe" : "white",
    color: isSelected ? "white" : "#4a4a4a",
    cursor: "pointer",
    padding: "5px 7px",
    margin: "0px",
    "&:hover": { backgroundColor: "#06b6d4", color: "white" },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "5px",
    border: "solid 1px #d1d5db",
    padding: "2px 4px",
    backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: "5px",
    margin: "2px 2px",
    backgroundColor: "white",
    border: "solid 1px #06b6d4",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#06b6d4",
    // backgroundColor: "white",
    borderRadius: "5px 2px 2px 5px",
    padding: "4px 7px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    backgroundColor: "#06b6d4",
    color: "white",
    "&:hover": { backgroundColor: "#06b6d4", color: "white" },
  }),
};

const Search = ({
  suggestedData,
  placeholder,
  path,
}: {
  suggestedData: ISearchOption[];
  placeholder: string;
  path: string;
}) => {
  const router = useRouter();
  const [currentOptions, setCurrentOptions] = useState<ISearchOption[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get("specialties") ||
      searchParams.get("academicTitles") ||
      searchParams.get("degrees")
    )
      setCurrentOptions([]);
  }, [searchParams]);

  const handleOptionsChange = (options: ISearchOption[]) => {
    setCurrentOptions(options);
    if (options.length > 0) {
      router.push(
        `${path}?searchValues=${options
          .map((op) => op.value)
          .join(",")}&sortBy=${searchParams.get(
          "sortBy"
        )}&displayView=${searchParams.get("displayView")}`
      );
    } else {
      router.push(
        `${path}?sortBy=${searchParams.get(
          "sortBy"
        )}&displayView=${searchParams.get("displayView")}`
      );
    }
  };
  return (
    <div className="flex min-w-[700px] mx-auto">
      <Select
        closeMenuOnSelect={true}
        components={{ ClearIndicator }}
        styles={customStyles}
        isMulti
        value={currentOptions}
        options={suggestedData}
        className="w-full "
        placeholder={placeholder}
        onChange={(options) => handleOptionsChange(options as ISearchOption[])}
      />
    </div>
  );
};

export default Search;
