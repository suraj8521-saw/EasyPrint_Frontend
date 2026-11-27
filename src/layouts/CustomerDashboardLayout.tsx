import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LayoutGrid, LogIn, QrCode, UserCheck, UserRound } from "lucide-react";

import { useAuthSession } from "../features/auth/api/authQueries";
import PageBackground from "../shared/pageBackground/PageBackground";
import NavbarLogo from "../shared/navbar/dashboard/components/NavbarLogo";
import ThemeToggle from "../shared/Theme-Toggle/ThemeToggle";
import ProfileDropDown from "../shared/navbar/dashboard/components/ProfileDropDown";

const CustomerDashboardLayout = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthSession();

  const isLoggedInCustomer = Boolean(isAuthenticated && user);

  return (
    <PageBackground className="min-h-screen text-slate-900 selection:bg-purple-600 selection:text-white dark:text-slate-100">
      <header className="sticky top-0 z-40 w-full border-b border-purple-100 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <NavbarLogo icon={UserCheck} title="Customer Portal" />

          <div className="flex items-center gap-2 sm:gap-3">
            <NavLink
              to="/customer/dashboard"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition sm:text-sm ${
                  isActive
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </NavLink>

            <NavLink
              to="/customer/scan"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition sm:text-sm ${
                  isActive
                    ? "bg-purple-700 text-white"
                    : "bg-purple-50 text-purple-800 hover:bg-purple-100 dark:bg-slate-800 dark:text-purple-300"
                }`
              }
            >
              <QrCode className="h-4 w-4" />
              <span>Scan QR</span>
            </NavLink>

            <ThemeToggle />

            {isLoggedInCustomer ? (
              <ProfileDropDown />
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 md:inline-flex">
                  <UserRound className="h-3.5 w-3.5" />
                  Guest Mode
                </span>
                <Link
                  to="/auth/login"
                  state={{ from: location }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-purple-800 sm:text-sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </PageBackground>
  );
};

export default CustomerDashboardLayout;