import { createContext, useState } from "react";
import { useColorScheme } from "react-native";
import { ColorTheme, darkColors, lightColors } from "../theme/Colors";

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  colors: ColorTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const isDark = themeMode === 'auto' ? systemColorScheme === 'dark' : themeMode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}