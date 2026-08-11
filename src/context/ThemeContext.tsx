"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Theme, themes } from "@/data/themes";

interface ThemeContextValue {
  activeTheme: Theme;
  themeIndex: number;
  switchTheme: () => void;
  ready: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "active-theme-index";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idx = 0;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (parsed >= 0 && parsed < themes.length) idx = parsed;
      }
    } catch {}
    setThemeIndex(idx);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, String(themeIndex));
    } catch {}
  }, [themeIndex, ready]);

  const switchTheme = useCallback(() => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  }, []);

  return (
    <ThemeContext.Provider value={{ activeTheme: themes[themeIndex], themeIndex, switchTheme, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
