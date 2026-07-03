import InventoryStatusBadge from "@/components/inventory/InventoryStatusBadge";

type Component = {
  id: string;
  name: string;
  sku: string;
  type: string;
  supplierName: string;
  unitCost: number;
  stock: number;
  lowStockThreshold: number;
  status: string;
};

type ComponentsTableProps = {
  components: Component[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatComponentType(type: string) {
  const labels: Record<string, string> = {
    MOVEMENT: "Mouvement",
    CASE: "Boîtier",
    DIAL: "Cadran",
    HANDS: "Aiguilles",
    BRACELET: "Bracelet",
    BEZEL: "Lunette",
    CRYSTAL: "Verre",
    CROWN: "Couronne",
    OTHER: "Autre",
  };

  return labels[type] ?? type;
}

export default function ComponentsTable({
  components,
}: ComponentsTableProps) {
  return (
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
            {components.map((component) => {
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
                    {formatComponentType(component.type)}
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
  );
}