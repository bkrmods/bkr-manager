import DashboardSection from "../DashboardSection";
import { recentOrders } from "@/lib/recent-orders";

export default function RecentOrders() {
  return (
    <DashboardSection
      title="Dernières commandes"
      subtitle="Les dernières commandes enregistrées"
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
                className="border-t border-gray-800 hover:bg-[#1A2234] transition"
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
                  {order.amount}
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
                    {order.status}
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