import { useState, createContext, useContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import themes from '../theme'

const ThemeContext = createContext();

export function ThemeWrapper({ children }) {
  const [usertheme, setUserTheme] = useState('dark');
  const changeTheme = (newtheme) => {
    setUserTheme(newtheme);
  }

  useEffect(() => {
    const scheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const storage = window.localStorage.getItem('@sudokutheme');
    setUserTheme(storage || (scheme?.matches ? 'dark' : 'light'))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('@sudokutheme', usertheme);
  }, [usertheme]);

  const contextProps = {
    usertheme, changeTheme
  };

  return (
    <ThemeContext.Provider value={contextProps}>
      <ThemeProvider theme={usertheme === "dark" ? themes.dark : themes.light}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
