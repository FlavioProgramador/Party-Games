import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { theme } from '@/theme';

interface SettingsScreenLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  showCloseButton?: boolean;
  onClose?: () => void;
  confirmButtonText?: string;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  confirmVariant?: 'primary' | 'secondary' | 'danger';
  contentStyle?: ViewStyle;
}

export function SettingsScreenLayout({
  title,
  subtitle,
  children,
  onBack,
  showCloseButton = false,
  onClose,
  confirmButtonText = 'CONFIRMAR',
  onConfirm,
  confirmDisabled = false,
  confirmVariant = 'primary',
  contentStyle,
}: SettingsScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.replace('/impostor/setup');
    }
  };

  return (
    <View style={styles.container}>
      {/* ─── HEADER ─── */}
      <View
        style={[
          styles.header,
          {
            paddingTop: Math.max(insets.top + 8, 20),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ChevronLeft color={theme.colors.text} size={24} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Typography variant="body" bold style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
              {subtitle}
            </Typography>
          ) : null}
        </View>

        {showCloseButton ? (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleClose}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <X color={theme.colors.textSecondary} size={22} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerButtonPlaceholder} />
        )}
      </View>

      {/* ─── SCROLLABLE CONTENT ─── */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: onConfirm ? Math.max(insets.bottom + 90, 110) : Math.max(insets.bottom + 24, 40),
          },
          contentStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {/* ─── FIXED FOOTER ─── */}
      {onConfirm && (
        <View
          style={[
            styles.footer,
            {
              paddingBottom: Math.max(insets.bottom + 12, 20),
            },
          ]}
        >
          <Button
            title={confirmButtonText}
            onPress={onConfirm}
            disabled={confirmDisabled}
            variant={confirmVariant}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#151D2F',
    backgroundColor: '#0A0E1A',
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#141C2E',
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#080C16',
    borderTopWidth: 1,
    borderTopColor: '#161F30',
  },
});
