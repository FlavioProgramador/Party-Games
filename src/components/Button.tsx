import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from './Typography';
import { theme } from '../theme';
import { hapticsService } from '../core/haptics/hapticsService';
import { audioService } from '../core/audio/audioService';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({ 
  title, 
  variant = 'primary', 
  size = 'lg', 
  fullWidth = true, 
  style,
  onPress,
  ...props 
}: ButtonProps) {
  
  const handlePress = (e: any) => {
    hapticsService.triggerSelection();
    audioService.playSound('click');
    if (onPress) onPress(e);
  };

  const getTextColor = () => {
    if (props.disabled) return theme.colors.textMuted;
    if (variant === 'outline' || variant === 'ghost') return theme.colors.textSecondary;
    return theme.colors.text;
  };

  const isPrimary = variant === 'primary' && !props.disabled;
  const isDanger = variant === 'danger' && !props.disabled;
  const isSecondary = variant === 'secondary' || variant === 'outline';

  const baseContainerStyle: ViewStyle = {
    height: size === 'lg' ? 56 : 48,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    paddingHorizontal: theme.spacing.lg,
    opacity: props.disabled ? 0.5 : 1,
  };

  let content;

  if (isPrimary) {
    content = (
      <LinearGradient
        colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[baseContainerStyle, { borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.25)' }]}
      >
        <Typography variant="body" bold color={getTextColor()} style={{ fontSize: 16, letterSpacing: 0.5 }}>
          {title.toUpperCase()}
        </Typography>
      </LinearGradient>
    );
  } else if (isDanger) {
    content = (
      <View style={[baseContainerStyle, { backgroundColor: theme.colors.danger }]}>
        <Typography variant="body" bold color={getTextColor()} style={{ fontSize: 16, letterSpacing: 0.5 }}>
          {title.toUpperCase()}
        </Typography>
      </View>
    );
  } else if (isSecondary || props.disabled) {
    content = (
      <View style={[baseContainerStyle, { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border }]}>
        <Typography variant="body" bold color={getTextColor()} style={{ fontSize: 16, letterSpacing: 0.5 }}>
          {title.toUpperCase()}
        </Typography>
      </View>
    );
  } else {
    content = (
      <View style={[baseContainerStyle, { backgroundColor: 'transparent' }]}>
        <Typography variant="body" bold color={getTextColor()} style={{ fontSize: 16, letterSpacing: 0.5 }}>
          {title.toUpperCase()}
        </Typography>
      </View>
    );
  }

  return (
    <TouchableOpacity 
      style={style} 
      onPress={handlePress}
      activeOpacity={0.8}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
}
