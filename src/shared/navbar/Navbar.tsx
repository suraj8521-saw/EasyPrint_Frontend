import MainNavbar from "../navbar/components/MainNavbar";
import AccountNavbar from "../navbar/Account-Navbar/AccountNavbar";
import DashboardNavbar from "./dashboard/DashboardNavbar";

export type NavbarVariant =
  | "main"
  | "account"
  | "shop-dashboard"
  | "shop-locked-dashboard"
  | "customer-dashboard"
  | "admin-dashboard";

interface NavbarProps {
  variant?: NavbarVariant;
}

const Navbar = ({ variant = "main" }: NavbarProps) => {
  switch (variant) {
    case "account":
      return <AccountNavbar />;

    case "shop-dashboard":
      return <DashboardNavbar />;

    case "shop-locked-dashboard":
    case "customer-dashboard":
    case "admin-dashboard":
      // Jab tak inke dedicated navbars ban rahe hain, fallback ya respective navbar return karein
      return <DashboardNavbar />;

    case "main":
    default:
      return <MainNavbar />;
  }
};

export default Navbar;