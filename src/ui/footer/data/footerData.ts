import type { IconType } from "react-icons";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: IconType;
  hoverClass: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
    hoverClass: "hover:border-blue-500 hover:bg-blue-600",
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: FaXTwitter,
    hoverClass: "hover:border-blue-500 hover:bg-blue-600",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    hoverClass: "hover:border-pink-500 hover:bg-pink-600",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Our Services",
    links: [
      { label: "Cloud Printing", href: "#services" },
      { label: "Instant Scan", href: "#services" },
      { label: "Business Orders", href: "#services" },
      { label: "Nearby Shops", href: "#shops" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { label: "Pricing Plans", href: "#pricing" },
      { label: "Help Center", href: "#support" },
      { label: "Terms of Use", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];