import DashboardSection from "../DashboardSection";
import { monthlyGoal } from "@/lib/monthly-goal";

export default function MonthlyGoal() {
  const percentage = Math.round(
    (monthlyGoal.current / monthlyGoal.target) * 100
  );

  return (
    <DashboardSection
      title="🎯 Objectif du mois"
      subtitle="Progression du chiffre d’affaires"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">
            Chiffre d’affaires
          </span>

          <span className="font-bold text-white">
            {monthlyGoal.current.toLocaleString("fr-FR")} €
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">
            Objectif : {monthlyGoal.target.toLocaleString("fr-FR")} €
          </span>

          <span className="font-semibold text-green-400">
            {percentage} %
          </span>
        </div>
      </div>
    </DashboardSection>
  );
}