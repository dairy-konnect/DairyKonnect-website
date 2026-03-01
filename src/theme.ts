// Simple theme configuration with light and dark color schemes

export type ThemeMode = 'light' | 'dark'

// Logo / brand gradient colors (hexagon DK logo: blue → green)
export const brandBlue = '#28B0EB'
export const brandGreen = '#1ACD96'
export const brandGradient = `linear-gradient(90deg, ${brandBlue}, ${brandGreen})`

export interface Theme {
    primary: string
    secondary: string
    background: string
    text: string
    inputBackground: string
    placeholder: string
    border: string
    error: string
    success: string
    darkerBackground: string
    overlay: string
    /** Logo gradient: blue (#28B0EB) to green (#1ACD96) */
    brandGradient: string
    brandBlue: string
    brandGreen: string
}

// Light Theme Colors
export const lightTheme: Theme = {
    primary: '#00d684',
    secondary: '#059669',
    background: '#ffffff',
    text: '#1e293b',
    inputBackground: 'rgba(0, 0, 0, 0.05)',
    placeholder: 'rgba(0, 0, 0, 0.5)',
    border: 'rgba(0, 0, 0, 0.2)',
    error: '#ef4444',
    success: '#00d684',
    darkerBackground: '#f1f5f9',
    overlay: 'rgba(255, 255, 255, 0.9)',
    brandGradient,
    brandBlue,
    brandGreen,
}

// Dark Theme Colors
export const darkTheme: Theme = {
    primary: '#4ade80',
    secondary: '#00d684',
    background: '#1e293b',
    text: '#ffffff',
    inputBackground: 'rgba(255, 255, 255, 0.1)',
    placeholder: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(255, 255, 255, 0.2)',
    error: '#f87171',
    success: '#4ade80',
    darkerBackground: '#0f172a',
    overlay: 'rgba(255, 255, 255, 0.1)',
    brandGradient,
    brandBlue,
    brandGreen,
}

// Theme map
export const themes = {
    light: lightTheme,
    dark: darkTheme,
} as const

// Helper function to get theme colors
export const getTheme = (mode: ThemeMode): Theme => themes[mode]

// Get primary color from theme
export const getPrimaryColor = (mode: ThemeMode): string => {
    return themes[mode].primary
}

// CSS Custom Properties generator for themes
export const generateCSSVariables = (theme: Theme) => {
    return {
        '--color-primary': theme.primary,
        '--color-secondary': theme.secondary,
        '--color-background': theme.background,
        '--color-text': theme.text,
        '--color-input-background': theme.inputBackground,
        '--color-placeholder': theme.placeholder,
        '--color-border': theme.border,
        '--color-error': theme.error,
        '--color-success': theme.success,
        '--color-darker-background': theme.darkerBackground,
        '--color-overlay': theme.overlay,
        '--brand-blue': theme.brandBlue,
        '--brand-green': theme.brandGreen,
        '--brand-gradient': theme.brandGradient,
    }
}
