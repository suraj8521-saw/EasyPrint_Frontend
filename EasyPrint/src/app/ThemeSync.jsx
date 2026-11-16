
import { useEffect } from "react";
import { useAppSelector } from "./hooks";

const ThemeSync = () => {
  const theme = useAppSelector(
    (state) => state.theme.mode
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  return null;
};

export default ThemeSync;
