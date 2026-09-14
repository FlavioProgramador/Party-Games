import { Text, TextProps } from 'react-native';
import { theme } from '../theme';

interface TypographyProps extends TextProps {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'label' | 'caption' | 'timer';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  bold?: boolean;
}

export function Typography({ 
  variant = 'body', 
  color = theme.colors.text, 
  align = 'auto', 
  bold = false,
  style, 
  children, 
  ...props 
}: TypographyProps) {
  
  const getStyleParams = () => {
    switch (variant) {
      case 'display': return { size: theme.typography.sizes.xxxl, font: theme.typography.fontFamily.extraBold, tracking: -1.2 };
      case 'h1': return { size: theme.typography.sizes.xxl, font: theme.typography.fontFamily.bold, tracking: -0.5 };
      case 'h2': return { size: theme.typography.sizes.xl, font: theme.typography.fontFamily.bold, tracking: -0.3 };
      case 'h3': return { size: theme.typography.sizes.lg, font: theme.typography.fontFamily.semiBold, tracking: -0.1 };
      case 'body': return { size: theme.typography.sizes.lg, font: theme.typography.fontFamily.regular, tracking: 0 };
      case 'body-sm': return { size: theme.typography.sizes.md, font: theme.typography.fontFamily.regular, tracking: 0 };
      case 'label': return { size: theme.typography.sizes.sm, font: theme.typography.fontFamily.semiBold, tracking: 0.2 };
      case 'caption': return { size: theme.typography.sizes.xs, font: theme.typography.fontFamily.medium, tracking: 0.4 };
      case 'timer': return { size: theme.typography.sizes.timer, font: theme.typography.fontFamily.extraBold, tracking: -1.5 };
      default: return { size: theme.typography.sizes.lg, font: theme.typography.fontFamily.regular, tracking: 0 };
    }
  };

  const { size, font, tracking } = getStyleParams();
  const finalFontFamily = bold ? theme.typography.fontFamily.bold : font;

  return (
    <Text
      style={[
        {
          fontSize: size,
          color,
          textAlign: align,
          fontFamily: finalFontFamily,
          letterSpacing: tracking,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
