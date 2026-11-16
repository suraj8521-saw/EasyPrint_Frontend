
import { useState } from "react";
import { Menu, X } from "lucide-react";

import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
import MobileNavbar from "./MobileNavbar";
import navItems from "./navItems";

import { Link } from "react-router-dom";

const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 lg:px-12">
      <nav
        className="
          relative mx-auto flex max-w-[1500px]
          items-center justify-between gap-2
          rounded-full border border-white/80
          bg-white/90 px-4 py-3
          shadow-[0_12px_40px_rgba(15,23,42,0.06)]
          backdrop-blur-xl transition-all duration-300
          dark:border-slate-700 dark:bg-slate-900/90
          sm:px-8 sm:py-4
        "
      >
        {/* Logo */}
        <BrandLogo />

        {/* Desktop Navigation - Exact Center */}
        <div
          className="
            absolute left-1/2 hidden -translate-x-1/2
            items-center gap-1 rounded-full
            border border-slate-200 bg-slate-100/90
            p-1.5 dark:border-slate-700
            dark:bg-slate-800 md:flex
          "
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className={`
                rounded-full px-5 py-3 text-sm font-semibold
                transition-all duration-300
                ${
                  index === 0
                    ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                    : "text-slate-500 hover:bg-white hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                }
              `}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Navbar Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
          <ThemeToggle />

          {/* Get Started */}
          <Link
            to="/account-selection"
            className="
              hidden items-center justify-center
              rounded-full bg-gradient-to-r
              from-purple-600 to-purple-700
              px-7 py-3.5 text-sm font-bold text-white
              shadow-lg shadow-purple-500/25
              transition-all duration-300
              hover:-translate-y-1 hover:scale-105
              hover:from-purple-700 hover:to-purple-800
              hover:shadow-xl hover:shadow-purple-500/40
              active:translate-y-0 active:scale-95
              sm:flex
            "
          >
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              flex h-10 w-10 shrink-0 items-center
              justify-center rounded-full
              text-slate-800 transition
              hover:bg-slate-100
              dark:text-white dark:hover:bg-slate-800
              md:hidden
            "
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navbar Component */}
      <MobileNavbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </header>
  );
};

export default MainNavbar;
