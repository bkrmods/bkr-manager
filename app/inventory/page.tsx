import Link from "next/link";

import { Plus } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";

import InventorySummaryCards from "@/components/inventory/InventorySummaryCards";
import ProductsTable from "@/components/inventory/ProductsTable";
import ComponentsTable from "@/components/inventory/ComponentsTable";

import { getInventoryData } from "@/lib/inventory-queries";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const inventory = await getInventoryData();

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-start justify-between gap-6">
        <PageHeader
          title="Inventory"
          subtitle="Gère tes montres, composants et stocks depuis Neon."
        />

        <Link
          href="/inventory/new"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Ajouter un produit
        </Link>
      </div>

      <InventorySummaryCards summary={inventory.summary} />

      <ProductsTable products={inventory.products} />

      <ComponentsTable components={inventory.components} />
    </div>
  );
}