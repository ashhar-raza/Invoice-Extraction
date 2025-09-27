import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'orange';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { id: Theme; name: string; preview: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themes: ThemeContextType['themes'] = [
    { id: 'light', name: 'Light', preview: 'bg-white border-gray-200' },
    { id: 'dark', name: 'Dark', preview: 'bg-gray-900 border-gray-700' },
    { id: 'blue', name: 'Ocean Blue', preview: 'bg-blue-50 border-blue-200' },
    { id: 'green', name: 'Forest Green', preview: 'bg-green-50 border-green-200' },
    { id: 'purple', name: 'Royal Purple', preview: 'bg-purple-50 border-purple-200' },
    { id: 'orange', name: 'Sunset Orange', preview: 'bg-orange-50 border-orange-200' }
  ];

  const [theme, setTheme] = useState<Theme>('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('invoice-ai-theme') as Theme | null;
    if (savedTheme && themes.some(t => t.id === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme and save to localStorage
  useEffect(() => {
    localStorage.setItem('invoice-ai-theme', theme);

    // Remove all theme classes first
    document.documentElement.classList.remove(...themes.map(t => t.id));

    // Add the current theme class
    document.documentElement.classList.add(theme);
  }, [theme, themes]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
