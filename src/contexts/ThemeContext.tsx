import React, { createContext, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setThemeMode, type ThemeState } from '../store/slices/themeSlice'
import { getTheme, generateCSSVariables, type ThemeMode, type Theme } from '../theme'

interface ThemeContextValue {
  theme: Theme
  themeConfig: ThemeState
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const themeConfig = useAppSelector((state) => state.theme)
  const theme = getTheme(themeConfig.mode)

  const toggleTheme = () => {
    const newMode: ThemeMode = themeConfig.mode === 'light' ? 'dark' : 'light'
    dispatch(setThemeMode(newMode))
  }

  const setTheme = (mode: ThemeMode) => {
    dispatch(setThemeMode(mode))
  }

  // Apply CSS custom properties to document root
  useEffect(() => {
    const root = document.documentElement
    const cssVariables = generateCSSVariables(theme)

    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    // Add theme class to html element for Tailwind dark mode
    if (themeConfig.mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme, themeConfig.mode])

  // Persist theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('dairy-konnect-theme-mode', themeConfig.mode)
  }, [themeConfig.mode])

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('dairy-konnect-theme-mode') as ThemeMode
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      dispatch(setThemeMode(savedTheme))
    }
  }, [dispatch])

  const contextValue: ThemeContextValue = {
    theme,
    themeConfig,
    toggleTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext }