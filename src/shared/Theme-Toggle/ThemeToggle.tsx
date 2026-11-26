import { Sun, Moon } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleTheme } from "../../features/theme/themeSlice";

interface ThemeToggleProps {
  size?: number;
  variant?: "icon" | "row";
}

const ThemeToggle = ({ size = 20, variant = "icon" }: ThemeToggleProps) => {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state) => state.theme.mode === "dark");

  // Mobile Menu Row Design
  if (variant === "row") {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Toggle dark mode"
        onClick={() => dispatch(toggleTheme())}
        className="
          flex w-full cursor-pointer items-center justify-between
          rounded-2xl px-2 py-2.5 text-left
          
          hover:bg-slate-50 dark:hover:bg-slate-800/60
        "
      >
        {/* Left: Lavender Circle Icon + Label */}
        <div className="flex items-center gap-3.5">
          <span
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-purple-100/80 text-slate-800
              
              dark:bg-slate-800 dark:text-yellow-400
            "
          >
            {dark ? <Sun size={size} /> : <Moon size={size} />}
          </span>
          <span className="text-[15px] font-medium text-slate-900 dark:text-slate-100">
            Dark Mode
          </span>
        </div>

        {/* Right: Pill Toggle Switch */}
        <span
          className={`
            relative inline-flex h-7 w-12 shrink-0 items-center rounded-full
            
            ${dark ? "bg-purple-600" : "bg-slate-300"}
          `}
        >
          <span
            className={`
              inline-block h-5 w-5 transform rounded-full bg-white shadow-sm
              transition-transform duration-300
              ${dark ? "translate-x-6" : "translate-x-1"}
            `}
          />
        </span>
      </button>
    );
  }

  // Desktop Navbar Default Icon Button
  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="
        flex h-9 w-9 shrink-0 cursor-pointer
        items-center justify-center rounded-full
        border border-slate-200/80
        bg-white/70 text-slate-700
        shadow-sm transition-all duration-200
        hover:bg-purple-50 hover:text-purple-600
        active:scale-90
        dark:border-slate-700
        dark:bg-slate-800/70
        dark:text-yellow-400
        dark:hover:bg-slate-700
        sm:h-10 sm:w-10
      "
    >
      {dark ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
};

export default ThemeToggle;