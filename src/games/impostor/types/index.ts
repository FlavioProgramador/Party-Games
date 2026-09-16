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

export interface GameSettings {
  timeLimit: number; // In seconds. 0 = no limit
  impostorCount: number; // Always 1 in v1
  categoryId: string; // 'all' or specific ID
}

export interface VoteResult {
  playerId: string;
  count: number;
}
