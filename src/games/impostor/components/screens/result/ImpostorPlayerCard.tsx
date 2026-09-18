import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { ShieldAlert, User } from 'lucide-react-native';
import { Typography } from '../../../../../components/Typography';
import { theme } from '../../../../../theme';
import { Player } from '../../../types';

interface ImpostorPlayerCardProps {
  player: Player;
  index: number;
  revealed: boolean;
}

export function ImpostorPlayerCard({ player, index, revealed }: ImpostorPlayerCardProps) {
  const animProgress = useSharedValue(0);

  useEffect(() => {
    if (revealed) {
      // Staggered reveal para múltiplos impostores
      animProgress.value = withDelay(
        index * 160,
        withSpring(1, {
          damping: 12,
          stiffness: 100,
          mass: 0.8,
        })
      );
    } else {
      animProgress.value = 0;
    }
  }, [revealed, index, animProgress]);

  const cardAnimStyle = useAnimatedStyle(() => {
    const scale = interpolate(animProgress.value, [0, 1], [0.85, 1]);
    const translateY = interpolate(animProgress.value, [0, 1], [25, 0]);
    const opacity = animProgress.value;

    return {
      opacity,
      transform: [{ translateY }, { scale }] as any,
    };
  });

  return (
    <Animated.View style={[styles.card, cardAnimStyle]}>
      {/* Avatar do Impostor com anel de destaque */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarGlow} />
        <View style={styles.avatarRing}>
          <User size={26} color={theme.colors.danger} />
        </View>
        <View style={styles.iconBadge}>
          <ShieldAlert size={14} color="#FFF" />
        </View>
      </View>

      {/* Informações do Jogador */}
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Typography variant="h3" bold style={styles.playerName} numberOfLines={1}>
            {player.name}
          </Typography>
        </View>

        <View style={styles.badgeRow}>
          <View style={styles.impostorBadge}>
            <Typography variant="caption" bold color={theme.colors.danger} style={styles.badgeText}>
              IMPOSTOR
            </Typography>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 45, 68, 0.75)',
    borderColor: 'rgba(244, 63, 94, 0.4)',
    borderWidth: 1.5,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    width: '100%',
    shadowColor: theme.colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarGlow: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(244, 63, 94, 0.25)',
  },
  avatarRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.danger,
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.background,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerName: {
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  impostorBadge: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.35)',
  },
  badgeText: {
    letterSpacing: 1.2,
    fontSize: 10,
  },
});
