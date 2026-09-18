import { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { theme } from '../../../../theme';
import { useImpostorStore } from '../../store/useImpostorStore';
import { hapticsService } from '../../../../core/haptics/hapticsService';
import { audioService } from '../../../../core/audio/audioService';

export function ResultScreen() {
  const router = useRouter();
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();
  
  const impostors = store.players.filter(p => store.impostorIds.includes(p.id));
  const impostorWon = store.winner === 'impostor';

  useEffect(() => {
    if (impostorWon) {
      audioService.playSound('fail');
      hapticsService.triggerError();
    } else {
      audioService.playSound('success');
      hapticsService.triggerSuccess();
    }
  }, [impostorWon]);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 40, 60), paddingBottom: Math.max(insets.bottom + 40, 40) }]}
    >
      <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.xl, letterSpacing: 2, textAlign: 'center' }}>
        FIM DE JOGO
      </Typography>

      <Card 
        variant="modal"
        style={[styles.card, { borderColor: impostorWon ? theme.colors.danger : theme.colors.primary }]}
      >
        <Typography variant="h2" bold color={impostorWon ? theme.colors.danger : theme.colors.primary} style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
          {impostorWon ? 'O IMPOSTOR VENCEU!' : 'OS JOGADORES VENCERAM!'}
        </Typography>

        <View style={styles.divider} />

        <Typography variant="label" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: theme.spacing.xs }}>
          PALAVRA
        </Typography>
        <Typography variant="display" bold color={theme.colors.secondary} style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
          {store.word?.value.toUpperCase()}
        </Typography>

        <Typography variant="label" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: theme.spacing.xs }}>
          IMPOSTOR
        </Typography>
        <Typography variant="h2" bold style={{ textAlign: 'center', marginBottom: theme.spacing.md }}>
          {impostors.map(p => p.name).join(', ').toUpperCase()}
        </Typography>

        {store.impostorGuess && (
          <>
            <View style={styles.divider} />
            <Typography variant="label" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: theme.spacing.xs }}>
              CHUTE DO IMPOSTOR
            </Typography>
            <Typography variant="h3" bold style={{ textAlign: 'center', marginBottom: theme.spacing.md, color: impostorWon ? theme.colors.success : theme.colors.danger }}>
              {store.impostorGuess.toUpperCase()}
            </Typography>
          </>
        )}
      </Card>

      <Button 
        title="JOGAR NOVAMENTE" 
        variant="primary"
        onPress={() => store.playAgain()} 
        style={{ marginTop: theme.spacing.xxl, marginBottom: theme.spacing.md, width: '100%' }}
      />
      
      <Button 
        title="VOLTAR AO MENU" 
        variant="secondary"
        onPress={() => {
          store.resetToMenu();
          router.replace('/');
        }} 
        style={{ width: '100%' }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.margin,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    width: '100%',
    marginVertical: theme.spacing.lg,
  }
});
