"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StatisticsChartProps {
  items: IDashboardAdminStatistic[];
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ items }) => {
  const labels = items.map((item) => item.time);
  const appointmentData = items.map((item) => item.appointmentCount);
  const revenueData = items.map((item) => item.revenue);

  const data: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        label: "Lịch hẹn",
        data: appointmentData,
        fill: true,
        backgroundColor: "rgba(70, 95, 255, 0.2)",
        borderColor: "#0891b2",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Doanh thu",
        data: revenueData,
        fill: true,
        backgroundColor: "rgba(156, 185, 255, 0.2)",
        borderColor: "#9CB9FF",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        align: "start",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "#e5e7eb",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="rounded-2xl max-h-fit border border-gray-300 p-5 dark:border-gray-700 sm:px-6 sm:pt-6 shadow-md">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Thống kê lịch khám
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Số lượng lịch khám và doanh thu theo từng tháng trong năm        
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          {/* <ChartTab /> */}
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Line data={data} options={options} height={310} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
