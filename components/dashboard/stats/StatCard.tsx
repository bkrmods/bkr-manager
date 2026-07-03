import { LucideIcon, TrendingUp } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-800 bg-[#111827] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-blue-600/20 p-3 text-blue-400">
          <Icon size={24} />
        </div>

      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-green-400">

        <TrendingUp size={16} />

        <span>{change}</span>

      </div>

    </div>
  );
}