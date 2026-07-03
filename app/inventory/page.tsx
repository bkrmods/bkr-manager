import PageHeader from "@/components/shared/PageHeader";
import InventoryStatusBadge from "@/components/inventory/InventoryStatusBadge";

import { getInventoryData } from "@/lib/inventory-queries";

import {
  AlertTriangle,
  Boxes,
  Cpu,
  Package,
} from "lucide-react";

export const dynamic = "force-dynamic";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

type SummaryCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
};

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {value}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {subtitle}
          </p>
        </div>

        <div className="rounded-xl bg-blue-600/20 p-3 text-blue-400">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default async function InventoryPage() {
  const inventory = await getInventoryData();

  return (
    <div className="space-y-8 p-8">
      <PageHeader
        title="Inventory"
        subtitle="Gère tes montres, composants et stocks depuis Neon."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Montres"
          value={inventory.summary.productCount.toString()}
          subtitle="Produits finis"
          icon={Package}
        />

        <SummaryCard
          title="Composants"
          value={inventory.summary.componentCount.toString()}
          subtitle="Pièces détachées"
          icon={Cpu}
        />

        <SummaryCard
          title="Stock total"
          value={(
            inventory.summary.productStock +
            inventory.summary.componentStock
          ).toString()}
          subtitle="Montres + composants"
          icon={Boxes}
        />

        <SummaryCard
          title="Stock critique"
          value={inventory.summary.lowStockCount.toString()}
          subtitle="À surveiller"
          icon={AlertTriangle}
        />
      </div>

      <section className="rounded-2xl border border-gray-800 bg-[#111827] p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Montres prêtes à vendre
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Produits finis enregistrés dans Neon.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-800">
          <table className="w-full">
            <thead className="bg-[#0F172A]">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Nom
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  SKU
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Prix
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Coût
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Marge
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Stock
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Statut
                </th>
              </tr>
            </thead>

            <tbody>
              {inventory.products.map((product) => {
                const isLowStock =
                  product.stock <= product.lowStockThreshold;

                return (
                  <tr
                    key={product.id}
                    className="border-t border-gray-800 transition hover:bg-[#1A2234]"
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium text-white">
                        {product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {product.sku}
                    </td>

                    <td className="px-4 py-4 font-semibold text-white">
                      {formatCurrency(product.sellingPrice)}
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {formatCurrency(product.costPrice)}
                    </td>

                    <td className="px-4 py-4 text-green-400">
                      {formatCurrency(product.margin)}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={
                          isLowStock
                            ? "font-bold text-red-400"
                            : "font-bold text-white"
                        }
                      >
                        {product.stock}
                      </span>

                      <span className="ml-1 text-xs text-gray-500">
                        / seuil {product.lowStockThreshold}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <InventoryStatusBadge status={product.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-800 bg-[#111827] p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Composants
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Pièces détachées utilisées pour assembler les montres.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-800">
          <table className="w-full">
            <thead className="bg-[#0F172A]">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Nom
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Type
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Fournisseur
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Coût unité
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Stock
                </th>

                <th className="px-4 py-3 text-left text-sm text-gray-400">
                  Statut
                </th>
              </tr>
            </thead>

            <tbody>
              {inventory.components.map((component) => {
                const isLowStock =
                  component.stock <= component.lowStockThreshold;

                return (
                  <tr
                    key={component.id}
                    className="border-t border-gray-800 transition hover:bg-[#1A2234]"
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium text-white">
                        {component.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {component.sku}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {component.type}
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {component.supplierName}
                    </td>

                    <td className="px-4 py-4 font-semibold text-white">
                      {formatCurrency(component.unitCost)}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={
                          isLowStock
                            ? "font-bold text-red-400"
                            : "font-bold text-white"
                        }
                      >
                        {component.stock}
                      </span>

                      <span className="ml-1 text-xs text-gray-500">
                        / seuil {component.lowStockThreshold}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <InventoryStatusBadge status={component.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}