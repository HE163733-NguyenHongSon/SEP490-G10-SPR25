"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Select, { SingleValue, GroupBase, OptionProps } from "react-select";
import Image from "next/image";

interface IFieldConfig {
  label: string;
  value: string;
  placeholder: string;
}

interface HomeSearchProps {
  suggestedData: ISearchOption[];
  fields: IFieldConfig[];
  defaultField?: string;
}

const typeLabelMap: Record<string, string> = {
  doctor: "Bác sĩ",
  service: "Dịch vụ",
  specialty: "Chuyên khoa",
};

const HomeSearch = ({
  suggestedData,
  fields,
  defaultField = fields[0]?.value,
}: HomeSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchField, setSearchField] = useState<string>(defaultField);
  const [selectedOption, setSelectedOption] = useState<ISearchOption | null>(
    null
  );
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

  // Reset state when path changes
  useEffect(() => {
    setSelectedOption(null);
    setSearchField(defaultField);
  }, [pathname, defaultField]);

  const filteredOptions = useMemo(() => {
    if (searchField === "all") return suggestedData;
    return suggestedData.filter((item) => item.type === searchField);
  }, [suggestedData, searchField]);

  const groupedOptions = useMemo(() => {
    if (searchField !== "all") return filteredOptions;

    const grouped = suggestedData.reduce((acc, item) => {
      if (item.type) {
        const group = acc[item.type] || [];
        group.push(item);
        acc[item.type] = group;
      }
      return acc;
    }, {} as Record<string, ISearchOption[]>);

    return Object.entries(grouped).map(([type, options]) => ({
      label: typeLabelMap[type] || type,
      options,
    }));
  }, [searchField, suggestedData]);

  const handleSelect = (selected: SingleValue<ISearchOption>) => {
    if (selected) {
      setSelectedOption(selected);
      const typePathMap: Record<string, string> = {
        doctor: "doctors",
        service: "services/service-detail",
        specialty: "specialties",
      };
      const path = selected.type
        ? typePathMap[selected.type] || selected.type
        : "";
      router.push(`/patient/${path}/${selected.value}`);
    }
  };

  const placeholder = useMemo(() => {
    return (
      fields.find((f) => f.value === searchField)?.placeholder || "Tìm kiếm..."
    );
  }, [searchField, fields]);

  const customSingleValue = ({ data }: { data: ISearchOption }) => (
    <div className="flex items-center gap-2 overflow-hidden">
      {data.image && (
        <Image
          src={`${imgUrl}/${data.image}`}
          alt={data.label}
          height={40}
          width={40}
          className="rounded-md flex-shrink-0"
        />
      )}
      <span className="truncate">{data.label}</span>
    </div>
  );

  const customOption = (props: OptionProps<ISearchOption, false>) => {
    const { data, innerRef, innerProps, isFocused } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${
          isFocused ? "bg-cyan-100" : ""
        }`}
      >
        {data.image && (
          <Image
            src={`${imgUrl}/${data.image}`}
            alt={data.label}
            height={50}
            width={50}
            className="rounded-md"
          />
        )}
        <span className="text-gray-800">{data.label}</span>
      </div>
    );
  };

  const formatGroupLabel = (group: GroupBase<ISearchOption>) => (
    <div className="py-1 border-b border-gray-300 text-sm font-semibold text-gray-600">
      {group.label?.toUpperCase() || ""}
    </div>
  );

  return (
    <div className="w-full px-4 flex justify-center">
      <div className="w-full max-w-4xl flex flex-row gap-1 items-center">
        {" "}
        {/* Select Field */}
        <div className="w-full md:w-auto md:min-w-[100px]">
          <select
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
              setSelectedOption(null);
            }}
            className="w-full border h-[40px] rounded-md p-2 text-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {fields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        </div>
        {/* Search Box */}
        <div className="min-w-[300px]">
          <Select
            options={searchField === "all" ? groupedOptions : filteredOptions}
            placeholder={placeholder}
            onChange={handleSelect}
            value={selectedOption}
            components={{
              SingleValue: customSingleValue,
              Option: customOption,
            }}
            formatGroupLabel={
              searchField === "all" ? formatGroupLabel : undefined
            }
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "40px", // Giảm chiều cao cho hộp Select
                boxShadow: "none",
                borderColor: "#D1D5DB",
                "&:hover": { borderColor: "#374151" },
                "&:focus-within": {
                  borderColor: "#06b6d4",
                  boxShadow: "0 0 0 1px #06b6d4",
                },
              }),
              valueContainer: (base) => ({
                ...base,
                height: "40px", // Giảm chiều cao cho phần chứa giá trị
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }),
              input: (base) => ({
                ...base,
                margin: "0px",
                padding: "0px",
              }),
              singleValue: (base) => ({
                ...base,
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
