export const theme = {
  colors: {
    // Canvas & Surfaces
    background: '#0B0E14',
    surfaceContainer: '#121824',
    surface: '#1A2234',
    surfaceModal: '#222D44',
    border: '#2A3650',

    // Accents & Branding
    primary: '#7C3AED',
    primaryGradientStart: '#8B5CF6',
    primaryGradientEnd: '#6366F1',
    secondary: '#06B6D4',
    suspense: '#F59E0B',
    danger: '#F43F5E',
    dangerAmbient: 'rgba(244, 63, 94, 0.3)',
    success: '#10B981',

    // Typography Contrast
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#475569',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    margin: 20, // Margin desktop/mobile safe area
  },
  typography: {
    fontFamily: {
      regular: 'PlusJakartaSans_400Regular',
      medium: 'PlusJakartaSans_500Medium',
      semiBold: 'PlusJakartaSans_600SemiBold',
      bold: 'PlusJakartaSans_700Bold',
      extraBold: 'PlusJakartaSans_800ExtraBold',
    },
    sizes: {
      xs: 11,   // Caption
      sm: 13,   // Label-md
      md: 14,   // Body-md
      lg: 16,   // Body-lg
      xl: 22,   // Headline-md
      xxl: 28,  // Headline-lg
      xxxl: 40, // Display-lg
      timer: 48, // Timer display
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    level1: '0px 8px 24px rgba(0, 0, 0, 0.45)',
    level2: '0px 16px 40px rgba(0, 0, 0, 0.65)',
  }
} as const;

export type Theme = typeof theme;
