import DashboardSection from "../DashboardSection";
import { getRecentActivity } from "@/lib/dashboard-queries";

import {
  CheckCircle2,
  PackagePlus,
  RotateCcw,
  ShoppingCart,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";

const activityConfig = {
  PURCHASE: {
    label: "Achat fournisseur",
    icon: PackagePlus,
  },
  SALE: {
    label: "Vente",
    icon: ShoppingCart,
  },
  BUILD: {
    label: "Assemblage",
    icon: Wrench,
  },
  RETURN: {
    label: "Retour",
    icon: RotateCcw,
  },
  ADJUSTMENT: {
    label: "Ajustement stock",
    icon: SlidersHorizontal,
  },
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function RecentActivity() {
  const activities = await getRecentActivity();

  return (
    <DashboardSection
      title="🕒 Activité récente"
      subtitle="Derniers mouvements enregistrés dans Neon"
    >
      {activities.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-[#0F172A] p-4">
          <p className="font-semibold text-white">
            Aucune activité récente
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Les prochains mouvements de stock apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const config = activityConfig[activity.type];
            const Icon = config?.icon ?? CheckCircle2;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-xl border border-gray-800 bg-[#0F172A] p-4"
              >
                <div className="rounded-xl bg-blue-600/20 p-3 text-blue-400">
                  <Icon size={18} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-white">
                      {config?.label ?? "Activité"}
                    </p>

                    <span className="text-xs text-gray-500">
                      {formatDate(activity.createdAt)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-400">
                    {activity.reason}
                  </p>

                  <p className="mt-2 text-sm text-gray-300">
                    {activity.itemName}{" "}
                    <span className="font-semibold text-white">
                      {activity.quantity > 0 ? "+" : ""}
                      {activity.quantity}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardSection>
  );
}