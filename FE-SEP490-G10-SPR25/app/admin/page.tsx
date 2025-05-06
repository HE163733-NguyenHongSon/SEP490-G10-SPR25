import type { Metadata } from "next";
import { HospitalMetrics } from "./components/HospitalMetrics";
import React from "react";
import { MonthlyTarget } from "./components/MonthlyTarget";
import MonthlySalesChart from "./components/MonthlySalesChart";
import StatisticsChart from "./components/StatisticsChart";
import RecentOrders from "./components/RecentOrders";
import DemographicCard from "./components/DemographicCard";
import { adminService } from "@/common/services/adminService";
import { ExportButton } from "./components/ExportButton";

export const metadata: Metadata = {
  title: "Trang Quản Trị",
  description: "Trang quản trị hệ thống",
};

export default async function AnalyticsPage() {
  const dashboardData: IDashboardAdmin = await adminService.getDashboard();
  const statistics: IDashboardAdminStatistic[] =
    await adminService.getStatics();
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Bảng Điều Khiển</h1>

          <ExportButton />
        </div>
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <HospitalMetrics items={dashboardData} />

        {/* <MonthlySalesChart /> */}
      </div>

     
      {/* 
      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div> */}
    </div>
  );
}
