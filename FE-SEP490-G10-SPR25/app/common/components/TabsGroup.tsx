"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "@/common/components/LoadingTable";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // import styles for react-multi-carousel

interface TabsGroupProps<T> {
  tabs: ITabItem[];
  RenderComponent: React.ComponentType<{
    items: T[];
    displayView?: string;
    userType?: "guest" | "patient";
  }>;
  displayView?: string;
  userType?: "guest" | "patient";
}

export const TabsGroup = <T,>({
  tabs,
  RenderComponent,
  displayView,
  userType = "patient",
}: TabsGroupProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentTab = tabs[selectedIndex];

  const { data, isLoading, isError } = useQuery<T[]>({
    queryKey: ["tab-data", currentTab.href],
    queryFn: async () => {
      const res = await fetch(currentTab.href);
      if (!res.ok) throw new Error("Lỗi khi gọi API");
      return res.json();
    },
    staleTime: 5000,
  });

  // Cấu hình cho react-multi-carousel
  const carouselSettings = {
    responsive: {
      superLarge: {
        breakpoint: { max: 4000, min: 1500 },
        items: 5, // Hiển thị 5 tab
      },
      large: {
        breakpoint: { max: 1500, min: 1024 },
        items: 4, 
      },
      medium: {
        breakpoint: { max: 1024, min: 768 },
        items: 3, 
      },
      small: {
        breakpoint: { max: 768, min: 480 },
        items: 2, 
      },
      xsmall: {
        breakpoint: { max: 480, min: 0 },
        items: 1, 
      },
    },
    infinite: false,
    dots: true,
    arrows: true,
    beforeChange: (nextIndex: number) => setSelectedIndex(nextIndex),
  };

  return (
    <div className="tabs-carousel-container" style={{ width: "100%" }}>
      <Carousel {...carouselSettings}>
        {tabs.map((tab, idx) => (
          <div key={idx}>
            <div
              className={`relative pb-2 transition-all duration-200 cursor-pointer focus:outline-none
                ${selectedIndex === idx
                  ? "border-b-2 border-cyan-500 text-cyan-600 font-medium"
                  : "border-b-2 border-transparent text-gray-500 hover:border-gray-300"
                }`}
              onClick={() => setSelectedIndex(idx)}
              style={{
                padding: "10px 15px",
                textAlign: "center",
                margin: "0 5px",
                transition: "all 0.3s ease",
              }}
            >
              {tab.label}
            </div>
          </div>
        ))}
      </Carousel>

      <div className="py-4">
        {isLoading ? (
          <LoadingTable />
        ) : isError ? (
          <p className="text-red-500">Lỗi tải dữ liệu</p>
        ) : (
          <RenderComponent
            items={data || []}
            {...(displayView ? { displayView } : {})}
            userType={userType}
          />
        )}
      </div>
    </div>
  );
};
