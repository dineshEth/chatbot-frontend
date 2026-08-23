'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Update data-theme attribute on html element
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      // Update CSS variables for smooth transition
      const root = document.documentElement;
      if (theme === 'dark') {
        root.style.setProperty('--primary', '#FBF5DD');
        root.style.setProperty('--primary-light', '#E7E1B1');
        root.style.setProperty('--accent', '#306D29');
        root.style.setProperty('--background', '#0D530E');
        root.style.setProperty('--foreground', '#FBF5DD');
      } else {
        root.style.setProperty('--primary', '#0D530E');
        root.style.setProperty('--primary-light', '#306D29');
        root.style.setProperty('--accent', '#E7E1B1');
        root.style.setProperty('--background', '#FBF5DD');
        root.style.setProperty('--foreground', '#0D530E');
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Render children even when not mounted to avoid hydration mismatch
  // The theme will be applied once mounted
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
