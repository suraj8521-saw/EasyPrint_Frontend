import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import navItems from "./navItems";

const MobileNavbar = ({ menuOpen, setMenuOpen }) => {
  if (!menuOpen) return null;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className="
        absolute left-4 right-4 top-full mt-3
        flex flex-col gap-2 rounded-3xl
        border border-slate-200 bg-white p-5
        shadow-xl dark:border-slate-700
        dark:bg-slate-900 md:hidden
      "
    >
      {/* Navigation Links */}
      {navItems.map((item, index) => {
        const path =
          item === "Home" ? "/" : `/${item.toLowerCase().replaceAll(" ", "-")}`;

        return (
          <button
            key={item}
            type="button"
            onClick={() => navigate(path)}
            className={`
              cursor-pointer rounded-full px-5 py-3 text-sm font-semibold
              transition-all duration-300
              ${
                index === 0
                  ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                  : "text-slate-500 hover:bg-white hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-400"
              }
            `}
          >
            {item}
          </button>
        );
      })}

      {/* Login */}
      <Link
        to="/auth/login"
        onClick={closeMenu}
        className="
          rounded-xl px-4 py-3
          font-semibold text-slate-600
          hover:bg-blue-50
          dark:text-slate-200 dark:hover:bg-slate-800
        "
      >
        Login
      </Link>

      {/* Get Started */}
      <Link
        to="/account-selection"
        onClick={closeMenu}
        className="
          mt-2 flex items-center justify-center
          gap-2 rounded-full bg-purple-700
          px-5 py-3 font-bold text-white
          transition hover:bg-purple-800
        "
      >
        Get Started
        <ArrowRight size={17} />
      </Link>
    </div>
  );
};

export default MobileNavbar;
