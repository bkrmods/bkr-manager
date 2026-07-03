import DashboardSection from "../DashboardSection";
import { getRecentOrders } from "@/lib/dashboard-queries";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    PENDING: "En attente",
    PAID: "Payée",
    PREPARING: "En préparation",
    SHIPPED: "Expédiée",
    DELIVERED: "Livrée",
    CANCELLED: "Annulée",
    REFUNDED: "Remboursée",
  };

  return labels[status] ?? status;
}

export default async function RecentOrders() {
  const recentOrders = await getRecentOrders();

  return (
    <DashboardSection
      title="Dernières commandes"
      subtitle="Les dernières commandes enregistrées dans Neon"
    >
      <div className="overflow-hidden rounded-xl border border-gray-800">
        <table className="w-full">
          <thead className="bg-[#0F172A]">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-400">
                Commande
              </th>

              <th className="px-4 py-3 text-left text-sm text-gray-400">
                Client
              </th>

              <th className="px-4 py-3 text-left text-sm text-gray-400">
                Produit
              </th>

              <th className="px-4 py-3 text-left text-sm text-gray-400">
                Montant
              </th>

              <th className="px-4 py-3 text-left text-sm text-gray-400">
                Statut
              </th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-800 transition hover:bg-[#1A2234]"
              >
                <td className="px-4 py-4 font-medium text-white">
                  {order.id}
                </td>

                <td className="px-4 py-4 text-gray-300">
                  {order.customer}
                </td>

                <td className="px-4 py-4 text-gray-300">
                  {order.product}
                </td>

                <td className="px-4 py-4 font-semibold text-white">
                  {formatCurrency(order.amount)}
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
                    {formatStatus(order.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardSection>
  );
}