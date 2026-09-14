import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { X, User } from 'lucide-react-native';
import { Typography } from './Typography';
import { theme } from '../theme';

interface PlayerCardProps {
  name: string;
  isHost?: boolean;
  onRemove?: () => void;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  showAvatar?: boolean;
}

export function PlayerCard({ 
  name, 
  isHost = false, 
  onRemove, 
  actionIcon,
  onAction,
  showAvatar = true 
}: PlayerCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  const avatarBorderColor = isHost ? theme.colors.suspense : theme.colors.secondary;

  return (
    <View style={styles.container}>
      {showAvatar && (
        <View style={[styles.avatar, { borderColor: avatarBorderColor }]}>
          <User size={20} color={avatarBorderColor} />
        </View>
      )}
      
      <View style={styles.content}>
        <Typography variant="body" bold>{name}</Typography>
        {isHost && (
          <Typography variant="caption" color={theme.colors.suspense} style={{ marginTop: 2 }}>
            HOST
          </Typography>
        )}
      </View>

      {onAction ? (
        <TouchableOpacity 
          style={styles.actionZone} 
          onPress={onAction}
        >
          {actionIcon}
        </TouchableOpacity>
      ) : onRemove ? (
        <Pressable
          style={styles.actionZone}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={onRemove}
        >
          <X 
            size={20} 
            color={isPressed ? theme.colors.danger : theme.colors.textMuted} 
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.surfaceContainer,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  actionZone: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
});
