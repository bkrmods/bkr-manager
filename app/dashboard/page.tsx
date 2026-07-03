import StatCard from "@/components/dashboard/stats/StatCard";
import { dashboardStats } from "@/lib/dashboard-data";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Bienvenue sur BKR Manager.
        </p>
      </div>

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
    </div>
  );
}