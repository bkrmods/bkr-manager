import DashboardSection from "../DashboardSection";
import { getMonthlyGoal } from "@/lib/dashboard-queries";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function MonthlyGoal() {
  const goal = await getMonthlyGoal();

  const progressWidth = Math.min(goal.percentage, 100);

  return (
    <DashboardSection
      title="🎯 Objectif du mois"
      subtitle="Progression du chiffre d’affaires depuis Neon"
    >
      <div className="space-y-6">
        <div>
          <p className="text-3xl font-bold text-white">
            {formatCurrency(goal.current)}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Objectif mensuel : {formatCurrency(goal.target)}
          </p>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${progressWidth}%`,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-green-400">
            {goal.percentage} % atteint
          </span>

          <span className="text-gray-400">
            Reste : {formatCurrency(goal.remaining)}
          </span>
        </div>
      </div>
    </DashboardSection>
  );
}