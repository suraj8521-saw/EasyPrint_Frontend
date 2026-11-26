import { Users, Upload, MapPin, Zap } from "lucide-react";
import type { AccountSelectionCardProps } from "../components/AccountSelectionCard";

export const customerData: AccountSelectionCardProps = {
  theme: "purple",
  title: "I'm a Customer",
  description:
    "Upload documents, customize your prints and get them from nearby print shops.",
  imageSrc: "/images/customer-transparent.png",
  imageAlt: "EasyPrint Customer",
  headerIcon: Users,
  features: [
    { id: "upload-edit", label: "Upload & Edit", icon: Upload },
    { id: "choose-shop", label: "Choose Shop", icon: MapPin },
    { id: "quick-print", label: "Quick Print", icon: Zap },
  ],
  ctaLabel: "Continue as Customer",
  ctaLink: "/customer/register",
};