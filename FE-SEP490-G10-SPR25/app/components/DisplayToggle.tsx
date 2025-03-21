"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// interface DisplayToggleProps {
//   displayView: string;
//   setDisplayView: (view: string) => void;
// }

const DisplayToggle: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [displayView, setDisplayView] = useState<string>("grid");

  useEffect(() => {
    const currentView = searchParams.get("displayView");
    if (currentView) {
      setDisplayView(currentView);
    }
  }, [searchParams]);

  const handleDisplayChange = (view: string) => {
    setDisplayView(view);
    const params = new URLSearchParams(searchParams.toString());
    params.set("displayView", view);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <button
        className={`flex flex-row items-center justify-center h-[36px] px-3   rounded-md shadow-md  gap-x-1 ${
          displayView === "grid"
            ? "bg-cyan-500 text-white"
            : "border border-gray-300 text-gray-700"
        }`}
        onClick={() => handleDisplayChange("grid")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 26 26"
          fill="currentColor"
        >
          <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
        </svg>
        Lưới
      </button>
      <button
        className={`flex flex-row items-center justify-center h-[36px] px-3   rounded-md shadow-md  gap-x-1 ${
          displayView === "list"
            ? "bg-cyan-500 text-white"
            : "border border-gray-300 text-gray-700"
        }`}
        onClick={() => handleDisplayChange("list")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 26 26"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        Danh sách
      </button>
    </div>
  );
};

export default DisplayToggle;
