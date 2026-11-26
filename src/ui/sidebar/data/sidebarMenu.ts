import {
  LayoutGrid,
  ShoppingBag,
  Users,
  QrCode,
  Printer,
  Tag,
  ChartNoAxesColumnIncreasing,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface SidebarNavItemConfig {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  requiresVerification: boolean;
}

export const SHOP_SIDEBAR_MENU: SidebarNavItemConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/shop/dashboard",
    icon: LayoutGrid,
    requiresVerification: false,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/shop/orders",
    icon: ShoppingBag,
    requiresVerification: true,
  },
  {
    id: "customers",
    label: "Customers",
    path: "/shop/customers",
    icon: Users,
    requiresVerification: true,
  },
  {
    id: "qr-link",
    label: "QR & Shop Link",
    path: "/shop/qr-link",
    icon: QrCode,
    requiresVerification: true,
  },
  {
    id: "services",
    label: "Services",
    path: "/shop/services",
    icon: Printer,
    requiresVerification: true,
  },
  {
    id: "pricing",
    label: "Pricing",
    path: "/shop/pricing",
    icon: Tag,
    requiresVerification: true,
  },
  {
    id: "earnings",
    label: "Earnings",
    path: "/shop/earnings",
    icon: ChartNoAxesColumnIncreasing,
    requiresVerification: true,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/shop/settings",
    icon: Settings,
    requiresVerification: true,
  },
];