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
      <PageHeader
        title="Inventory"
        subtitle="Gère tes montres, composants et stocks depuis Neon."
      />

      <InventorySummaryCards summary={inventory.summary} />

      <ProductsTable products={inventory.products} />

      <ComponentsTable components={inventory.components} />
    </div>
  );
}