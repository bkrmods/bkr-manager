import DashboardSection from "../DashboardSection";
import { getLowStockProducts } from "@/lib/dashboard-queries";

export default async function LowStock() {
  const products = await getLowStockProducts();

  return (
    <DashboardSection
      title="⚠ Produits à recommander"
      subtitle="Stock critique depuis Neon"
    >
      {products.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-[#0F172A] p-4">
          <p className="font-semibold text-white">
            Aucun produit en stock critique
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Tous les produits sont au-dessus de leur seuil minimum.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 p-4"
            >
              <div>
                <p className="font-semibold text-white">
                  {product.name}
                </p>

                <p className="text-sm text-gray-400">
                  Seuil minimum : {product.lowStockThreshold}
                </p>
              </div>

              <span className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
                {product.stock}
              </span>
            </div>
          ))}
        </div>
      )}
    </DashboardSection>
  );
}