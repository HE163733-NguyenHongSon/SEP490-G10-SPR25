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

interface IDashboardAdminStatistic {
  time: string;
  revenue: number;
  year: number;
}

interface StatisticsChartProps {
  items: IDashboardAdminStatistic[];
}


const StatisticsChart: React.FC<StatisticsChartProps> = ({ items }) => {
  // Tạo mảng 12 tháng bằng tiếng Việt
  const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", 
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  // Tách dữ liệu theo năm
  const currentYear = new Date().getFullYear();
  const currentYearData = items.filter(item => item.year === currentYear);
  const lastYearData = items.filter(item => item.year === currentYear - 1);

  // Tạo dữ liệu cho các dataset
  const createDataset = (yearData: IDashboardAdminStatistic[]) => {
    return months.map((_, index) => {
      const monthData = yearData.find(item => 
        new Date(item.time).getMonth() === index
      );
      return monthData ? monthData.revenue : 0;
    });
  };

  const data: ChartData<"line"> = {
    labels: months,
    datasets: [
      {
        label: `Năm trước (${currentYear - 1})`,
        data: createDataset(lastYearData),
        fill: false,
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: `Năm nay (${currentYear})`,
        data: createDataset(currentYearData),
        fill: false,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          color: "#6B7280",
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value.toLocaleString()} VND`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        }
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
          callback: (value) => `${Number(value).toLocaleString()} VND`,
        },
      },
    },
  };

  return (
    <div className="rounded-2xl max-h-fit border border-gray-300 p-5 dark:border-gray-700 sm:px-6 sm:pt-6 shadow-md">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Thống kê doanh thu
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            So sánh doanh thu giữa năm nay và năm trước
          </p>
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