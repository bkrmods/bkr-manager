import PageHeader from "@/components/shared/PageHeader";

import StatCard from "@/components/dashboard/stats/StatCard";
import SalesChart from "@/components/dashboard/charts/SalesChart";
import RecentOrders from "@/components/dashboard/tables/RecentOrders";

import LowStock from "@/components/dashboard/widgets/LowStock";
import MonthlyGoal from "@/components/dashboard/widgets/MonthlyGoal";
import RecentActivity from "@/components/dashboard/widgets/RecentActivity";

import { dashboardStats } from "@/lib/dashboard-data";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8">

      <PageHeader
        title="Dashboard"
        subtitle="Bienvenue sur BKR Manager."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>

      <SalesChart />

      <div className="grid gap-6 lg:grid-cols-2">
        <LowStock />
        <MonthlyGoal />
      </div>

      <RecentActivity />

      <RecentOrders />

    </div>
  );
}