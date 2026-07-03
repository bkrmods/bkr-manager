import DashboardSection from "../DashboardSection";
import SalesChartClient from "./SalesChartClient";

import { getSalesChartData } from "@/lib/dashboard-queries";

export default async function SalesChart() {
  const salesData = await getSalesChartData();

  return (
    <DashboardSection
      title="Évolution du chiffre d’affaires"
      subtitle="Chiffre d’affaires mensuel depuis Neon"
    >
      <SalesChartClient data={salesData} />
    </DashboardSection>
  );
}