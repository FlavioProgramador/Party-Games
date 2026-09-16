import { Lock, ShieldAlert, ShieldQuestion, Users } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../../components/Button';
import { Typography } from '../../../../components/Typography';
import { theme } from '../../../../theme';
import { selectCurrentPlayerReveal, selectIsImpostor } from '../../store/selectors';
import { useImpostorStore } from '../../store/useImpostorStore';

export function RevealScreen() {
  const store = useImpostorStore();
  const currentPlayer = selectCurrentPlayerReveal(store);
  const isImpostor = currentPlayer ? selectIsImpostor(currentPlayer.id)(store) : false;
  const insets = useSafeAreaInsets();

  const [isRevealed, setIsRevealed] = useState(false);
  const flipRotation = useSharedValue(0);

  const currentPlayerIndex = store.players.findIndex(p => p?.id === currentPlayer?.id);
  const playerNumber = currentPlayerIndex !== -1 ? currentPlayerIndex + 1 : 1;
  const totalPlayers = store.players.length;

  useEffect(() => {
    setIsRevealed(false);
    flipRotation.value = 0;
  }, [store.revealedCount]);

  const handleToggleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      flipRotation.value = withTiming(180, { duration: 400 });
    } else {
      setIsRevealed(false);
      flipRotation.value = withTiming(0, { duration: 400 });
    }
  };

  const handleHideAndPass = () => {
    setIsRevealed(false);
    flipRotation.value = 0;
    store.nextReveal();
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [0, 180], Extrapolation.CLAMP);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
      zIndex: flipRotation.value < 90 ? 2 : 1,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [180, 360], Extrapolation.CLAMP);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: flipRotation.value >= 90 ? 2 : 1,
    };
  });

  if (!currentPlayer) return <View style={styles.container} />;

  const glowColor = isImpostor ? theme.colors.danger : theme.colors.secondary;

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top + 20, 40), paddingBottom: Math.max(insets.bottom + 20, 40) }]}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Users size={16} color={theme.colors.secondary} style={{ marginRight: 6 }} />
          <Typography variant="label" color={theme.colors.secondary} bold>Passe a vez</Typography>
        </View>
        <View style={styles.headerItemDark}>
          <Typography variant="label" color={theme.colors.textSecondary}>Jogador {playerNumber} de {totalPlayers}</Typography>
        </View>
      </View>

      <View style={styles.turnIndicator}>
        <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: 4 }}>
          DISPOSITIVO COM
        </Typography>
        <Typography variant="display" bold>
          {currentPlayer.name}
        </Typography>
      </View>

      {/* PRIVACY WARNING */}
      <View style={styles.privacyBanner}>
        <Lock size={14} color={theme.colors.danger} style={{ marginRight: 8 }} />
        <Typography variant="caption" color={theme.colors.textSecondary}>
          Mantenha a tela longe de olhares curiosos
        </Typography>
      </View>

      {/* MAIN CARD AREA */}
      <View style={styles.cardWrapper}>
        <Pressable style={styles.cardPressable} onPress={handleToggleReveal} disabled={isRevealed}>

          {/* FRONT (HIDDEN) */}
          <Animated.View style={[styles.cardSide, frontAnimatedStyle]}>
            <View style={[styles.cardInner, { borderColor: 'rgba(255,255,255,0.05)' }]}>
              <View style={styles.hiddenCardBadge}>
                <Lock size={12} color={theme.colors.textSecondary} style={{ marginRight: 4 }} />
                <Typography variant="caption" color={theme.colors.textSecondary} bold>ULTRA SECRETO</Typography>
              </View>

              <View style={styles.iconCircle}>
                <ShieldQuestion size={48} color={theme.colors.primary} />
              </View>

              <Typography variant="h2" bold style={{ marginTop: theme.spacing.xl, marginBottom: 8 }}>
                Identidade Encoberta
              </Typography>
              <Typography variant="caption" color={theme.colors.textSecondary} style={{ textAlign: 'center' }}>
                Toque em qualquer lugar da{'\n'}carta para revelar
              </Typography>
            </View>
          </Animated.View>

          {/* BACK (REVEALED) */}
          <Animated.View style={[styles.cardSide, backAnimatedStyle]}>
            <View style={[styles.cardInner, { borderColor: glowColor, backgroundColor: 'rgba(20,25,35,0.95)' }]}>
              {isImpostor ? (
                <>
                  <View style={[styles.iconCircle, { backgroundColor: 'rgba(244, 63, 94, 0.1)' }]}>
                    <ShieldAlert size={48} color={theme.colors.danger} />
                  </View>
                  <Typography variant="h2" bold color={theme.colors.danger} style={{ marginTop: theme.spacing.xl, marginBottom: 8, textAlign: 'center' }}>
                    VOCÊ É O IMPOSTOR
                  </Typography>
                  <Typography variant="label" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: 4 }}>
                    SUA DICA
                  </Typography>
                  <Typography variant="h3" bold style={{ textAlign: 'center', fontStyle: 'italic' }}>
                    "{store.word?.impostorHint}"
                  </Typography>
                </>
              ) : (
                <>
                  <View style={[styles.iconCircle, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
                    <ShieldQuestion size={48} color={theme.colors.secondary} />
                  </View>
                  <Typography variant="h2" bold color={theme.colors.secondary} style={{ marginTop: theme.spacing.xl, marginBottom: 8, textAlign: 'center' }}>
                    VOCÊ É CIDADÃO
                  </Typography>
                  <Typography variant="label" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: 4 }}>
                    SUA PALAVRA É
                  </Typography>
                  <Typography variant="display" bold style={{ textAlign: 'center' }}>
                    {store.word?.value.toUpperCase()}
                  </Typography>
                </>
              )}
            </View>
          </Animated.View>

        </Pressable>
      </View>

      {/* FOOTER ACTION */}
      <View style={styles.footer}>
        {isRevealed ? (
          <View style={{ width: '100%' }}>
            <Button
              title="Ocultar e Passar →"
              variant="primary"
              onPress={handleHideAndPass}
            />
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginTop: 12 }}>
              Ao passar, sua identidade será ocultada imediatamente.
            </Typography>
          </View>
        ) : (
          <View style={{ height: 60 }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.margin,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerItemDark: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  turnIndicator: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 63, 94, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.1)',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPressable: {
    width: '100%',
    height: '80%',
    maxHeight: 450,
  },
  cardSide: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardInner: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 10,
  },
  hiddenCardBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    minHeight: 80,
    justifyContent: 'center',
  }
});
