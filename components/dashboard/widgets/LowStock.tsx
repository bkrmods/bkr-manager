import DashboardSection from "../DashboardSection";

const products = [
  {
    name: "GMT Pepsi",
    stock: 2,
  },
  {
    name: "Explorer II",
    stock: 1,
  },
  {
    name: "Datejust 36",
    stock: 3,
  },
];

export default function LowStock() {
  return (
    <DashboardSection
      title="⚠ Produits à recommander"
      subtitle="Stock critique"
    >
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 p-4"
          >
            <div>
              <p className="font-semibold text-white">
                {product.name}
              </p>

              <p className="text-sm text-gray-400">
                Stock restant
              </p>
            </div>

            <span className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
              {product.stock}
            </span>
          </div>
        ))}
      </div>
    </DashboardSection>
  );
}