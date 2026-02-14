// src/types/theme.types.ts
export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  secondaryText: string;
  border: string;
  like: string;
  dislike: string;
  primary: string;
  accent: string;
  shadow: string;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}