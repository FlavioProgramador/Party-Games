import { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { theme } from '../../../../../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Paleta de confetes festivos para a vitória dos civis
const CONFETTI_COLORS = [
  theme.colors.success,
  theme.colors.secondary,
  theme.colors.primaryGradientStart,
  theme.colors.primaryGradientEnd,
  theme.colors.suspense,
  '#F472B6', // Rosa vibrante
  '#38BDF8', // Sky
];

// Partícula individual de confete
interface ConfettiPieceProps {
  index: number;
  total: number;
}

function ConfettiPiece({ index, total }: ConfettiPieceProps) {
  const progress = useSharedValue(0);
  const sway = useSharedValue(0);

  // Propriedades pseudo-aleatórias baseadas no índice
  const startX = (index / total) * SCREEN_WIDTH + (Math.sin(index * 99) * 30);
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const size = 6 + (index % 5) * 2;
  const isCircle = index % 3 === 0;
  const isRibbon = index % 4 === 1;
  const duration = 2800 + (index % 6) * 400;
  const delay = (index % 10) * 180;

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration, easing: Easing.linear }),
        -1,
        false
      )
    );

    sway.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 + (index % 3) * 200, easing: Easing.inOut(Easing.quad) }),
          withTiming(-1, { duration: 600 + (index % 3) * 200, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      )
    );
  }, [delay, duration, index, progress, sway]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [-20, SCREEN_HEIGHT + 30]);
    const translateX = sway.value * (15 + (index % 4) * 8);
    const rotateZ = `${progress.value * (360 + (index % 4) * 180)}deg`;
    const rotateX = `${sway.value * 180}deg`;
    const opacity = interpolate(
      progress.value,
      [0, 0.05, 0.85, 1],
      [0, 1, 0.9, 0]
    );

    return {
      transform: [
        { translateX: startX + translateX },
        { translateY },
        { rotateZ },
        { rotateX },
      ] as any,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          backgroundColor: color,
          width: isRibbon ? size * 0.6 : size,
          height: isRibbon ? size * 2 : size,
          borderRadius: isCircle ? size / 2 : 2,
        },
        animatedStyle,
      ]}
    />
  );
}

// Partícula de brasa/faísca para a vitória do impostor
function ImpostorEmber({ index, total }: { index: number; total: number }) {
  const progress = useSharedValue(0);

  const startX = (index / total) * SCREEN_WIDTH + (Math.sin(index * 77) * 25);
  const size = 3 + (index % 4) * 2;
  const duration = 2200 + (index % 5) * 350;
  const delay = (index % 8) * 220;

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration, easing: Easing.out(Easing.quad) }),
        -1,
        false
      )
    );
  }, [delay, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [SCREEN_HEIGHT * 0.7, -40]);
    const translateX = Math.sin(progress.value * 6 + index) * 20;
    const opacity = interpolate(
      progress.value,
      [0, 0.2, 0.7, 1],
      [0, 0.8, 0.6, 0]
    );
    const scale = interpolate(progress.value, [0, 0.5, 1], [0.6, 1.2, 0.3]);

    return {
      transform: [
        { translateX: startX + translateX },
        { translateY },
        { scale },
      ] as any,
      opacity,
    };
  });

  const emberColor = index % 3 === 0 ? '#F43F5E' : index % 3 === 1 ? '#FB7185' : '#E11D48';

  return (
    <Animated.View
      style={[
        styles.ember,
        {
          backgroundColor: emberColor,
          width: size,
          height: size,
          borderRadius: size / 2,
          shadowColor: '#F43F5E',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 6,
        },
        animatedStyle,
      ]}
    />
  );
}

// Efeito de pulsação dramática vermelha nas bordas
function ImpostorVignette() {
  const pulse = useSharedValue(0.2);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(0.65, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.25, { duration: 1000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, [pulse]);

  const topGlowStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  const bottomGlowStyle = useAnimatedStyle(() => ({
    opacity: pulse.value * 0.8,
  }));

  return (
    <>
      <Animated.View style={[styles.topGlow, topGlowStyle]} />
      <Animated.View style={[styles.bottomGlow, bottomGlowStyle]} />
    </>
  );
}

interface CelebrationEffectsProps {
  impostorWon: boolean;
}

export function CelebrationEffects({ impostorWon }: CelebrationEffectsProps) {
  if (!impostorWon) {
    // Efeito para civis: Confetes caindo
    const pieces = Array.from({ length: 28 }, (_, i) => i);
    return (
      <View style={styles.container} pointerEvents="none">
        {pieces.map(i => (
          <ConfettiPiece key={i} index={i} total={pieces.length} />
        ))}
      </View>
    );
  }

  // Efeito para impostor: Brasas ascendentes e vinheta vermelha de infiltração
  const embers = Array.from({ length: 20 }, (_, i) => i);
  return (
    <View style={styles.container} pointerEvents="none">
      <ImpostorVignette />
      {embers.map(i => (
        <ImpostorEmber key={i} index={i} total={embers.length} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    zIndex: 1,
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ember: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  topGlow: {
    position: 'absolute',
    top: -60,
    left: '10%',
    right: '10%',
    height: 180,
    backgroundColor: 'rgba(244, 63, 94, 0.2)',
    borderRadius: 90,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -60,
    left: '15%',
    right: '15%',
    height: 160,
    backgroundColor: 'rgba(225, 29, 72, 0.15)',
    borderRadius: 80,
  },
});
