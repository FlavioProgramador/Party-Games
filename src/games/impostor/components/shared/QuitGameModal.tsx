import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { AlertTriangle, X } from 'lucide-react-native';
import { Typography } from '@/components/Typography';
import { theme } from '@/theme';

interface QuitGameModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmQuit: () => void;
  title?: string;
  message?: string;
}

export function QuitGameModal({
  visible,
  onClose,
  onConfirmQuit,
  title = 'Interromper o jogo?',
  message = 'Tem certeza que deseja interromper o jogo? O progresso da partida atual será perdido.',
}: QuitGameModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={e => e.stopPropagation()}>
          {/* Top Close Button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <X size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          {/* Warning Icon Badge */}
          <View style={styles.iconBadge}>
            <AlertTriangle size={32} color={theme.colors.danger} />
          </View>

          {/* Title & Message */}
          <Typography variant="h2" bold style={styles.title}>
            {title}
          </Typography>

          <Typography
            variant="body"
            color={theme.colors.textSecondary}
            style={styles.message}
          >
            {message}
          </Typography>

          {/* Action Buttons */}
          <View style={styles.buttonStack}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Typography variant="body" bold color={theme.colors.text}>
                CONTINUAR JOGANDO
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quitButton}
              onPress={onConfirmQuit}
              activeOpacity={0.8}
            >
              <Typography variant="body" bold color={theme.colors.danger}>
                INTERROMPER JOGO
              </Typography>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 22,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(244, 63, 94, 0.14)',
    borderWidth: 1.5,
    borderColor: 'rgba(244, 63, 94, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  buttonStack: {
    width: '100%',
    gap: 10,
  },
  cancelButton: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quitButton: {
    width: '100%',
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
