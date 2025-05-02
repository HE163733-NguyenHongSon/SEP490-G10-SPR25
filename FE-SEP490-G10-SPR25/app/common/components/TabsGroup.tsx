"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "@/common/components/LoadingTable";

interface TabsGroupProps<T> {
  tabs: ITabItem[];
  RenderComponent: React.ComponentType<{ items: T[] }>;
  displayView?: string;
}

export const TabsGroup = <T,>({
  tabs,
  RenderComponent,
  displayView,
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

  return (
    <Tabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
      <TabList className="flex space-x-4 border-b overflow-auto">
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            className={`relative pb-2 transition-all duration-200 cursor-pointer focus:outline-none
              ${
                selectedIndex === idx
                  ? "border-b-2 border-cyan-500 text-cyan-600 font-medium"
                  : "border-b-2 border-transparent text-gray-500 hover:border-gray-300"
              }`}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {tabs.map((_, idx) => (
        <TabPanel key={idx}>
          <div className="py-4">
            {isLoading && selectedIndex === idx ? (
              <LoadingTable />
            ) : isError ? (
              <p className="text-red-500">Lỗi tải dữ liệu</p>
            ) : (
              <RenderComponent
                items={data || []}
                {...(displayView ? { displayView } : {})}
              />
            )}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};
