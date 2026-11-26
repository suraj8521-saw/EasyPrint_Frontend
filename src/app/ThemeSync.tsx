import { useLayoutEffect } from "react";
import { useAppSelector } from "./hooks";

const ThemeSync = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.classList.toggle("dark", theme === "dark");

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage errors
    }

    const frame = requestAnimationFrame(() => {
      root.classList.remove("theme-switching");
    });

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("theme-switching");
    };
  }, [theme]);

  return null;
};

export default ThemeSync;
