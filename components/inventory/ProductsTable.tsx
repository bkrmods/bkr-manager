import InventoryStatusBadge from "@/components/inventory/InventoryStatusBadge";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  sellingPrice: number;
  costPrice: number;
  margin: number;
  stock: number;
  lowStockThreshold: number;
  status: string;
};

type ProductsTableProps = {
  products: Product[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductsTable({
  products,
}: ProductsTableProps) {
  return (
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
            {products.map((product) => {
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
  );
}