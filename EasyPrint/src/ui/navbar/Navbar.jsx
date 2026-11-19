
import MainNavbar from "./MainNavbar";
import AccountNavbar from "./AccountNavbar";
import ShopDashboardNavbar from "./shop-dashbaord/ShopDashboardNavbar";

const Navbar = ({ variant = "main" }) => {
  if (variant === "account") {
    return <AccountNavbar />;
  }

  if (variant === "shop-dashboard") {
    return <ShopDashboardNavbar />;
  }

  return <MainNavbar />;
};

export default Navbar;
