import { BarChart, CreditCard, Home, List } from "lucide-react";

export const config = [
  {
    label: "Счета",
    Icon: CreditCard,
    link: "/bills",
  },
  {
    label: "Категории",
    Icon: List,
    link: "/categories",
  },
  {
    label: "Операции",
    Icon: Home,
    link: "/operations",
  },
  {
    label: "Отчёты",
    Icon: BarChart,
    link: "/reports",
  },
];
