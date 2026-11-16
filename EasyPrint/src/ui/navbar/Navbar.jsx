
import MainNavbar from "./MainNavbar";
import AccountNavbar from "./AccountNavbar";

const Navbar = ({ variant = "main" }) => {
  if (variant === "account") {
    return <AccountNavbar />;
  }

  return <MainNavbar />;
};

export default Navbar;
