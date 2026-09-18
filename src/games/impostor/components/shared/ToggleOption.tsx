import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { Typography } from '@/components/Typography';
import { theme } from '@/theme';

interface ToggleOptionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  accentColor?: string;
  disabled?: boolean;
}

export function ToggleOption({
  title,
  description,
  icon,
  value,
  onValueChange,
  accentColor = '#7C3AED',
  disabled = false,
}: ToggleOptionProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: value ? accentColor : 'rgba(255, 255, 255, 0.08)',
          backgroundColor: value ? 'rgba(124, 58, 237, 0.08)' : '#121827',
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={() => !disabled && onValueChange(!value)}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.row}>
        {icon && (
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: value ? `${accentColor}25` : '#1B2337',
                borderColor: value ? accentColor : '#2A3650',
              },
            ]}
          >
            {icon}
          </View>
        )}

        <View style={styles.textContainer}>
          <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 16 }}>
            {title}
          </Typography>
          {description ? (
            <Typography
              variant="caption"
              color={theme.colors.textSecondary}
              style={{ marginTop: 4, lineHeight: 18 }}
            >
              {description}
            </Typography>
          ) : null}
        </View>

        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: '#263044',
            true: accentColor,
          }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#263044"
          disabled={disabled}
          style={Platform.OS === 'web' ? { cursor: 'pointer' } as any : undefined}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
});
