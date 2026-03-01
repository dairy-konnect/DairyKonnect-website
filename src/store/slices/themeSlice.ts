import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ThemeMode, getPrimaryColor } from '../../theme'

export interface ThemeState {
  mode: ThemeMode
  primaryColor: string
  direction: 'ltr' | 'rtl'
  locale: string
  navMode: 'themed' | 'transparent'
  controlSize: 'xs' | 'sm' | 'md' | 'lg'
  cardBordered: boolean
  panelExpand: boolean
  primaryColorLevel: number
}

const initialState: ThemeState = {
  mode: 'light',
  primaryColor: getPrimaryColor('light'), // Derived from theme.ts
  direction: 'ltr',
  locale: 'en',
  navMode: 'themed',
  controlSize: 'md',
  cardBordered: false,
  panelExpand: false,
  primaryColorLevel: 600,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      // Update primary color based on theme mode
      state.primaryColor = getPrimaryColor(action.payload)
    },
    toggleThemeMode: (state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light'
      state.mode = newMode
      // Update primary color based on new theme mode
      state.primaryColor = getPrimaryColor(newMode)
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload
    },
    setDirection: (state, action: PayloadAction<'ltr' | 'rtl'>) => {
      state.direction = action.payload
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload
    },
    setNavMode: (state, action: PayloadAction<'themed' | 'transparent'>) => {
      state.navMode = action.payload
    },
    setControlSize: (state, action: PayloadAction<'xs' | 'sm' | 'md' | 'lg'>) => {
      state.controlSize = action.payload
    },
    setCardBordered: (state, action: PayloadAction<boolean>) => {
      state.cardBordered = action.payload
    },
    setPanelExpand: (state, action: PayloadAction<boolean>) => {
      state.panelExpand = action.payload
    },
    setPrimaryColorLevel: (state, action: PayloadAction<number>) => {
      state.primaryColorLevel = action.payload
    },
    resetTheme: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const {
  setThemeMode,
  toggleThemeMode,
  setPrimaryColor,
  setDirection,
  setLocale,
  setNavMode,
  setControlSize,
  setCardBordered,
  setPanelExpand,
  setPrimaryColorLevel,
  resetTheme,
} = themeSlice.actions

export default themeSlice.reducer