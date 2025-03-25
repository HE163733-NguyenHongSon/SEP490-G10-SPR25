import type { Metadata } from "next";
import { HospitalMetrics } from "./components/HospitalMetrics";
import React from "react";
import MonthlyTarget from "./components/MonthlyTarget";
import MonthlySalesChart from "./components/MonthlySalesChart";
import StatisticsChart from "./components/StatisticsChart";
import RecentOrders from "./components/RecentOrders";
import DemographicCard from "./components/DemographicCard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard page",
};

export default function AnalyticsPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <HospitalMetrics/>

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
