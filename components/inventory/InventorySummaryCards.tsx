import type { ElementType } from "react";

import {
  AlertTriangle,
  Boxes,
  Cpu,
  Package,
} from "lucide-react";

type InventorySummary = {
  productCount: number;
  componentCount: number;
  productStock: number;
  componentStock: number;
  lowStockCount: number;
};

type InventorySummaryCardsProps = {
  summary: InventorySummary;
};

type SummaryCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: ElementType;
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

export default function InventorySummaryCards({
  summary,
}: InventorySummaryCardsProps) {
  const totalStock = summary.productStock + summary.componentStock;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Montres"
        value={summary.productCount.toString()}
        subtitle="Produits finis"
        icon={Package}
      />

      <SummaryCard
        title="Composants"
        value={summary.componentCount.toString()}
        subtitle="Pièces détachées"
        icon={Cpu}
      />

      <SummaryCard
        title="Stock total"
        value={totalStock.toString()}
        subtitle="Montres + composants"
        icon={Boxes}
      />

      <SummaryCard
        title="Stock critique"
        value={summary.lowStockCount.toString()}
        subtitle="À surveiller"
        icon={AlertTriangle}
      />
    </div>
  );
}