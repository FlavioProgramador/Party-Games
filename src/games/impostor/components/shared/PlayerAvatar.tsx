import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Typography } from '@/components/Typography';
import { theme } from '@/theme';

interface PlayerAvatarProps {
  name: string;
  id?: string;
  size?: number;
  isSelected?: boolean;
  selectedBorderColor?: string;
  style?: ViewStyle;
}

const AVATAR_PALETTE = [
  { bg: 'rgba(124, 58, 237, 0.2)', border: '#7C3AED', text: '#C4B5FD' }, // Purple
  { bg: 'rgba(6, 182, 212, 0.2)', border: '#06B6D4', text: '#67E8F9' },  // Cyan
  { bg: 'rgba(16, 185, 129, 0.2)', border: '#10B981', text: '#6EE7B7' }, // Emerald
  { bg: 'rgba(245, 158, 11, 0.2)', border: '#F59E0B', text: '#FCD34D' }, // Amber
  { bg: 'rgba(236, 72, 153, 0.2)', border: '#EC4899', text: '#F472B6' }, // Pink
  { bg: 'rgba(99, 102, 241, 0.2)', border: '#6366F1', text: '#A5B4FC' }, // Indigo
  { bg: 'rgba(239, 68, 68, 0.2)', border: '#EF4444', text: '#FCA5A5' },  // Red
  { bg: 'rgba(20, 184, 166, 0.2)', border: '#14B8A6', text: '#5EEAD4' }, // Teal
];

function getHashColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

export function PlayerAvatar({
  name,
  id,
  size = 44,
  isSelected = false,
  selectedBorderColor = '#F43F5E',
  style,
}: PlayerAvatarProps) {
  const identifier = id || name || 'Player';
  const colorScheme = getHashColor(identifier);
  const initial = (name.trim().charAt(0) || '?').toUpperCase();
  const fontSize = Math.round(size * 0.42);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colorScheme.bg,
          borderColor: isSelected ? selectedBorderColor : colorScheme.border,
          borderWidth: isSelected ? 2.5 : 2,
        },
        isSelected && {
          shadowColor: selectedBorderColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 6,
        },
        style,
      ]}
    >
      <Typography
        bold
        style={{
          fontSize,
          color: isSelected ? '#FFFFFF' : colorScheme.text,
        }}
      >
        {initial}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
