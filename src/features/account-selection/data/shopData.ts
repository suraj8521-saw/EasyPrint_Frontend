import { Store, Settings, Layers, ChartNoAxesColumn } from "lucide-react";
import type { AccountSelectionCardProps } from "../components/AccountSelectionCard";

export const shopData: AccountSelectionCardProps = {
  theme: "blue",
  title: "I'm a Shopkeeper",
  description:
    "Manage print orders, set prices, and grow your printing business online.",
  imageSrc: "/images/shopkeeper-transparent.png",
  imageAlt: "EasyPrint Shopkeeper",
  headerIcon: Store,
  features: [
    { id: "manage-orders", label: "Manage Orders", icon: Settings },
    { id: "set-pricing", label: "Set Pricing", icon: Layers },
    { id: "track-earnings", label: "Track Earnings", icon: ChartNoAxesColumn },
  ],
  ctaLabel: "Continue as Shopkeeper",
  ctaLink: "/shop/register",
};