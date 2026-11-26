import { Zap, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
}

export const featuresData: FeatureItem[] = [
  {
    id: "fast-easy",
    icon: Zap,
    title: "Fast & Easy",
    text: "Upload, configure, and print in under 60 seconds. No more waiting in lines.",
  },
  {
    id: "multi-format",
    icon: FileCheck2,
    title: "Multi-Format",
    text: "Support for PDF, Word, images and more — all in one place.",
  },
  {
    id: "edit-online",
    icon: Sparkles,
    title: "Edit Online",
    text: "Crop, rotate and adjust settings right in your browser before printing.",
  },
  {
    id: "secure-private",
    icon: ShieldCheck,
    title: "Secure & Private",
    text: "Your documents are encrypted and automatically deleted after printing.",
  },
];