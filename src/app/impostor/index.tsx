import { View } from 'react-native';
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

  switch (phase) {
    case 'setup':
    case 'how_to_play':
      return <SetupScreen />;
    case 'pre_start':
      return <PreStartScreen />;
    case 'reveal':
      return <RevealScreen />;
    case 'round':
      return <RoundScreen />;
    case 'voting':
      return <VotingScreen />;
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
