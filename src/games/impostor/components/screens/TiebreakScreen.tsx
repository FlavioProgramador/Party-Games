import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { theme } from '../../../../theme';
import { useImpostorStore } from '../../store/useImpostorStore';

export function TiebreakScreen() {
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<'pass' | 'vote'>('pass');
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  // Find the first player who hasn't voted
  const currentVoterId = store.playOrder.find(id => !store.votes[id]);
  const currentVoter = store.players.find(p => p.id === currentVoterId);

  useEffect(() => {
    setStep('pass');
    setSelectedVote(null);
  }, [currentVoterId]);

  // If everyone has voted, finish tiebreak
  useEffect(() => {
    if (!currentVoterId && Object.keys(store.votes).length === store.players.length) {
      store.finishTiebreak();
    }
  }, [currentVoterId, store.votes]);

  if (!currentVoter) return <View style={styles.container} />;

  if (step === 'pass') {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Typography variant="label" color={theme.colors.danger} style={{ marginBottom: theme.spacing.xl, letterSpacing: 2 }}>
            EMPATE! HORA DO DESEMPATE
          </Typography>
          
          <Typography variant="h2" bold style={{ marginBottom: theme.spacing.md }}>
            Entregue o celular para:
          </Typography>
          
          <Typography variant="display" color={theme.colors.primary} bold style={{ marginBottom: theme.spacing.xxl, textAlign: 'center' }}>
            {currentVoter.name.toUpperCase()}
          </Typography>
          
          <Button 
            title="SOU EU" 
            onPress={() => setStep('vote')} 
          />
        </View>
      </View>
    );
  }

  const handleConfirmVote = () => {
    if (selectedVote) {
      store.registerVote(currentVoter.id, selectedVote);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top + 40, 60), paddingBottom: Math.max(insets.bottom + 40, 40) }]}
    >
      <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.sm, letterSpacing: 2 }}>
        VOTO DE {currentVoter.name.toUpperCase()}
      </Typography>
      
      <Typography variant="h2" bold style={{ marginBottom: theme.spacing.xl }}>
        Quem é o Impostor?
      </Typography>

      <View style={styles.optionsList}>
        {store.players.map(player => {
          // Only show tied players as options
          if (!store.tiedPlayers.includes(player.id)) return null;
          if (player.id === currentVoter.id) return null; // Cannot vote for self

          return (
            <Button
              key={player.id}
              title={player.name}
              variant={selectedVote === player.id ? 'primary' : 'secondary'}
              onPress={() => setSelectedVote(player.id)}
              style={{ marginBottom: theme.spacing.sm }}
            />
          );
        })}
      </View>

      <Button
        title="CONFIRMAR VOTO"
        variant="danger"
        disabled={!selectedVote}
        onPress={handleConfirmVote}
        style={{ marginTop: theme.spacing.xxl }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.margin,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.margin,
  },
  optionsList: {
    width: '100%',
    marginTop: theme.spacing.md,
  }
});
