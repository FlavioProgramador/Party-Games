import { View, StyleSheet } from 'react-native';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';

import { SetupScreen } from '@/games/impostor/components/screens/SetupScreen';
import { PreStartScreen } from '@/games/impostor/components/screens/PreStartScreen';
import { RevealScreen } from '@/games/impostor/components/screens/RevealScreen';
import { RoundScreen } from '@/games/impostor/components/screens/RoundScreen';
import { VotingScreen } from '@/games/impostor/components/screens/VotingScreen';
import { TiebreakScreen } from '@/games/impostor/components/screens/TiebreakScreen';
import { ImpostorGuessScreen } from '@/games/impostor/components/screens/ImpostorGuessScreen';
import { ResultScreen } from '@/games/impostor/components/screens/ResultScreen';

export default function ImpostorGameController() {
  const phase = useImpostorStore(state => state.phase);

  // Durante a fase 'voting', mantemos o RoundScreen montado (mas invisível)
  // para que o timer continue rodando em background.
  const isRoundOrVoting = phase === 'round' || phase === 'voting';

  if (isRoundOrVoting) {
    return (
      <View style={styles.fill}>
        {/* RoundScreen sempre montado durante round/voting para manter o timer */}
        <View
          style={[
            styles.fill,
            phase === 'voting' && styles.hidden,
          ]}
          pointerEvents={phase === 'voting' ? 'none' : 'auto'}
        >
          <RoundScreen />
        </View>

        {/* VotingScreen só visível na fase de votação */}
        {phase === 'voting' && (
          <View style={[styles.fill, styles.overlay]}>
            <VotingScreen />
          </View>
        )}
      </View>
    );
  }

  switch (phase) {
    case 'setup':
    case 'how_to_play':
      return <SetupScreen />;
    case 'pre_start':
      return <PreStartScreen />;
    case 'reveal':
      return <RevealScreen />;
    case 'tiebreak':
      return <TiebreakScreen />;
    case 'impostor_guess':
      return <ImpostorGuessScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <View />;
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  hidden: {
    opacity: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
