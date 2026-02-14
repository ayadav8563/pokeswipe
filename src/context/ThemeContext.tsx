// src/context/ThemeContext.tsx (Simplified version)
import React, { createContext, useState, useContext, ReactNode, JSX } from 'react';
import { ThemeColors, ThemeContextType } from '../types/theme.types';

// Color schemes
const lightColors: ThemeColors = {
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#333333',
  secondaryText: '#666666',
  border: '#EEEEEE',
  like: '#4CAF50',
  dislike: '#F44336',
  primary: '#E3350D',
  accent: '#FFCB05',
  shadow: '#000000',
};

const darkColors: ThemeColors = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  secondaryText: '#AAAAAA',
  border: '#333333',
  like: '#4CAF50',
  dislike: '#F44336',
  primary: '#E3350D',
  accent: '#FFCB05',
  shadow: '#000000',
};

// Create the context with a default value (type assertion)
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const theme: ThemeContextType = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? darkColors : lightColors,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};