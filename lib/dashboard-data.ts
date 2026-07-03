import {
  Wallet,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Chiffre d'affaires",
    value: "2 350 €",
    icon: Wallet,
    change: "+18 % ce mois",
  },
  {
    title: "Commandes",
    value: "18",
    icon: ShoppingCart,
    change: "+6 aujourd'hui",
  },
  {
    title: "Stock",
    value: "147",
    icon: Package,
    change: "12 nouveaux produits",
  },
  {
    title: "Bénéfices",
    value: "620 €",
    icon: TrendingUp,
    change: "+9 %",
  },
];