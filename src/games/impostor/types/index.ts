export type GamePhase =
  | 'setup'
  | 'pre_start'
  | 'how_to_play'
  | 'reveal'
  | 'round'
  | 'voting'
  | 'tiebreak'
  | 'impostor_guess'
  | 'result';

export interface Player {
  id: string;
  name: string;
}

export interface Word {
  id: string;
  value: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  impostorHint: string;
}

export interface ImpostorCountConfig {
  mode: 'fixed' | 'random';
  fixedValue: number;
  randomRange: { min: number; max: number };
}

export interface ImpostorAdvantagesConfig {
  seeCategory: boolean;
  getHint: boolean;
  safeStart: boolean;
}

export interface VotingRulesConfig {
  accusationMode: 'one_at_a_time' | 'all_at_once';
  lastChance: boolean;
  partialGuess: boolean;
  civilianAccusedMeansImpostorWins: boolean;
}

export interface GameSettings {
  timeLimit: number; // In seconds. 0 = no limit
  impostorCount: ImpostorCountConfig;
  categoryId: string; // 'all' or specific ID (legacy fallback)
  categoryIds: string[]; // List of selected category IDs or ['all']
  difficulty: 'easy' | 'medium' | 'hard';
  impostorAdvantages: ImpostorAdvantagesConfig;
  votingRules: VotingRulesConfig;
  votingMode: 'individual' | 'group'; // 'individual' = pass phone, 'group' = collective decision
  votingType: 'all' | 'secret'; // legacy fallback
}

export interface VoteResult {
  playerId: string;
  count: number;
}
