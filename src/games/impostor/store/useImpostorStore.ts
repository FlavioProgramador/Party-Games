import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImpostorGameState, createInitialState } from '../engine/gameState';
import { createEngine } from '../engine/gameEngine';
import { Player, GameSettings } from '../types';
import { WORD_BANK } from '../data/wordBank';

const STORE_VERSION = 2; // Bump this to reset persisted data on schema changes

// Instantiate the pure engine with real dependencies
const engine = createEngine({
  randomItem: <T>(array: T[]) => array[Math.floor(Math.random() * array.length)],
  shuffleArray: <T>(array: T[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
  now: () => Date.now(),
});

interface ImpostorStoreActions {
  setPlayers: (players: Player[]) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  startGame: () => void;
  startReveal: () => void;
  reshufflePlayOrder: () => void;
  nextReveal: () => void;
  endRound: () => void;
  returnToRound: () => void;
  setRoundEndTime: (endTime: number | null) => void;
  registerVote: (voterId: string, votedId: string) => void;
  finishVoting: () => void;
  finishGroupVoting: (accusedPlayerIds: string[]) => void;
  finishTiebreak: () => void;
  submitImpostorGuess: (guess: string) => void;
  playAgain: () => void;
  resetToMenu: () => void;
}

export type ImpostorStore = ImpostorGameState & ImpostorStoreActions;

export const useImpostorStore = create<ImpostorStore>()(
  persist(
    (set) => ({
      ...createInitialState(),

      setPlayers: (players) => set(state => engine.setPlayers(state, players)),
      
      updateSettings: (settings) => set(state => engine.updateSettings(state, settings)),
      
      startGame: () => set(state => engine.startGame(state, WORD_BANK)),
      
      startReveal: () => set(state => engine.startReveal(state)),
      
      reshufflePlayOrder: () => set(state => engine.reshufflePlayOrder(state)),
      
      nextReveal: () => set(state => engine.nextReveal(state)),
      
      endRound: () => set(state => engine.endRound(state)),
      
      returnToRound: () => set(state => engine.returnToRound(state)),

      setRoundEndTime: (endTime) => set(state => engine.setRoundEndTime(state, endTime)),
      
      registerVote: (voterId, votedId) => set(state => engine.registerVote(state, voterId, votedId)),
      
      finishVoting: () => set(state => engine.finishVoting(state)),

      finishGroupVoting: (accusedPlayerIds) => set(state => engine.finishGroupVoting(state, accusedPlayerIds)),
      
      finishTiebreak: () => set(state => engine.finishTiebreak(state)),
      
      submitImpostorGuess: (guess) => set(state => engine.impostorGuess(state, guess)),
      
      playAgain: () => set(state => engine.playAgain(state)),

      resetToMenu: () => set(state => createInitialState(state.settings)),
    }),
    {
      name: 'impostor-store',
      version: STORE_VERSION,
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (_persistedState, version) => {
        // If the version is old, reset to fresh state
        if (version < STORE_VERSION) {
          return createInitialState();
        }
        return _persistedState as ImpostorGameState;
      },
    }
  )
);
