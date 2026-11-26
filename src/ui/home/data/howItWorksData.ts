import { UploadCloud, Sparkles, Printer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StepItem {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
}

export const howItWorksData: StepItem[] = [
  {
    id: "upload-or-scan",
    number: "01",
    icon: UploadCloud,
    title: "Upload or Scan QR",
    text: "Upload your documents or scan the QR code at a nearby shop.",
  },
  {
    id: "edit-document",
    number: "02",
    icon: Sparkles,
    title: "Edit Your Document",
    text: "Make changes, choose page settings and preview your document.",
  },
  {
    id: "print-nearby",
    number: "03",
    icon: Printer,
    title: "Print at Nearby Shop",
    text: "Choose a print shop, place your order and collect your prints.",
  },
];