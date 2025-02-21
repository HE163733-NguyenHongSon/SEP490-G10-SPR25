"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface DisplayToggleProps {
  displayView: string;
  setDisplayView: (view: string) => void;
}

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
    <div className="flex flex-row">
      <button
        className={`px-4 py-2 rounded-md shadow-md ${
          displayView === "grid"
            ? "bg-cyan-500 text-white"
            : "border border-gray-300 text-gray-700"
        }`}
        onClick={() => handleDisplayChange("grid")}
      >
        Grid View
      </button>
      <button
        className={`ml-2 px-4 py-2 rounded-md shadow-md ${
          displayView === "list"
            ? "bg-cyan-500 text-white"
            : "border border-gray-300 text-gray-700"
        }`}
        onClick={() => handleDisplayChange("list")}
      >
        List View
      </button>
    </div>
  );
};

export default DisplayToggle;
