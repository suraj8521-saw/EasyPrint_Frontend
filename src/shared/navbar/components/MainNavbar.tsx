import { useState } from "react";
import { Menu, X } from "lucide-react";

import BrandLogo from "../../Brand-Logo/BrandLogo";
import ThemeToggle from "../../Theme-Toggle/ThemeToggle";
import MobileNavbar from "./MobileNavbar";
import Button from "../../button/Button";
import navItems from "./navItems";

const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>(navItems[0] ?? "Home");

  return (
    <header className="sticky top-0 z-50 px-3 pt-2.5 sm:px-6 sm:pt-3 lg:px-12">
      <div className="relative mx-auto max-w-[1500px]">
        <nav
          aria-label="Main Navigation"
          className="
            relative z-50 flex items-center justify-between gap-2
            rounded-full border border-white/80
            bg-white/95 px-4 py-3
            shadow-[0_12px_40px_rgba(15,23,42,0.06)]
            backdrop-blur-xl transition-all duration-300
            dark:border-slate-700 dark:bg-slate-900/95
            sm:px-6 sm:py-3.5 lg:px-8 lg:py-4
          "
        >
          {/* Left Side: Brand Logo */}
          <div className="shrink-0">
            <BrandLogo />
          </div>

          {/* Desktop Navigation - Exact Center */}
          <div
            className="
              absolute left-1/2 hidden -translate-x-1/2
              items-center gap-1 rounded-full
              border border-slate-200 bg-slate-100/90
              p-1.5 dark:border-slate-700
              dark:bg-slate-800 lg:flex
            "
          >
            {navItems.map((item: string) => {
              const isActive = activeItem === item;

              return (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                  onClick={() => setActiveItem(item)}
                  className={`
                    whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold
                    transition-all duration-300 xl:px-5 xl:py-3
                    ${
                      isActive
                        ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                        : "text-slate-500 hover:bg-white hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                    }
                  `}
                >
                  {item}
                </a>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3 lg:flex lg:gap-4">
            <ThemeToggle />
            <Button icon={null} />
          </div>

          {/* Right Side (Responsive): Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              flex h-10 w-10 shrink-0 cursor-pointer items-center
              justify-center rounded-full
              text-slate-800 transition
              hover:bg-slate-100
              dark:text-white dark:hover:bg-slate-800
              lg:hidden
            "
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </nav>

        {/* Mobile / Tablet Dropdown Menu */}
        <MobileNavbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>
    </header>
  );
};

export default MainNavbar;