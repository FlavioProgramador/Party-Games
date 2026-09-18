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
  /** Resolve how many impostors based on settings and player count */
  const resolveImpostorCount = (settings: GameSettings, playerCount: number): number => {
    const { impostorCount } = settings;
    let count: number;

    if (impostorCount.mode === 'random') {
      const min = impostorCount.randomRange.min;
      const max = impostorCount.randomRange.max;
      count = min + Math.floor(Math.random() * (max - min + 1));
    } else {
      count = impostorCount.fixedValue;
    }

    // Safety: never more impostors than half the players (rounded down) minus 1
    const maxAllowed = Math.max(1, Math.floor(playerCount / 2) - 1);
    return Math.min(count, maxAllowed);
  };

  return {
    setPlayers(state: ImpostorGameState, players: Player[]): ImpostorGameState {
      return { ...state, players };
    },

    updateSettings(state: ImpostorGameState, settings: Partial<GameSettings>): ImpostorGameState {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...settings,
          // Deep-merge nested objects
          impostorCount: {
            ...state.settings.impostorCount,
            ...(settings.impostorCount || {}),
            randomRange: {
              ...state.settings.impostorCount.randomRange,
              ...(settings.impostorCount?.randomRange || {}),
            },
          },
          impostorAdvantages: {
            ...state.settings.impostorAdvantages,
            ...(settings.impostorAdvantages || {}),
          },
          votingRules: {
            ...state.settings.votingRules,
            ...(settings.votingRules || {}),
          },
        },
      };
    },

    startGame(state: ImpostorGameState, availableWords: Word[]): ImpostorGameState {
      if (state.players.length < 3) throw new Error('Not enough players');
      
      const selectedCats = state.settings.categoryIds && state.settings.categoryIds.length > 0
        ? state.settings.categoryIds
        : (state.settings.categoryId ? [state.settings.categoryId] : ['all']);

      const filteredWords = selectedCats.includes('all')
        ? availableWords
        : availableWords.filter(w => selectedCats.includes(w.category));
      
      if (filteredWords.length === 0) throw new Error('No words available for this category');

      const word = deps.randomItem(filteredWords);
      
      // Select impostor(s)
      const impostorCount = resolveImpostorCount(state.settings, state.players.length);
      const shuffledPlayers = deps.shuffleArray([...state.players]);
      const impostorIds = shuffledPlayers.slice(0, impostorCount).map(p => p.id);
      
      let playOrder = deps.shuffleArray(state.players).map(p => p.id);
      if (state.settings.impostorAdvantages.safeStart && impostorIds.includes(playOrder[0])) {
        const safeIndex = playOrder.findIndex(id => !impostorIds.includes(id));
        if (safeIndex > 0) {
          const temp = playOrder[0];
          playOrder[0] = playOrder[safeIndex];
          playOrder[safeIndex] = temp;
        }
      }

      return {
        ...state,
        phase: 'pre_start',
        word,
        impostorIds,
        playOrder,
        revealedCount: 0,
        votes: {},
        tiedPlayers: [],
        accusedPlayerIds: [],
        winner: null,
        impostorGuess: null,
        roundEndTime: null
      };
    },

    startReveal(state: ImpostorGameState): ImpostorGameState {
      return { ...state, phase: 'reveal' };
    },

    reshufflePlayOrder(state: ImpostorGameState): ImpostorGameState {
      let playOrder = deps.shuffleArray(state.players).map(p => p.id);
      if (state.settings.impostorAdvantages.safeStart && state.impostorIds.includes(playOrder[0])) {
        const safeIndex = playOrder.findIndex(id => !state.impostorIds.includes(id));
        if (safeIndex > 0) {
          const temp = playOrder[0];
          playOrder[0] = playOrder[safeIndex];
          playOrder[safeIndex] = temp;
        }
      }
      return { ...state, playOrder };
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
      return { 
        ...state, 
        phase: 'voting', 
        votes: {},
      };
    },

    returnToRound(state: ImpostorGameState): ImpostorGameState {
      if (state.phase !== 'voting') return state;

      return {
        ...state,
        phase: 'round',
        votes: {},
        accusedPlayerIds: [],
      };
    },

    setRoundEndTime(state: ImpostorGameState, roundEndTime: number | null): ImpostorGameState {
      return { ...state, roundEndTime };
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
      
      // Check if the eliminated player is an impostor
      if (state.impostorIds.includes(eliminatedId)) {
        // If lastChance is enabled, give the impostor a chance to guess
        if (state.settings.votingRules.lastChance) {
          return { ...state, accusedPlayerIds: [eliminatedId], phase: 'impostor_guess' };
        }
        return { ...state, accusedPlayerIds: [eliminatedId], phase: 'result', winner: 'players' };
      }

      // Civilian was eliminated
      if (state.settings.votingRules.civilianAccusedMeansImpostorWins) {
        return { ...state, accusedPlayerIds: [eliminatedId], phase: 'result', winner: 'impostor' };
      }

      return { ...state, accusedPlayerIds: [eliminatedId], phase: 'result', winner: 'impostor' };
    },

    finishGroupVoting(state: ImpostorGameState, accusedPlayerIds: string[]): ImpostorGameState {
      if (accusedPlayerIds.length === 0) throw new Error('No players selected for group voting');

      // Check if any accused player is an innocent
      const accusedAnInnocent = accusedPlayerIds.some(id => !state.impostorIds.includes(id));

      // Check if all actual impostors were accused
      const caughtAllImpostors = state.impostorIds.every(id => accusedPlayerIds.includes(id));

      const isSuccess = !accusedAnInnocent && caughtAllImpostors;

      if (isSuccess) {
        if (state.settings.votingRules.lastChance) {
          return { ...state, accusedPlayerIds, phase: 'impostor_guess' };
        }
        return { ...state, accusedPlayerIds, phase: 'result', winner: 'players' };
      }

      return { ...state, accusedPlayerIds, phase: 'result', winner: 'impostor' };
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
      if (state.impostorIds.includes(eliminatedId)) {
        if (state.settings.votingRules.lastChance) {
          return { ...state, phase: 'impostor_guess' };
        }
        return { ...state, phase: 'result', winner: 'players' };
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
