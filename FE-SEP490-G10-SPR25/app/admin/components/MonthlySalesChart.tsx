"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
TooltipItem } from "chart.js";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlySalesChart() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
        backgroundColor: "#0891b2",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) => ` ${tooltipItem.raw as number}`,
        },
      },
    },
  };

  return (
    <div className="shadow-md overflow-hidden rounded-2xl border  px-5 pt-5 border-gray-300  p-5  dark:border-gray-700 sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Sales
        </h3>
        <button onClick={toggleDropdown} className="dropdown-toggle">
          ...
        </button>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          {/* <Bar data={data} option={options} height={180} /> */}
        </div>
      </div>
    </div>
  );
}