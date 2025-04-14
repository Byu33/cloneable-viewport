import { Dimensions } from 'react-native';

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');

// Theme colors based on the CSS variables
export const colors = {
  // Light theme
  light: {
    background: '#FFFFFF',
    foreground: '#0F172A',
    
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    
    popover: '#FFFFFF',
    popoverForeground: '#0F172A',
    
    primary: '#1E293B',
    primaryForeground: '#F8FAFC',
    
    secondary: '#F1F5F9',
    secondaryForeground: '#1E293B',
    
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    
    accent: '#F1F5F9',
    accentForeground: '#1E293B',
    
    destructive: '#EF4444',
    destructiveForeground: '#F8FAFC',
    
    border: '#E2E8F0',
    input: '#E2E8F0',
    ring: '#0F172A',
  },
  
  // Dark theme
  dark: {
    background: '#0F172A',
    foreground: '#F8FAFC',
    
    card: '#0F172A',
    cardForeground: '#F8FAFC',
    
    popover: '#0F172A',
    popoverForeground: '#F8FAFC',
    
    primary: '#F8FAFC',
    primaryForeground: '#1E293B',
    
    secondary: '#1E293B',
    secondaryForeground: '#F8FAFC',
    
    muted: '#1E293B',
    mutedForeground: '#94A3B8',
    
    accent: '#1E293B',
    accentForeground: '#F8FAFC',
    
    destructive: '#7F1D1D',
    destructiveForeground: '#F8FAFC',
    
    border: '#1E293B',
    input: '#1E293B',
    ring: '#CBD5E1',
  },
};

// Spacing and sizing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Layout
export const layout = {
  screenWidth: width,
  screenHeight: height,
  isSmallDevice: width < 375,
  bottomTabHeight: 60,
  headerHeight: 60,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 6,
  },
};

// Z-index values
export const zIndex = {
  base: 0,
  card: 1,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70,
};

// Animation durations
export const animation = {
  fast: 200,
  normal: 300,
  slow: 500,
}; 