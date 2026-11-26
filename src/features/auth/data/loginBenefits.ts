import { Zap, ShieldCheck, Layers3, type LucideIcon } from "lucide-react";

export interface AuthBenefitItem {
  icon: LucideIcon;
  title: string;
}

export const LOGIN_BENEFITS: AuthBenefitItem[] = [
  {
    icon: Zap,
    title: "Quick & Easy",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
  },
  {
    icon: Layers3,
    title: "Multiple Shops",
  },
];