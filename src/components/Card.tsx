import { View, ViewProps, StyleSheet, Platform } from 'react-native';
import { theme } from '../theme';

interface CardProps extends ViewProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'highlight' | 'danger' | 'modal';
}

export function Card({ 
  padding = 'lg', 
  variant = 'default',
  style, 
  children, 
  ...props 
}: CardProps) {
  
  const getPadding = () => {
    switch(padding) {
      case 'none': return 0;
      case 'sm': return theme.spacing.sm;
      case 'md': return theme.spacing.md;
      case 'lg': return theme.spacing.lg;
      case 'xl': return theme.spacing.xl;
    }
  };

  const isModal = variant === 'modal';
  
  const getBorderColor = () => {
    if (isModal) return 'rgba(255,255,255,0.12)';
    switch(variant) {
      case 'highlight': return theme.colors.primary;
      case 'danger': return theme.colors.danger;
      default: return theme.colors.border;
    }
  };

  const getBackgroundColor = () => {
    if (isModal) return theme.colors.surfaceModal;
    return theme.colors.surface;
  };

  const getShadowStyle = () => {
    if (variant === 'danger') {
      return {
        shadowColor: theme.colors.danger,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 24,
        elevation: 8,
      };
    }
    if (variant === 'highlight') {
      return {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.45,
        shadowRadius: 20,
        elevation: 8,
      };
    }
    if (isModal) {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.65,
        shadowRadius: 40,
        elevation: 16,
      };
    }
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.45,
      shadowRadius: 24,
      elevation: 5,
    };
  };

  return (
    <View 
      style={[
        styles.card,
        getShadowStyle(),
        { 
          padding: getPadding(),
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: 1,
          borderTopWidth: isModal ? 1.5 : 1, // Simulate specular highlight
        }, 
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.xl,
    width: '100%',
  }
});
