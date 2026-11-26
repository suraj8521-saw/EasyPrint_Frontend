import type { Dispatch, SetStateAction } from "react";

import ThemeToggle from "../../Theme-Toggle/ThemeToggle";
import Button from "../../button/Button";
import navItems from "./navItems";

interface MobileNavbarProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
}

const MobileNavbar = ({
  menuOpen,
  setMenuOpen,
  activeItem,
  setActiveItem,
}: MobileNavbarProps) => {
  if (!menuOpen) return null;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[1px] lg:hidden"
      />

      {/* Responsive Menu Card */}
      <nav
        aria-label="Mobile Navigation"
        className="
          absolute left-0 right-0 top-full z-50 mt-2.5
          flex max-h-[calc(100dvh-5rem)] flex-col gap-1.5 overflow-y-auto
          rounded-3xl border border-slate-200/90 bg-white/95 p-4
          shadow-xl backdrop-blur-md
          dark:border-slate-700/90 dark:bg-slate-900/95
          sm:left-auto sm:right-0 sm:mt-3 sm:w-80 sm:p-5
          lg:hidden
        "
      >
        {/* Navigation Items */}
        {navItems.map((item: string) => {
          const isActive = activeItem === item;

          return (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              onClick={() => {
                setActiveItem(item);
                closeMenu();
              }}
              className={`
                block rounded-full px-5 py-3 text-center text-sm font-semibold
                transition-all duration-200 sm:text-left
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-blue-400"
                }
              `}
            >
              {item}
            </a>
          );
        })}

        {/* Divider */}
        <div className="my-1.5 border-t border-purple-100/80 dark:border-slate-800" />

        {/* Dark Mode Row Toggle */}
        <ThemeToggle variant="row" />

        {/* Full-Width Get Started Button */}
        <Button onClick={closeMenu} fullWidth className="mt-1.5" />
      </nav>
    </>
  );
};

export default MobileNavbar;