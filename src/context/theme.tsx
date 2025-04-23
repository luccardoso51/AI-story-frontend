import React, { createContext, ReactNode } from 'react';
import { colors, Colors } from '../theme/colors';
import { fonts, fontSizes, Fonts, FontSizes } from '../theme/fonts';

// Define the theme interface
export interface ThemeProps {
  colors: Colors;
  fonts: Fonts;
  fontSizes: FontSizes;
  backgroundColor: string;
  // Add other theme properties as needed
}

// Create the default theme
const defaultTheme: ThemeProps = {
  colors,
  fonts,
  fontSizes,
  backgroundColor: colors.cotton
};

// Create the context with proper typing
const ThemeContext = createContext<ThemeProps>(defaultTheme);

// Dark theme could be used later
// const darkTheme: ThemeProps = {
//   colors,
//   fonts,
//   fontSizes,
//   backgroundColor: colors.espresso
// };

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // const colorScheme = useColorScheme();
  // const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const theme = defaultTheme;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeProps => React.useContext(ThemeContext);
