"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type DashboardTheme = "light" | "dark";

interface DashboardThemeContextType {
  theme: DashboardTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: DashboardTheme) => void;
}

const DashboardThemeContext = createContext<DashboardThemeContextType>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function DashboardThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<DashboardTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("venom_dashboard_theme") as DashboardTheme | null;
    if (stored === "dark" || stored === "light") {
      setThemeState(stored);
    } else {
      // Default to light theme matching the website
      setThemeState("light");
    }
  }, []);

  const setTheme = (newTheme: DashboardTheme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("venom_dashboard_theme", newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <DashboardThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      <div data-theme={theme} className={isDark ? "dark" : "light"}>
        {children}
      </div>
    </DashboardThemeContext.Provider>
  );
}

export function useDashboardTheme() {
  return useContext(DashboardThemeContext);
}

