"use client";

import DashboardSection from "../DashboardSection";
import { salesData } from "@/lib/sales-data";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function SalesChart() {
  return (
    <DashboardSection
      title="Évolution du chiffre d’affaires"
      subtitle="Performance des 7 derniers mois"
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563EB"
                  stopOpacity={0.45}
                />
                <stop
                  offset="100%"
                  stopColor="#2563EB"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1F2937"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
            />

            <YAxis
              stroke="#9CA3AF"
              tickFormatter={(value) => `${value} €`}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;

                return (
                  <div className="rounded-xl border border-blue-700 bg-[#0F172A] p-4 shadow-xl">
                    <p className="mb-2 text-sm font-semibold text-white">
                      {label}
                    </p>

                    <p className="font-semibold text-blue-400">
                      💰 Chiffre d’affaires
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                      {payload[0].value} €
                    </p>
                  </div>
                );
              }}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#salesGradient)"
              animationDuration={1200}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#3B82F6",
              }}
              activeDot={{
                r: 8,
                fill: "#60A5FA",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardSection>
  );
}