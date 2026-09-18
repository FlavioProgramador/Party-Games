import { createEngine, EngineDependencies } from '../gameEngine';
import { createInitialState } from '../gameState';
import { Player, Word, GameSettings } from '../../types';

describe('Impostor Game Engine', () => {
  let mockDeps: EngineDependencies;
  let engine: ReturnType<typeof createEngine>;

  const mockPlayers: Player[] = [
    { id: 'p1', name: 'Alice' },
    { id: 'p2', name: 'Bob' },
    { id: 'p3', name: 'Charlie' },
    { id: 'p4', name: 'Diana' },
  ];

  const mockWords: Word[] = [
    { id: 'w1', value: 'Pizza', category: 'food', impostorHint: 'Comida', difficulty: 'easy' },
    { id: 'w2', value: 'Dog', category: 'animal', impostorHint: 'Animal', difficulty: 'easy' },
  ];

  beforeEach(() => {
    mockDeps = {
      randomItem: jest.fn((arr: any[]) => arr[0]), // Always returns first item
      shuffleArray: jest.fn((arr: any[]) => [...arr]), // Identity
      now: jest.fn(() => 1000), // Fixed time
    };
    engine = createEngine(mockDeps);
  });

  describe('startGame', () => {
    it('throws error if less than 3 players', () => {
      const state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      const stateWithPlayers = engine.setPlayers(state, [mockPlayers[0], mockPlayers[1]]);

      expect(() => {
        engine.startGame(stateWithPlayers, mockWords);
      }).toThrow('Not enough players');
    });

    it('initializes game correctly with enough players', () => {
      const state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      const stateWithPlayers = engine.setPlayers(state, mockPlayers);

      const nextState = engine.startGame(stateWithPlayers, mockWords);

      expect(nextState.phase).toBe('pre_start');
      expect(nextState.impostorIds).toEqual(['p1']); // Because mock shuffleArray returns identity and fixed 1 impostor
      expect(nextState.playOrder).toEqual(['p1', 'p2', 'p3', 'p4']);
      expect(nextState.word).toEqual(mockWords[0]);
    });

    it('filters words across multiple selected categories', () => {
      const state = createInitialState({ categoryIds: ['animal'], timeLimit: 60 });
      const stateWithPlayers = engine.setPlayers(state, mockPlayers);

      const nextState = engine.startGame(stateWithPlayers, mockWords);

      expect(nextState.word?.category).toBe('animal');
    });
  });

  describe('Round Flow & Return to Round', () => {
    it('preserves remaining seconds when ending round early and restores them on returnToRound', () => {
      let state = createInitialState({ timeLimit: 60 });
      state.phase = 'round';
      state.roundEndTime = 1000 + 45000;

      // Early transition to voting
      state = engine.endRound(state, 45);
      expect(state.phase).toBe('voting');
      expect(state.roundRemainingSeconds).toBe(45);

      // Return back to round via back button
      state = engine.returnToRound(state);
      expect(state.phase).toBe('round');
      expect(state.roundEndTime).toBe(1000 + 45000);
      expect(state.votes).toEqual({});
    });

    it('updates roundEndTime via setRoundEndTime', () => {
      let state = createInitialState({ timeLimit: 60 });
      state.phase = 'round';
      state = engine.setRoundEndTime(state, 75000);
      expect(state.roundEndTime).toBe(75000);
    });
  });

  describe('Voting', () => {
    it('does not allow voting for oneself', () => {
      const state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      expect(() => {
        engine.registerVote(state, 'p1', 'p1');
      }).toThrow('Cannot vote for yourself');
    });

    it('transitions to tiebreak on tie', () => {
      let state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      state.impostorIds = ['p1'];
      
      state = engine.registerVote(state, 'p1', 'p2');
      state = engine.registerVote(state, 'p2', 'p3');
      state = engine.registerVote(state, 'p3', 'p2');
      state = engine.registerVote(state, 'p4', 'p3');
      // p2 gets 2 votes, p3 gets 2 votes. Tie!

      state = engine.finishVoting(state);

      expect(state.phase).toBe('tiebreak');
      expect(state.tiedPlayers).toEqual(['p2', 'p3']);
    });

    it('transitions to impostor_guess if impostor is most voted', () => {
      let state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      state.impostorIds = ['p1']; // Alice is impostor
      
      state = engine.registerVote(state, 'p1', 'p2');
      state = engine.registerVote(state, 'p2', 'p1');
      state = engine.registerVote(state, 'p3', 'p1');
      state = engine.registerVote(state, 'p4', 'p1');
      // p1 gets 3 votes

      state = engine.finishVoting(state);

      expect(state.phase).toBe('impostor_guess');
    });

    it('transitions to result and impostor wins if innocent is eliminated', () => {
      let state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      state.impostorIds = ['p1']; 
      
      state = engine.registerVote(state, 'p1', 'p2');
      state = engine.registerVote(state, 'p2', 'p3');
      state = engine.registerVote(state, 'p3', 'p2');
      state = engine.registerVote(state, 'p4', 'p2');
      // p2 gets 3 votes (innocent)

      state = engine.finishVoting(state);

      expect(state.phase).toBe('result');
      expect(state.winner).toBe('impostor');
    });
  });

  describe('Tiebreak', () => {
    it('impostor wins if tie persists', () => {
      let state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      state.impostorIds = ['p1'];
      state.tiedPlayers = ['p2', 'p3'];
      
      state = engine.registerVote(state, 'p1', 'p2');
      state = engine.registerVote(state, 'p2', 'p3');
      state = engine.registerVote(state, 'p3', 'p2');
      state = engine.registerVote(state, 'p4', 'p3');
      // tie persists

      state = engine.finishTiebreak(state);

      expect(state.phase).toBe('result');
      expect(state.winner).toBe('impostor');
    });
  });

  describe('Impostor Guess', () => {
    it('impostor wins on correct guess, ignoring case and accents', () => {
      let state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      state.word = { id: 'w1', value: 'Maçã', category: 'food', impostorHint: 'fruta', difficulty: 'easy' };
      
      state = engine.impostorGuess(state, 'Maca'); // Normalized should match 'Maçã'
      
      expect(state.phase).toBe('result');
      expect(state.winner).toBe('impostor');
    });

    it('players win on incorrect guess', () => {
      let state = createInitialState({ categoryId: 'all', timeLimit: 60 });
      state.word = { id: 'w1', value: 'Maçã', category: 'food', impostorHint: 'fruta', difficulty: 'easy' };
      
      state = engine.impostorGuess(state, 'Pera'); 
      
      expect(state.phase).toBe('result');
      expect(state.winner).toBe('players');
    });
  });

  describe('Advantages & Rules', () => {
    it('ensures safeStart avoids impostor as first player', () => {
      const state = createInitialState({
        impostorAdvantages: {
          seeCategory: false,
          getHint: true,
          safeStart: true,
        },
      });
      const stateWithPlayers = engine.setPlayers(state, mockPlayers);
      // With identity shuffle, p1 would be impostor AND first player
      const nextState = engine.startGame(stateWithPlayers, mockWords);

      expect(nextState.impostorIds).toEqual(['p1']);
      expect(nextState.playOrder[0]).not.toBe('p1');
    });

    it('handles civilian elimination when civilianAccusedMeansImpostorWins is true', () => {
      let state = createInitialState({
        votingRules: {
          accusationMode: 'one_at_a_time',
          lastChance: true,
          partialGuess: false,
          civilianAccusedMeansImpostorWins: true,
        },
      });
      state.impostorIds = ['p1'];

      state = engine.registerVote(state, 'p1', 'p2');
      state = engine.registerVote(state, 'p2', 'p3');
      state = engine.registerVote(state, 'p3', 'p2');
      state = engine.registerVote(state, 'p4', 'p2');
      // p2 is innocent and got 3 votes

      state = engine.finishVoting(state);

      expect(state.phase).toBe('result');
      expect(state.winner).toBe('impostor');
    });
  });

  describe('Group Voting Mode', () => {
    it('catches single impostor and grants last chance if enabled', () => {
      let state = createInitialState({
        votingRules: {
          accusationMode: 'one_at_a_time',
          lastChance: true,
          partialGuess: false,
          civilianAccusedMeansImpostorWins: false,
        },
      });
      state.impostorIds = ['p1'];

      // Group correctly chooses p1
      state = engine.finishGroupVoting(state, ['p1']);

      expect(state.phase).toBe('impostor_guess');
      expect(state.accusedPlayerIds).toEqual(['p1']);
    });

    it('gives victory directly to players if lastChance is disabled', () => {
      let state = createInitialState({
        votingRules: {
          accusationMode: 'one_at_a_time',
          lastChance: false,
          partialGuess: false,
          civilianAccusedMeansImpostorWins: false,
        },
      });
      state.impostorIds = ['p1'];

      state = engine.finishGroupVoting(state, ['p1']);

      expect(state.phase).toBe('result');
      expect(state.winner).toBe('players');
    });

    it('impostor wins if group accuses an innocent civilian', () => {
      let state = createInitialState();
      state.impostorIds = ['p1'];

      // Group mistakenly accuses p2 (innocent)
      state = engine.finishGroupVoting(state, ['p2']);

      expect(state.phase).toBe('result');
      expect(state.winner).toBe('impostor');
    });

    it('handles multiple impostors in group voting', () => {
      let state = createInitialState({
        votingRules: {
          accusationMode: 'one_at_a_time',
          lastChance: false,
          partialGuess: false,
          civilianAccusedMeansImpostorWins: false,
        },
      });
      state.impostorIds = ['p1', 'p2'];

      // Group correctly accuses both p1 and p2
      const winState = engine.finishGroupVoting(state, ['p1', 'p2']);
      expect(winState.phase).toBe('result');
      expect(winState.winner).toBe('players');

      // Group accuses only 1 of the 2 impostors and misses the other
      const loseState = engine.finishGroupVoting(state, ['p1']);
      expect(loseState.phase).toBe('result');
      expect(loseState.winner).toBe('impostor');
    });
  });
});
