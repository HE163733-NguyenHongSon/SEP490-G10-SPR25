"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  const [searchField, setSearchField] = useState<string>(defaultField);
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

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
  }, [searchField, suggestedData, filteredOptions]);

  const handleSelect = (selected: SingleValue<ISearchOption>) => {
    if (selected) {
      const typePathMap: Record<string, string> = {
        doctor: "doctor-detail",
        service: "services/service-detail",
        specialty: "specialties",
      };
      const path = selected.type ? typePathMap[selected.type] || selected.type : "";
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
      <Image
        src={`${imgUrl}/${data.image}`}
        alt={data.label}
        height={40}
        width={40}
        className="rounded-md flex-shrink-0"
      />
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
        <Image
          src={`${imgUrl}/${data.image}`}
          alt={data.label}
          height={50}
          width={50}
          className="rounded-md"
        />
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
    <div className="w-[600px] mx-auto my-20">
      <div className="flex items-center">
        {/* Select Field Type */}
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="border h-[50px] rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none font-semibold pr-2"
        >
          {fields.map((field) => (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>

        {/* Search box */}
        <div className="flex-1">
          <Select
            options={searchField === "all" ? groupedOptions : filteredOptions}
            placeholder={placeholder}
            onChange={handleSelect}
            components={{
              SingleValue: customSingleValue,
              Option: customOption,
            }}
            formatGroupLabel={searchField === "all" ? formatGroupLabel : undefined}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "50px",
                boxShadow: "none",
                "&:hover": { borderColor: "#374151" },
              }),
              valueContainer: (base) => ({
                ...base,
                height: "50px",
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
