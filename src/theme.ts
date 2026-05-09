/**
 * Programmatic theme + design tokens. Browser defaults and first paint also use
 * `src/styles/design-tokens.css` — keep hex values aligned when changing the palette.
 */
// Brand marks (logo gradient) — unchanged from product identity
export const brandBlue = '#28B0EB'
export const brandGreen = '#1ACD96'
export const brandGradient = `linear-gradient(90deg, ${brandBlue}, ${brandGreen})`

export type ThemeMode = 'light' | 'dark'

/**
 * Design tokens aligned with `mock/dairykonnect.html` :root palette.
 * CSS variables use the same names as the mock (--green-800, --cream, …).
 */
export interface DesignTokens {
    green900: string
    green800: string
    green700: string
    green600: string
    green500: string
    green400: string
    green300: string
    green200: string
    green100: string
    cream: string
    cream2: string
    ink: string
    ink2: string
    muted: string
    line: string
    gold: string
    coral: string
    sky: string
    shadowSm: string
    shadowMd: string
    shadowLg: string
    radius: string
}

/** Light palette — matches mock/dairykonnect.html */
export const lightDesignTokens: DesignTokens = {
    green900: '#0f3a2e',
    green800: '#155e3f',
    green700: '#1f7a4d',
    green600: '#2a9d62',
    green500: '#43c47e',
    green400: '#7ce0a8',
    green300: '#b8f0cd',
    green200: '#dff7e7',
    green100: '#eefbf2',
    cream: '#fbf9f3',
    cream2: '#f5f1e6',
    ink: '#0c1f17',
    ink2: '#234334',
    muted: '#5a6b62',
    line: '#e3e9e2',
    gold: '#c89b3a',
    coral: '#ff7a59',
    sky: '#76b7e0',
    shadowSm: '0 1px 2px rgba(15,58,46,.06), 0 2px 6px rgba(15,58,46,.04)',
    shadowMd: '0 6px 18px rgba(15,58,46,.08), 0 2px 6px rgba(15,58,46,.05)',
    shadowLg: '0 24px 60px rgba(15,58,46,.14), 0 6px 16px rgba(15,58,46,.06)',
    radius: '18px',
}

/** Dark palette — same variable names; values tuned for contrast on deep green-gray */
export const darkDesignTokens: DesignTokens = {
    green900: '#e8f4ee',
    green800: '#43c47e',
    green700: '#5ed396',
    green600: '#2a9d62',
    green500: '#1f7a4d',
    green400: '#1a6540',
    green300: '#164f33',
    green200: '#123d29',
    green100: '#0f2e20',
    cream: '#0f1614',
    cream2: '#15211c',
    ink: '#ecf6f0',
    ink2: '#bcd4c8',
    muted: '#8aa395',
    line: 'rgba(255,255,255,0.12)',
    gold: '#d4b060',
    coral: '#ff9578',
    sky: '#8cc8ed',
    shadowSm: '0 1px 2px rgba(0,0,0,.35), 0 2px 6px rgba(0,0,0,.25)',
    shadowMd: '0 6px 18px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.3)',
    shadowLg: '0 24px 60px rgba(0,0,0,.55), 0 6px 16px rgba(0,0,0,.35)',
    radius: '18px',
}

export const designTokensByMode: Record<ThemeMode, DesignTokens> = {
    light: lightDesignTokens,
    dark: darkDesignTokens,
}

export function designTokensToCssVars(tokens: DesignTokens): Record<string, string> {
    return {
        '--green-900': tokens.green900,
        '--green-800': tokens.green800,
        '--green-700': tokens.green700,
        '--green-600': tokens.green600,
        '--green-500': tokens.green500,
        '--green-400': tokens.green400,
        '--green-300': tokens.green300,
        '--green-200': tokens.green200,
        '--green-100': tokens.green100,
        '--cream': tokens.cream,
        '--cream-2': tokens.cream2,
        '--ink': tokens.ink,
        '--ink-2': tokens.ink2,
        '--muted': tokens.muted,
        '--line': tokens.line,
        '--gold': tokens.gold,
        '--coral': tokens.coral,
        '--sky': tokens.sky,
        '--shadow-sm': tokens.shadowSm,
        '--shadow-md': tokens.shadowMd,
        '--shadow-lg': tokens.shadowLg,
        '--radius': tokens.radius,
    }
}

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
    brandGradient: string
    brandBlue: string
    brandGreen: string
}

function buildTheme(tokens: DesignTokens, mode: ThemeMode): Theme {
    return {
        primary: tokens.green800,
        secondary: tokens.green700,
        background: tokens.cream,
        text: tokens.ink,
        inputBackground:
            mode === 'light' ? 'rgba(12, 31, 23, 0.06)' : 'rgba(255, 255, 255, 0.08)',
        placeholder:
            mode === 'light' ? 'rgba(12, 31, 23, 0.45)' : 'rgba(236, 246, 240, 0.45)',
        border: tokens.line,
        error: mode === 'light' ? '#ef4444' : '#f87171',
        success: tokens.green600,
        darkerBackground: tokens.cream2,
        overlay:
            mode === 'light' ? 'rgba(251, 249, 243, 0.92)' : 'rgba(15, 22, 20, 0.88)',
        brandGradient,
        brandBlue,
        brandGreen,
    }
}

export const lightTheme: Theme = buildTheme(lightDesignTokens, 'light')
export const darkTheme: Theme = buildTheme(darkDesignTokens, 'dark')

export const themes = {
    light: lightTheme,
    dark: darkTheme,
} as const

export const getTheme = (mode: ThemeMode): Theme => themes[mode]

export const getPrimaryColor = (mode: ThemeMode): string => designTokensByMode[mode].green800

export const generateCSSVariables = (theme: Theme, mode: ThemeMode): Record<string, string> => {
    return {
        ...designTokensToCssVars(designTokensByMode[mode]),
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
