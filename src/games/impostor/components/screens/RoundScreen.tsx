import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  X,
  Clock,
  Pause,
  Play,
  Plus,
  MessageCircle,
  Vote,
  Flame,
  ShieldAlert,
} from 'lucide-react-native';
import { Typography } from '../../../../components/Typography';
import { CircularTimer } from '../../../../components/CircularTimer';
import { QuitGameModal } from '../shared/QuitGameModal';
import { theme } from '../../../../theme';
import { useImpostorStore } from '../../store/useImpostorStore';
import { selectRoundEndTime } from '../../store/selectors';
import { hapticsService } from '../../../../core/haptics/hapticsService';
import { audioService } from '../../../../core/audio/audioService';

export function RoundScreen() {
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();
  const initialEndTime = selectRoundEndTime(store);

  // Timer states
  const [effectiveEndTime, setEffectiveEndTime] = useState<number | null>(initialEndTime);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedFreeTime, setElapsedFreeTime] = useState(0);
  const [isQuitModalVisible, setIsQuitModalVisible] = useState(false);

  // Sync effectiveEndTime when store roundEndTime updates (e.g. returning from voting)
  useEffect(() => {
    setEffectiveEndTime(initialEndTime);
  }, [initialEndTime]);

  // Animation refs
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const urgentGlowAnim = useRef(new Animated.Value(0.3)).current;

  // Pulse animation for live badge & urgent timer
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  // Urgent glow animation when time <= 10s
  useEffect(() => {
    if (timeLeft !== null && timeLeft <= 10 && timeLeft > 0 && !isPaused) {
      const urgentGlow = Animated.loop(
        Animated.sequence([
          Animated.timing(urgentGlowAnim, {
            toValue: 0.8,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(urgentGlowAnim, {
            toValue: 0.2,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
      urgentGlow.start();
      return () => urgentGlow.stop();
    } else {
      urgentGlowAnim.setValue(0.3);
    }
  }, [timeLeft, isPaused, urgentGlowAnim]);

  // Main countdown / stopwatch timer effect
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let lastUrgentTick = 0;

    if (effectiveEndTime) {
      if (isPaused) return;

      const tick = () => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((effectiveEndTime - now) / 1000));
        setTimeLeft(remaining);

        if (remaining <= 10 && remaining > 0) {
          if (remaining !== lastUrgentTick) {
            lastUrgentTick = remaining;
            audioService.playSound('tick');
            hapticsService.triggerSelection();
          }
        }

        if (remaining === 0) {
          clearInterval(intervalId);
          hapticsService.triggerError();
          audioService.playSound('alarm');
        }
      };

      tick();
      intervalId = setInterval(tick, 100);
    } else {
      // Free time mode (no time limit) - count up
      if (isPaused) return;
      intervalId = setInterval(() => {
        setElapsedFreeTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [effectiveEndTime, isPaused]);

  // Timer controls
  const handleTogglePause = () => {
    hapticsService.triggerSelection();
    if (isPaused) {
      // Resume
      if (effectiveEndTime && timeLeft !== null) {
        setEffectiveEndTime(Date.now() + timeLeft * 1000);
      }
      setIsPaused(false);
    } else {
      // Pause
      setIsPaused(true);
    }
  };

  const handleAddThirtySeconds = () => {
    hapticsService.triggerImpact();
    audioService.playSound('click');
    if (effectiveEndTime) {
      const newEndTime = (effectiveEndTime || Date.now()) + 30000;
      setEffectiveEndTime(newEndTime);
      setTimeLeft(prev => (prev !== null ? prev + 30 : 30));
      store.setRoundEndTime(newEndTime);
    }
  };

  const handleExitPress = () => {
    hapticsService.triggerImpact();
    setIsQuitModalVisible(true);
  };

  const handleEndRound = () => {
    hapticsService.triggerImpact();
    audioService.playSound('click');
    store.endRound();
  };

  const durationSeconds = store.settings.timeLimit || 60;
  const isUrgent = effectiveEndTime !== null && timeLeft !== null && timeLeft <= 10 && timeLeft > 0;
  const isTimeUp = effectiveEndTime !== null && timeLeft === 0;

  // Format MM:SS for display
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) {
      return `${m}:${s.toString().padStart(2, '0')}`;
    }
    return s.toString();
  };

  const formatElapsed = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top + 8, 20),
          paddingBottom: Math.max(insets.bottom + 12, 24),
        },
      ]}
    >
      {/* ─── TOP HEADER BAR ─── */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.circularHeaderBtn}
          onPress={handleExitPress}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>

        <View style={styles.badgePill}>
          <Animated.View
            style={[
              styles.statusDot,
              {
                backgroundColor: isUrgent
                  ? theme.colors.danger
                  : isPaused
                  ? theme.colors.suspense
                  : theme.colors.success,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <Typography
            variant="label"
            bold
            color={theme.colors.text}
            style={styles.badgeText}
          >
            RODADA EM ANDAMENTO
          </Typography>
        </View>

        <View style={styles.headerRightInfo}>
          <Typography variant="caption" bold color={theme.colors.secondary}>
            {store.players.length} JOGADORES
          </Typography>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── TIMER SECTION WITH AMBIENT GLOW ─── */}
        <View style={styles.timerWrapper}>
          {/* Ambient Glow Aura */}
          <Animated.View
            style={[
              styles.ambientAura,
              {
                backgroundColor: isUrgent
                  ? theme.colors.danger
                  : isPaused
                  ? theme.colors.suspense
                  : theme.colors.secondary,
                opacity: isUrgent ? urgentGlowAnim : 0.12,
              },
            ]}
          />

          {effectiveEndTime ? (
            <CircularTimer
              durationSeconds={durationSeconds}
              remainingSeconds={timeLeft || 0}
              size={240}
              strokeWidth={12}
            >
              <View style={styles.timerInnerContent}>
                <Typography
                  variant="caption"
                  color={isUrgent ? theme.colors.danger : theme.colors.textSecondary}
                  bold
                  style={styles.timerSubLabel}
                >
                  {isPaused ? 'PAUSADO' : isUrgent ? 'ACABANDO!' : 'TEMPO RESTANTE'}
                </Typography>

                <Typography
                  variant="timer"
                  color={
                    isUrgent
                      ? theme.colors.danger
                      : isPaused
                      ? theme.colors.suspense
                      : theme.colors.text
                  }
                  style={{
                    fontVariant: ['tabular-nums'],
                    fontSize: 52,
                    lineHeight: 56,
                  }}
                  bold
                >
                  {formatTime(Math.max(0, timeLeft || 0))}
                </Typography>

                {isUrgent && (
                  <View style={styles.urgentBadge}>
                    <Flame size={13} color="#FFFFFF" style={{ marginRight: 3 }} />
                    <Typography variant="caption" bold color="#FFFFFF">
                      RÁPIDO!
                    </Typography>
                  </View>
                )}
              </View>
            </CircularTimer>
          ) : (
            <View style={styles.freeTimerContainer}>
              <Clock size={36} color={theme.colors.secondary} style={{ marginBottom: 8 }} />
              <Typography variant="timer" bold color={theme.colors.secondary} style={{ fontSize: 44 }}>
                {formatElapsed(elapsedFreeTime)}
              </Typography>
              <Typography variant="caption" color={theme.colors.textSecondary} bold style={{ marginTop: 4 }}>
                TEMPO LIVRE
              </Typography>
            </View>
          )}

          {/* Quick Timer Controls */}
          {effectiveEndTime && (
            <View style={styles.timerControlsRow}>
              <TouchableOpacity
                style={[styles.timerControlBtn, isPaused && styles.timerControlBtnActive]}
                onPress={handleTogglePause}
                activeOpacity={0.7}
              >
                {isPaused ? (
                  <>
                    <Play size={16} color={theme.colors.suspense} style={{ marginRight: 6 }} />
                    <Typography variant="body" bold color={theme.colors.suspense} style={{ fontSize: 13 }}>
                      Retomar
                    </Typography>
                  </>
                ) : (
                  <>
                    <Pause size={16} color={theme.colors.textSecondary} style={{ marginRight: 6 }} />
                    <Typography variant="body" bold color={theme.colors.textSecondary} style={{ fontSize: 13 }}>
                      Pausar
                    </Typography>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.timerControlBtn}
                onPress={handleAddThirtySeconds}
                activeOpacity={0.7}
              >
                <Plus size={16} color={theme.colors.secondary} style={{ marginRight: 4 }} />
                <Typography variant="body" bold color={theme.colors.secondary} style={{ fontSize: 13 }}>
                  +30 seg
                </Typography>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ─── INSTRUCTION CARDS ─── */}
        <View style={styles.instructionBanner}>
          <LinearGradient
            colors={['rgba(6, 182, 212, 0.14)', 'rgba(124, 58, 237, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.instructionGradient}
          >
            <View style={styles.instructionIconBadge}>
              <MessageCircle size={20} color={theme.colors.secondary} />
            </View>
            <View style={styles.instructionTextContainer}>
              <Typography variant="body" bold color={theme.colors.text} style={{ fontSize: 15 }}>
                Dê uma dica sobre a palavra
              </Typography>
              <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 4, lineHeight: 18 }}>
                Falem suas dicas na ordem que o grupo preferir. Cuidado para não entregar a palavra ao impostor!
              </Typography>
            </View>
          </LinearGradient>
        </View>

        {/* ─── HELPFUL STRATEGY TIP ─── */}
        <View style={styles.tipCard}>
          <ShieldAlert size={18} color="#F59E0B" style={{ marginRight: 10, marginTop: 1 }} />
          <Typography variant="caption" color={theme.colors.textSecondary} style={{ flex: 1, lineHeight: 18 }}>
            <Typography variant="caption" bold color="#FCD34D">Dica: </Typography>
            Civis devem dar pistas sutis para se reconhecerem. O impostor deve blefar e tentar passar despercebido.
          </Typography>
        </View>
      </ScrollView>

      {/* ─── BOTTOM ACTION BUTTON ─── */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={handleEndRound}
          activeOpacity={0.85}
          style={styles.actionButtonTouch}
        >
          <LinearGradient
            colors={
              isTimeUp
                ? [theme.colors.danger, '#BE123C']
                : [theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradient}
          >
            <Vote size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Typography variant="body" bold color="#FFFFFF" style={styles.actionBtnText}>
              {isTimeUp ? 'TEMPO ESGOTADO • IR PARA VOTAÇÃO' : 'IR PARA VOTAÇÃO'}
            </Typography>
          </LinearGradient>
        </TouchableOpacity>

        <Typography
          variant="caption"
          color={theme.colors.textMuted}
          style={styles.footerHint}
        >
          Quando todos terminarem de dar as dicas, avancem para a votação.
        </Typography>
      </View>

      <QuitGameModal
        visible={isQuitModalVisible}
        onClose={() => setIsQuitModalVisible(false)}
        onConfirmQuit={() => {
          setIsQuitModalVisible(false);
          hapticsService.triggerImpact();
          store.resetToMenu();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  circularHeaderBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainer,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    letterSpacing: 1.2,
    fontSize: 12,
  },
  headerRightInfo: {
    paddingHorizontal: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  timerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    position: 'relative',
  },
  ambientAura: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  timerInnerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerSubLabel: {
    letterSpacing: 1.5,
    fontSize: 11,
    marginBottom: 2,
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginTop: 6,
  },
  freeTimerContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 8,
    borderColor: theme.colors.surface,
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },
  timerControlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainer,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  timerControlBtnActive: {
    borderColor: theme.colors.suspense,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
  },
  instructionBanner: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    marginTop: 16,
    marginBottom: 12,
  },
  instructionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  instructionIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  instructionTextContainer: {
    flex: 1,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  footerContainer: {
    paddingTop: 8,
  },
  actionButtonTouch: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  actionGradient: {
    height: 56,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
  actionBtnText: {
    letterSpacing: 0.8,
    fontSize: 16,
  },
  footerHint: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
  },
});
