import { ImpostorGameState, createInitialState } from './gameState';
import { Player, Word, GameSettings } from '../types';
import { normalizeString } from '../utils/stringUtils';

// This is a pure functional engine. All functions take the current state
// and return a NEW state, without mutating the original.

export interface EngineDependencies {
  randomItem: <T>(array: T[]) => T;
  shuffleArray: <T>(array: T[]) => T[];
  now: () => number;
}

export const createEngine = (deps: EngineDependencies) => {
  return {
    setPlayers(state: ImpostorGameState, players: Player[]): ImpostorGameState {
      return { ...state, players };
    },

    updateSettings(state: ImpostorGameState, settings: Partial<GameSettings>): ImpostorGameState {
      return { ...state, settings: { ...state.settings, ...settings } };
    },

    startGame(state: ImpostorGameState, availableWords: Word[]): ImpostorGameState {
      if (state.players.length < 3) throw new Error('Not enough players');
      
      const filteredWords = state.settings.categoryId === 'all' 
        ? availableWords 
        : availableWords.filter(w => w.category === state.settings.categoryId);
      
      if (filteredWords.length === 0) throw new Error('No words available for this category');

      const word = deps.randomItem(filteredWords);
      const impostorId = deps.randomItem(state.players).id;
      const playOrder = deps.shuffleArray(state.players).map(p => p.id);

      return {
        ...state,
        phase: 'reveal',
        word,
        impostorId,
        playOrder,
        revealedCount: 0,
        votes: {},
        tiedPlayers: [],
        winner: null,
        impostorGuess: null,
        roundEndTime: null
      };
    },

    nextReveal(state: ImpostorGameState): ImpostorGameState {
      const nextCount = state.revealedCount + 1;
      
      if (nextCount >= state.players.length) {
        // Everyone revealed. Start round
        return {
          ...state,
          revealedCount: nextCount,
          phase: 'round',
          roundEndTime: state.settings.timeLimit > 0 
            ? deps.now() + (state.settings.timeLimit * 1000) 
            : null
        };
      }
      
      return { ...state, revealedCount: nextCount };
    },

    endRound(state: ImpostorGameState): ImpostorGameState {
      return { ...state, phase: 'voting', votes: {} };
    },

    registerVote(state: ImpostorGameState, voterId: string, votedId: string): ImpostorGameState {
      if (voterId === votedId) throw new Error('Cannot vote for yourself');
      return {
        ...state,
        votes: { ...state.votes, [voterId]: votedId }
      };
    },

    finishVoting(state: ImpostorGameState): ImpostorGameState {
      const voteCounts = calculateVoteCounts(state.votes);
      const maxVotes = Math.max(0, ...Object.values(voteCounts));
      
      const mostVoted = Object.keys(voteCounts).filter(id => voteCounts[id] === maxVotes);

      if (mostVoted.length > 1) {
        return { ...state, phase: 'tiebreak', tiedPlayers: mostVoted, votes: {} };
      }

      const eliminatedId = mostVoted[0];
      if (eliminatedId === state.impostorId) {
        return { ...state, phase: 'impostor_guess' };
      }

      return { ...state, phase: 'result', winner: 'impostor' };
    },

    finishTiebreak(state: ImpostorGameState): ImpostorGameState {
      const voteCounts = calculateVoteCounts(state.votes);
      const maxVotes = Math.max(0, ...Object.values(voteCounts));
      
      const mostVoted = Object.keys(voteCounts).filter(id => voteCounts[id] === maxVotes);

      // If tied again, impostor escapes
      if (mostVoted.length > 1) {
        return { ...state, phase: 'result', winner: 'impostor' };
      }

      const eliminatedId = mostVoted[0];
      if (eliminatedId === state.impostorId) {
        return { ...state, phase: 'impostor_guess' };
      }

      return { ...state, phase: 'result', winner: 'impostor' };
    },

    impostorGuess(state: ImpostorGameState, guess: string): ImpostorGameState {
      if (!state.word) throw new Error('No word set');
      
      const isCorrect = normalizeString(guess) === normalizeString(state.word.value);
      return {
        ...state,
        impostorGuess: guess,
        phase: 'result',
        winner: isCorrect ? 'impostor' : 'players'
      };
    },

    playAgain(state: ImpostorGameState): ImpostorGameState {
      return {
        ...createInitialState(state.settings),
        players: state.players,
        phase: 'setup',
      };
    }
  };
};

function calculateVoteCounts(votes: Record<string, string>): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const votedId of Object.values(votes)) {
    counts[votedId] = (counts[votedId] || 0) + 1;
  }
  return counts;
}
