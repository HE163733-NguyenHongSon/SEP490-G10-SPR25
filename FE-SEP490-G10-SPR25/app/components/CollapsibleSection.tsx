"use client";

import { useCollapse } from "react-collapsed";
import Image from "next/image";
import React from "react";
import { assets } from "@/public/images/assets";

interface CollapsibleSectionProps {
  title: string;
  titleImage?: string;
  content: string | React.ReactNode;
  defaultExpanded: boolean;
}

export default function CollapsibleSection({
  title,
  titleImage,
  content,
  defaultExpanded,
}: CollapsibleSectionProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: defaultExpanded,
  });

  return (
    <div className="flex flex-col   border-b border-gray-300 ">
      <button
        className="relative  flex flex-row items-center  px-1 py-3 gap-2"
        {...getToggleProps()}
      >
        {" "}
        {titleImage && (
          <Image src={titleImage} width={20} height={20} alt="title image" />
        )}
        <h1 className=" font-semibold text-base ">{title}</h1>
        <Image
          className="absolute right-2"
          src={isExpanded ? assets.collapse : assets.expand}
          width={20}
          height={20}
          alt="collapse-expand"
        />
      </button>

      <section className="flex items-center px-2" {...getCollapseProps()}>
        {typeof content === "string" ? (
          <span
            dangerouslySetInnerHTML={{
              __html: content
                .replace(/(?:^|\n)\s*-\s*/g, "<br />- ") // Thay thế dấu "-" đầu dòng
                .replace(/\n/g, "<br />") // Thay thế xuống dòng
                .replace(/\s{2,}/g, " "), // Loại bỏ khoảng trắng dư thừa
            }}
          />
        ) : (
          content
        )}{" "}
      </section>
    </div>
  );
}
