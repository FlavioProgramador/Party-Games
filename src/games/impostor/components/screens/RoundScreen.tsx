import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { CircularTimer } from '../../../../components/CircularTimer';
import { theme } from '../../../../theme';
import { useImpostorStore } from '../../store/useImpostorStore';
import { selectRoundEndTime } from '../../store/selectors';
import { hapticsService } from '../../../../core/haptics/hapticsService';
import { audioService } from '../../../../core/audio/audioService';

export function RoundScreen() {
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();
  const endTime = selectRoundEndTime(store);
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [selectedPlayerForHint, setSelectedPlayerForHint] = useState<string | null>(null);

  useEffect(() => {
    if (!endTime) return;

    let intervalId: ReturnType<typeof setInterval>;
    let lastUrgentTick = 0;

    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 10 && remaining > 0) {
        if (remaining !== lastUrgentTick) {
          lastUrgentTick = remaining;
          audioService.playSound('tick');
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

    return () => clearInterval(intervalId);
  }, [endTime]);

  if (selectedPlayerForHint) {
    const isImpostor = selectedPlayerForHint === store.impostorId;
    const player = store.players.find(p => p.id === selectedPlayerForHint);
    
    return (
      <View style={[styles.container, { paddingTop: Math.max(insets.top + 40, 60), paddingBottom: Math.max(insets.bottom + 40, 40) }]}>
        <View style={styles.content}>
          <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.xl, letterSpacing: 2 }}>
            INFORMAÇÃO SECRETA
          </Typography>
          
          <Typography variant="h3" bold style={{ marginBottom: theme.spacing.xl }}>
            {player?.name.toUpperCase()}
          </Typography>
          
          <Card variant="modal" style={{ padding: theme.spacing.xl, alignItems: 'center', borderColor: isImpostor ? theme.colors.danger : theme.colors.secondary }}>
            {isImpostor ? (
              <>
                <Typography variant="h2" bold color={theme.colors.danger} style={{ marginBottom: theme.spacing.lg }}>
                  VOCÊ É O IMPOSTOR
                </Typography>
                <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.sm }}>
                  Sua Dica:
                </Typography>
                <Typography variant="h3" bold style={{ fontStyle: 'italic', textAlign: 'center' }}>
                  "{store.word?.impostorHint}"
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.md }}>
                  Sua palavra é:
                </Typography>
                <Typography variant="display" bold color={theme.colors.secondary} style={{ textAlign: 'center' }}>
                  {store.word?.value.toUpperCase()}
                </Typography>
              </>
            )}
          </Card>
          
          <Button 
            title="VOLTAR PARA A RODADA"
            variant="secondary" 
            onPress={() => setSelectedPlayerForHint(null)} 
            style={{ marginTop: theme.spacing.xxl }}
          />
        </View>
      </View>
    );
  }

  const durationSeconds = store.settings.timeLimit || 60; // Fallback se tempo for infinito

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top + 20, 40), paddingBottom: Math.max(insets.bottom + 20, 40) }]}>
      <View style={styles.content}>
        <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.xl, letterSpacing: 2 }}>
          RODADA EM ANDAMENTO
        </Typography>

        <View style={styles.timerContainer}>
          {endTime ? (
            <CircularTimer 
              durationSeconds={durationSeconds}
              remainingSeconds={timeLeft || 0}
              size={240}
              strokeWidth={12}
            />
          ) : (
            <Typography variant="timer" color={theme.colors.secondary}>
              ∞
            </Typography>
          )}
        </View>

        <Typography variant="body" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginVertical: theme.spacing.xl }}>
          Dê uma dica relacionada à palavra.
        </Typography>

        <Card padding="md" style={styles.orderCard}>
          <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.md }}>
            ORDEM DOS JOGADORES
          </Typography>
          
          <ScrollView style={{ maxHeight: 240 }} showsVerticalScrollIndicator={false}>
            {store.playOrder.map((playerId, index) => {
              const player = store.players.find(p => p.id === playerId);
              return (
                <View key={playerId} style={styles.playerRow}>
                  <Typography variant="h3" bold>
                    {index + 1}. {player?.name}
                  </Typography>
                  <Button 
                    title="Lembrar" 
                    variant="ghost" 
                    size="sm"
                    fullWidth={false}
                    onPress={() => setSelectedPlayerForHint(playerId)} 
                  />
                </View>
              );
            })}
          </ScrollView>
        </Card>

        <Button 
          title="IR PARA VOTAÇÃO" 
          variant={timeLeft === 0 || !endTime ? 'primary' : 'secondary'}
          onPress={() => store.endRound()} 
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
    paddingHorizontal: theme.spacing.margin,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
    height: 240,
  },
  orderCard: {
    width: '100%',
    flex: 1,
  },
  playerRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  }
});
