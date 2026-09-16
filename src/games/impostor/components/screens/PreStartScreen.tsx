import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users,
  Clock,
  MessageCircle,
  Eye,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  ChevronLeft,
} from 'lucide-react-native';
import { Typography } from '../../../../components/Typography';
import { useImpostorStore } from '../../store/useImpostorStore';
import { theme } from '../../../../theme';

export function PreStartScreen() {
  const insets = useSafeAreaInsets();
  const { players, playOrder, settings, startReveal, reshufflePlayOrder, resetToMenu } =
    useImpostorStore();

  const [isAnimating, setIsAnimating] = useState(true);
  const [displayedName, setDisplayedName] = useState('');

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // The first player in playOrder will be the one who starts
  const targetPlayerId = playOrder[0];
  const targetPlayer = players.find((p) => p.id === targetPlayerId);

  // Fade-in the card on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Pulse animation when animating
  useEffect(() => {
    if (!isAnimating) {
      pulseAnim.setValue(1);
      return;
    }
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [isAnimating]);

  // Lottery animation with deceleration
  useEffect(() => {
    if (!isAnimating) {
      if (targetPlayer) {
        setDisplayedName(targetPlayer.name.toUpperCase());
      }
      return;
    }

    if (players.length === 0) return;

    let iterations = 0;
    const getDelay = (i: number) => {
      if (i < 15) return 80;
      if (i < 22) return 130;
      return 200;
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      setDisplayedName(randomPlayer.name.toUpperCase());
      iterations++;

      if (iterations >= 28) {
        setIsAnimating(false);
      } else {
        timeoutId = setTimeout(tick, getDelay(iterations));
      }
    };

    timeoutId = setTimeout(tick, 80);
    return () => clearTimeout(timeoutId);
  }, [isAnimating, players, targetPlayer]);

  const handleReshuffle = () => {
    if (isAnimating) return;
    reshufflePlayOrder();
    setIsAnimating(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 12, 32),
            paddingBottom: 20,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── HEADER ─── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={resetToMenu} activeOpacity={0.7}>
            <ChevronLeft color={theme.colors.textSecondary} size={20} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.badgePrimary}>
              <View style={styles.dot} />
              <Text style={styles.badgeText}>IMPOSTOR</Text>
            </View>
            <Typography
              variant="caption"
              color={theme.colors.textSecondary}
              style={{ marginTop: 4 }}
            >
              Partida pronta!
            </Typography>
          </View>

          <View style={styles.headerRight}>
            <Users color={theme.colors.secondary} size={14} />
            <Typography
              variant="caption"
              bold
              style={{ color: theme.colors.text, marginLeft: 5 }}
            >
              {players.length}
            </Typography>
          </View>
        </View>

        {/* ─── TITLE ─── */}
        <View style={styles.titleSection}>
          <Typography variant="h2" bold style={{ color: theme.colors.primary }}>
            QUEM COMEÇA?
          </Typography>
          <Typography
            variant="body-sm"
            color={theme.colors.textSecondary}
            style={{ marginTop: 6 }}
          >
            Sorteando o jogador inicial da rodada...
          </Typography>
        </View>

        {/* ─── SORT CARD ─── */}
        <Animated.View style={[styles.sortCardWrapper, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#1C2338', '#111827']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.sortCard}
          >
            {/* Purple top highlight line */}
            <View style={styles.cardTopAccent} />

            {/* Dice icon container */}
            <Animated.View
              style={[
                styles.diceContainer,
                isAnimating && { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Text style={styles.diceEmoji}>🎲</Text>
            </Animated.View>

            {/* Status badge */}
            <View
              style={[
                styles.sortBadge,
                !isAnimating && {
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                  borderColor: 'rgba(6, 182, 212, 0.25)',
                },
              ]}
            >
              <Typography
                variant="caption"
                bold
                style={{
                  color: isAnimating ? theme.colors.textSecondary : theme.colors.secondary,
                  letterSpacing: 1.5,
                  fontSize: 10,
                }}
              >
                {isAnimating ? 'SORTEANDO...' : 'SORTEADO!'}
              </Typography>
            </View>

            {/* Player name */}
            <Animated.Text
              style={[
                styles.playerName,
                isAnimating && { transform: [{ scale: pulseAnim }] },
                !isAnimating && { color: '#FFFFFF' },
              ]}
            >
              {displayedName || '...'}
            </Animated.Text>

            {/* Sub-message */}
            <Typography
              variant="body-sm"
              color={isAnimating ? theme.colors.textMuted : theme.colors.textSecondary}
              style={{ marginBottom: 20 }}
            >
              {isAnimating ? 'Aguarde a seleção...' : 'Você começa!'}
            </Typography>

            {/* Reshuffle button */}
            <TouchableOpacity
              style={[styles.reshuffleBtn, isAnimating && styles.reshuffleBtnDisabled]}
              onPress={handleReshuffle}
              disabled={isAnimating}
              activeOpacity={0.7}
            >
              <Typography
                variant="caption"
                style={{
                  color: isAnimating ? theme.colors.textMuted : theme.colors.textSecondary,
                  fontSize: 12,
                }}
              >
                Sortear novamente
              </Typography>
              <RefreshCw
                color={isAnimating ? theme.colors.textMuted : theme.colors.textSecondary}
                size={12}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* ─── INFO BADGES ─── */}
        <View style={styles.infoRow}>
          <View style={styles.infoBadge}>
            <Clock color={theme.colors.secondary} size={13} />
            <Text style={styles.infoBadgeText}>
              {'TEMPO DE JOGO: '}
              <Text style={styles.infoBadgeHighlight}>{formatTime(settings.timeLimit)}</Text>
            </Text>
          </View>

          <View style={styles.infoBadge}>
            <Users color={theme.colors.primary} size={13} />
            <Text style={styles.infoBadgeText}>
              <Text style={styles.infoBadgeHighlight}>{players.length}</Text>
              {' JOGADORES'}
            </Text>
          </View>
        </View>

        {/* ─── HOW IT WORKS ─── */}
        <View style={styles.howItWorksHeader}>
          <Typography
            variant="label"
            bold
            style={{ color: theme.colors.text, letterSpacing: 1.2, fontSize: 12 }}
          >
            COMO FUNCIONA
          </Typography>
          <Typography variant="caption" color={theme.colors.textSecondary}>
            Regras rápidas
          </Typography>
        </View>

        <View style={styles.stepsContainer}>
          {/* Step 01 */}
          <View style={styles.stepCard}>
            <View style={[styles.stepIconContainer, styles.stepIconPurple]}>
              <MessageCircle color={theme.colors.primary} size={16} />
            </View>
            <View style={styles.stepText}>
              <View style={styles.stepTitleRow}>
                <Text style={[styles.stepNumber, { color: theme.colors.primary }]}>01</Text>
                <Text style={styles.stepTitle}>ASSOCIE</Text>
              </View>
              <Typography
                variant="caption"
                color={theme.colors.textSecondary}
                style={{ marginTop: 2, lineHeight: 16 }}
              >
                Dê uma palavra ou pista relacionada ao segredo.
              </Typography>
            </View>
          </View>

          {/* Step 02 */}
          <View style={styles.stepCard}>
            <View style={[styles.stepIconContainer, styles.stepIconCyan]}>
              <Eye color={theme.colors.secondary} size={16} />
            </View>
            <View style={styles.stepText}>
              <View style={styles.stepTitleRow}>
                <Text style={[styles.stepNumber, { color: theme.colors.secondary }]}>02</Text>
                <Text style={styles.stepTitle}>DISCUTA</Text>
              </View>
              <Typography
                variant="caption"
                color={theme.colors.textSecondary}
                style={{ marginTop: 2, lineHeight: 16 }}
              >
                Ouça as pistas com atenção e ache o impostor.
              </Typography>
            </View>
          </View>

          {/* Step 03 */}
          <View style={styles.stepCard}>
            <View style={[styles.stepIconContainer, styles.stepIconGreen]}>
              <CheckCircle2 color={theme.colors.success} size={16} />
            </View>
            <View style={styles.stepText}>
              <View style={styles.stepTitleRow}>
                <Text style={[styles.stepNumber, { color: theme.colors.success }]}>03</Text>
                <Text style={styles.stepTitle}>VOTE</Text>
              </View>
              <Typography
                variant="caption"
                color={theme.colors.textSecondary}
                style={{ marginTop: 2, lineHeight: 16 }}
              >
                Apontem quem está fingindo e eliminem o suspeito.
              </Typography>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ─── FOOTER BUTTON ─── */}
      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom + 16, 28) }]}
      >
        <TouchableOpacity
          style={styles.mainButtonWrapper}
          onPress={startReveal}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#7C3AED', '#06B6D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.mainButton}
          >
            <Text style={styles.mainButtonText}>COMEÇAR PARTIDA</Text>
            <ArrowRight color="#FFFFFF" size={20} style={{ marginLeft: 10 }} />
          </LinearGradient>
        </TouchableOpacity>

        <Typography
          variant="caption"
          color={theme.colors.textMuted}
          style={{ textAlign: 'center', marginTop: 10, fontSize: 11 }}
        >
          ○ O jogador inicial começa falando no sentido horário.
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B12',
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  // ─── HEADER ───
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#121824',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A3650',
  },
  headerCenter: {
    alignItems: 'center',
  },
  badgePrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.35)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: 6,
  },
  badgeText: {
    color: theme.colors.primary,
    fontSize: 11,
    fontFamily: theme.typography.fontFamily.bold,
    letterSpacing: 1.2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121824',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2A3650',
  },

  // ─── TITLE ───
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },

  // ─── SORT CARD ───
  sortCardWrapper: {
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },
  sortCard: {
    borderRadius: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.25)',
    overflow: 'hidden',
  },
  cardTopAccent: {
    width: '140%',
    height: 2,
    backgroundColor: 'rgba(124, 58, 237, 0.6)',
    marginBottom: 24,
  },
  diceContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(124, 58, 237, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.4)',
  },
  diceEmoji: {
    fontSize: 26,
  },
  sortBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 12,
  },
  playerName: {
    fontSize: 36,
    fontFamily: theme.typography.fontFamily.extraBold,
    color: '#D8B4FE',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  reshuffleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reshuffleBtnDisabled: {
    opacity: 0.4,
  },

  // ─── INFO BADGES ───
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 10,
    flexWrap: 'wrap',
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121824',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2A3650',
    gap: 6,
  },
  infoBadgeText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.bold,
    letterSpacing: 0.5,
  },
  infoBadgeHighlight: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.bold,
  },

  // ─── HOW IT WORKS ───
  howItWorksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepsContainer: {
    gap: 8,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#0F1520',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E2A40',
    alignItems: 'center',
  },
  stepIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  stepIconPurple: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  stepIconCyan: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.2)',
  },
  stepIconGreen: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  stepText: {
    flex: 1,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepNumber: {
    fontSize: 10,
    fontFamily: theme.typography.fontFamily.bold,
    letterSpacing: 0.5,
  },
  stepTitle: {
    fontSize: 13,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
    letterSpacing: 0.8,
  },

  // ─── FOOTER ───
  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: '#080B12',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  mainButtonWrapper: {
    width: '100%',
    borderRadius: 32,
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  mainButton: {
    flexDirection: 'row',
    height: 58,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    fontSize: 15,
    fontFamily: theme.typography.fontFamily.extraBold,
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
});
