import { GamePhase, GameSettings, Player, Word } from '../types';

export interface ImpostorGameState {
  phase: GamePhase;
  players: Player[];
  settings: GameSettings;
  
  // Round data
  word: Word | null;
  impostorIds: string[]; // Support multiple impostors
  playOrder: string[]; // Player IDs in random order
  
  // Reveal state
  revealedCount: number; // How many players have seen their role
  
  // Timer state
  roundEndTime: number | null; // Timestamp
  
  // Voting state
  votes: Record<string, string>; // voterId -> votedId
  tiedPlayers: string[]; // Player IDs that are tied
  accusedPlayerIds: string[]; // IDs of players accused by group or most voted
  
  // Result
  winner: 'impostor' | 'players' | null;
  impostorGuess: string | null;
}

export const DEFAULT_SETTINGS: GameSettings = {
  timeLimit: 60,
  impostorCount: {
    mode: 'fixed',
    fixedValue: 1,
    randomRange: { min: 1, max: 2 },
  },
  categoryId: 'all',
  categoryIds: ['all'],
  difficulty: 'easy',
  impostorAdvantages: {
    seeCategory: false,
    getHint: true,
    safeStart: false,
  },
  votingRules: {
    accusationMode: 'one_at_a_time',
    lastChance: true,
    partialGuess: false,
    civilianAccusedMeansImpostorWins: false,
  },
  votingMode: 'group',
  votingType: 'all',
};

export const createInitialState = (settings: Partial<GameSettings> = {}): ImpostorGameState => ({
  phase: 'setup',
  players: [],
  settings: {
    ...DEFAULT_SETTINGS,
    ...settings,
    impostorCount: {
      ...DEFAULT_SETTINGS.impostorCount,
      ...(settings.impostorCount || {}),
    },
    impostorAdvantages: {
      ...DEFAULT_SETTINGS.impostorAdvantages,
      ...(settings.impostorAdvantages || {}),
    },
    votingRules: {
      ...DEFAULT_SETTINGS.votingRules,
      ...(settings.votingRules || {}),
    },
  },
  word: null,
  impostorIds: [],
  playOrder: [],
  revealedCount: 0,
  roundEndTime: null,
  votes: {},
  tiedPlayers: [],
  accusedPlayerIds: [],
  winner: null,
  impostorGuess: null,
});

