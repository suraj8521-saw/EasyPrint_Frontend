import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleTheme } from "../../features/theme/themeSlice";

const ThemeToggle = ({ size = 22 }) => {
  const dispatch = useAppDispatch();

  const dark = useAppSelector((state) => state.theme.mode === "dark");

  // Apply theme globally
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="
    flex h-9 w-9 shrink-0 items-center justify-center
    rounded-full
    border border-slate-200/80
    bg-white/70
    text-slate-700
    shadow-sm
    transition-all duration-200
    hover:bg-purple-50 hover:text-purple-600
    active:scale-90
    dark:border-slate-700
    dark:bg-slate-800/70
    dark:text-yellow-400
    dark:hover:bg-slate-700
    sm:h-10 sm:w-10
    cursor-pointer
  "
    >
      {dark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
};

export default ThemeToggle;
