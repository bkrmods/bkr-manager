import DashboardSection from "../DashboardSection";
import { recentActivity } from "@/lib/recent-activity";

export default function RecentActivity() {
  return (
    <DashboardSection
      title="🕒 Activité récente"
      subtitle="Dernières actions enregistrées"
    >
      <div className="space-y-3">
        {recentActivity.map((activity) => (
          <div
            key={activity}
            className="rounded-xl border border-gray-800 bg-[#0F172A] px-4 py-3 text-gray-300"
          >
            {activity}
          </div>
        ))}
      </div>
    </DashboardSection>
  );
}