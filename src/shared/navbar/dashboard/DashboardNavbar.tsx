import { Store } from "lucide-react";

import NavbarLogo from "./components/NavbarLogo";
import NavbarSearch from "./components/NavbarSearch";
import NotificationButton from "./components/NavbarNotificationButton";
import ProfileDropDown from "./components/ProfileDropDown";
import ThemeToggle from "../../Theme-Toggle/ThemeToggle";

const DashboardNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex min-h-[76px] w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavbarLogo icon={Store} title="Shopkeeper Dashboard" />

        {/* Search */}
        <div className="mx-4 hidden flex-1 justify-center lg:flex">
          <NavbarSearch placeholder="Search orders, customers, documents..." />
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <NotificationButton />

          <ThemeToggle />

          <ProfileDropDown />
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;