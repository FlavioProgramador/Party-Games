import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { Typography } from '@/components/Typography';
import { theme } from '@/theme';

interface SelectionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  disabledReason?: string;
  accentColor?: string;
  indicatorType?: 'radio' | 'checkbox';
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function SelectionCard({
  title,
  description,
  icon,
  selected,
  onPress,
  disabled = false,
  disabledReason,
  accentColor = '#7C3AED',
  indicatorType = 'radio',
  children,
  style,
}: SelectionCardProps) {
  const activeBorderColor = selected ? accentColor : 'rgba(255, 255, 255, 0.08)';
  const activeBgColor = selected ? 'rgba(124, 58, 237, 0.08)' : '#121827';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: activeBorderColor,
          backgroundColor: activeBgColor,
          opacity: disabled ? 0.45 : 1,
        },
        selected && {
          shadowColor: accentColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 4,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
    >
      <View style={styles.headerRow}>
        <View style={styles.leftCol}>
          {icon && (
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: selected ? `${accentColor}25` : '#1B2337',
                  borderColor: selected ? accentColor : '#2A3650',
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
        </View>

        {/* Selection Indicator */}
        <View
          style={[
            styles.indicator,
            indicatorType === 'radio' ? styles.radio : styles.checkbox,
            {
              borderColor: selected ? accentColor : '#334155',
              backgroundColor: selected ? accentColor : 'transparent',
            },
          ]}
        >
          {selected && (
            indicatorType === 'radio' ? (
              <View style={styles.radioInner} />
            ) : (
              <Check size={14} color="#FFFFFF" strokeWidth={3} />
            )
          )}
        </View>
      </View>

      {disabled && disabledReason ? (
        <View style={styles.disabledReasonContainer}>
          <Typography variant="caption" color={theme.colors.suspense}>
            ⚠️ {disabledReason}
          </Typography>
        </View>
      ) : null}

      {children && <View style={styles.childrenContainer}>{children}</View>}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 12,
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
  },
  indicator: {
    width: 22,
    height: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radio: {
    borderRadius: 11,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  checkbox: {
    borderRadius: 6,
  },
  disabledReasonContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  childrenContainer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
});
