import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  QrCode,
  Printer,
  Tag,
  ChartNoAxesColumnIncreasing,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/shop/dashboard",
    icon: LayoutDashboard,
    locked: false,
  },
  {
    title: "Orders",
    path: "/shop/orders",
    icon: ShoppingBag,
    locked: true,
  },
  {
    title: "Customers",
    path: "/shop/customers",
    icon: Users,
    locked: true,
  },
  {
    title: "QR & Shop Link",
    path: "/shop/qr-code",
    icon: QrCode,
    locked: true,
  },
  {
    title: "Services",
    path: "/shop/services",
    icon: Printer,
    locked: true,
  },
  {
    title: "Pricing",
    path: "/shop/pricing",
    icon: Tag,
    locked: true,
  },
  {
    title: "Earnings",
    path: "/shop/earnings",
    icon: ChartNoAxesColumnIncreasing,
    locked: true,
  },
  {
    title: "Settings",
    path: "/shop/settings",
    icon: Settings,
    locked: true,
  },
];