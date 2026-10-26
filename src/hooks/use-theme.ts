import { useCallback, useEffect, useState } from "react";

/**
 * Light or dark, remembered in localStorage and defaulting to the system
 * setting. Shared by the API reference and the home page / blog layouts.
 */
export function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = useCallback(() => setDark((d) => !d), []);

  return { dark, toggleDark };
}
