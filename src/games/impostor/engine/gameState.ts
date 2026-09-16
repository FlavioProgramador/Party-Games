import { GamePhase, GameSettings, Player, Word } from '../types';

export interface ImpostorGameState {
  phase: GamePhase;
  players: Player[];
  settings: GameSettings;
  
  // Round data
  word: Word | null;
  impostorId: string | null;
  playOrder: string[]; // Player IDs in random order
  
  // Reveal state
  revealedCount: number; // How many players have seen their role
  
  // Timer state
  roundEndTime: number | null; // Timestamp
  
  // Voting state
  votes: Record<string, string>; // voterId -> votedId
  tiedPlayers: string[]; // Player IDs that are tied
  
  // Result
  winner: 'impostor' | 'players' | null;
  impostorGuess: string | null;
}

export const createInitialState = (settings: Partial<GameSettings> = {}): ImpostorGameState => ({
  phase: 'setup',
  players: [],
  settings: {
    timeLimit: 60,
    impostorCount: 1,
    categoryId: 'all',
    difficulty: 'normal',
    impostorAdvantages: false,
    votingType: 'all',
    ...settings
  },
  word: null,
  impostorId: null,
  playOrder: [],
  revealedCount: 0,
  roundEndTime: null,
  votes: {},
  tiedPlayers: [],
  winner: null,
  impostorGuess: null,
});
