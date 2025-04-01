import type { Metadata } from "next";
import { EcommerceMetrics } from "./components/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "./components/MonthlyTarget";
import MonthlySalesChart from "./components/MonthlySalesChart";
import StatisticsChart from "./components/StatisticsChart";
import RecentOrders from "./components/RecentOrders";
import DemographicCard from "./components/DemographicCard";

export const metadata: Metadata = {
  title:
    "Receptionist Dashboard ",
  description: "Receptionist Dashboard",
};

export default function AnalyticsPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

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
