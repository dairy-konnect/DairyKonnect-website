// Theme configuration - non-color settings only
// All colors are defined in ../theme.ts

import { type ThemeState } from '../store/slices/themeSlice'
import { getPrimaryColor } from '../theme'

export type ThemeConfig = ThemeState

// Default configuration - now managed by Redux store
// primaryColor is derived from theme.ts
export const themeConfig: ThemeConfig = {
  primaryColor: getPrimaryColor('light'), // Derived from theme.ts
  mode: 'light',
  direction: 'ltr',
  locale: 'en',
  navMode: 'themed',
  controlSize: 'md',
  cardBordered: false,
  panelExpand: false,
  primaryColorLevel: 600,
}

export default themeConfig