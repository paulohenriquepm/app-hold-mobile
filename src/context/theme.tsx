import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

interface IThemeContext {
  currentTheme: DefaultTheme;
  handleToggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = Appearance.getColorScheme();
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(light);

  const loadTheme = useCallback(async () => {
    setCurrentTheme(light);

    return;

    const themeStorage = await AsyncStorage.getItem('@apphold:theme');

    if (themeStorage) {
      setCurrentTheme(JSON.parse(themeStorage));

      return;
    }

    setCurrentTheme(colorScheme === 'light' ? light : dark);
  }, [colorScheme]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const handleToggleTheme = useCallback(async () => {
    const themeToStorage = currentTheme.title === 'light' ? dark : light;

    setCurrentTheme(themeToStorage);
    await AsyncStorage.setItem(
      '@apphold:theme',
      JSON.stringify(themeToStorage),
    );
  }, [currentTheme.title]);

  return (
    <ThemeContext.Provider value={{ currentTheme, handleToggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

function useThemeContext(): IThemeContext {
  const context = useContext(ThemeContext);

  return context;
}

export { ThemeProvider, useThemeContext };
