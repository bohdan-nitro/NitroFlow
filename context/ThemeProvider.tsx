"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface ThemeProps {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  const handleThemeChange = () => {
    // Eсли у нас в локалсторадже нету ничего или локалсторадж хранит темную тему тогда мы ставим класс на темную тему
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("prefer-colors-scheme: dark").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      // Иначе переключаем на светлую тему и убераем класс темной темы заменяя его на светлую
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be use with ThemeProvider");
  }
  return context;
}
