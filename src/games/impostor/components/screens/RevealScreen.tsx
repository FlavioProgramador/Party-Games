import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { theme } from '../../../../theme';
import { useImpostorStore } from '../../store/useImpostorStore';
import { selectCurrentPlayerReveal, selectIsImpostor } from '../../store/selectors';

export function RevealScreen() {
  const store = useImpostorStore();
  const currentPlayer = selectCurrentPlayerReveal(store);
  const isImpostor = currentPlayer ? selectIsImpostor(currentPlayer.id)(store) : false;
  
  const [step, setStep] = useState<'pass' | 'reveal'>('pass');
  const [isHolding, setIsHolding] = useState(false);
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  // Reset local state when player changes
  useEffect(() => {
    setStep('pass');
    setIsHolding(false);
    opacity.value = 0;
    scale.value = 1;
  }, [store.revealedCount]);

  const handlePressIn = () => {
    setIsHolding(true);
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withTiming(0.98, { duration: 200 });
  };

  const handlePressOut = () => {
    setIsHolding(false);
    opacity.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(1, { duration: 200 });
  };

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!currentPlayer) return <View style={styles.container} />;

  if (step === 'pass') {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.xl, letterSpacing: 2 }}>
            SUA VEZ
          </Typography>
          
          <Typography variant="h2" bold style={{ marginBottom: theme.spacing.md }}>
            Entregue o celular para:
          </Typography>
          
          <Typography variant="display" color={theme.colors.primary} bold style={{ marginBottom: theme.spacing.xxl, textAlign: 'center' }}>
            {currentPlayer.name.toUpperCase()}
          </Typography>
          
          <Button 
            title="SOU EU" 
            onPress={() => setStep('reveal')} 
          />
        </View>
      </View>
    );
  }

  const glowColor = isImpostor ? theme.colors.danger : theme.colors.secondary;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Typography variant="h3" bold color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.lg }}>
          {currentPlayer.name.toUpperCase()}
        </Typography>

        <Pressable 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.pressableArea}
        >
          <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
            <Card variant="modal" style={[styles.card, { borderColor: isHolding ? glowColor : 'rgba(255,255,255,0.12)' }]}>
              
              {!isHolding && (
                <View style={styles.placeholder}>
                  <Typography variant="h2" bold style={{ textAlign: 'center', marginBottom: theme.spacing.md }}>
                    🤫
                  </Typography>
                  <Typography variant="h3" bold color={theme.colors.textMuted} style={{ textAlign: 'center' }}>
                    Pressione e segure{'\n'}para revelar
                  </Typography>
                </View>
              )}

              <Animated.View style={[StyleSheet.absoluteFill, styles.secretContent, animatedContentStyle]}>
                {isImpostor ? (
                  <>
                    <Typography variant="h2" bold color={theme.colors.danger} style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
                      VOCÊ É O IMPOSTOR
                    </Typography>
                    <Typography variant="label" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>
                      SUA DICA
                    </Typography>
                    <Typography variant="h3" bold style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: theme.spacing.xl }}>
                      "{store.word?.impostorHint}"
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="label" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: theme.spacing.md }}>
                      SUA PALAVRA É
                    </Typography>
                    <Typography variant="display" bold color={theme.colors.secondary} style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
                      {store.word?.value.toUpperCase()}
                    </Typography>
                  </>
                )}
              </Animated.View>

            </Card>
          </Animated.View>
        </Pressable>

        <Button 
          title="PRÓXIMO" 
          variant="secondary"
          onPress={() => {
            store.nextReveal();
          }} 
          style={{ marginTop: theme.spacing.xl }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: theme.spacing.margin,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  pressableArea: {
    width: '100%',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
  },
  card: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  secretContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surfaceModal,
    borderRadius: theme.borderRadius.xl,
  }
});
