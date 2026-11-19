
import {
  ShoppingCart,
  Users,
  Layers,
  IndianRupee,
} from "lucide-react";

import StatCard from "./StatCard";

const stats = [
  {
    title: "Total Orders",
    value: "--",
    icon: ShoppingCart,
    iconColor: "text-[#c084fc] dark:text-[#c084fc]",
    bgColor: "bg-purple-100/70 dark:bg-purple-950/70",
  },
  {
    title: "Total Customers",
    value: "--",
    icon: Users,
    iconColor: "text-[#93c5fd] dark:text-[#93c5fd]",
    bgColor: "bg-blue-100/70 dark:bg-blue-950/70",
  },
  {
    title: "Total Prints",
    value: "--",
    icon: Layers,
    iconColor: "text-[#86efac] dark:text-[#4ade80]",
    bgColor: "bg-emerald-100/70 dark:bg-emerald-950/70",
  },
  {
    title: "Total Earnings",
    value: "--",
    icon: IndianRupee,
    iconColor: "text-[#fbbf24] dark:text-[#fbbf24]",
    bgColor: "bg-amber-100/70 dark:bg-amber-950/70",
  },
];

const DashboardStats = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
};

export default DashboardStats;
