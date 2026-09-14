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

      expect(nextState.phase).toBe('reveal');
      expect(nextState.impostorId).toBe('p1'); // Because mock randomItem returns first element
      expect(nextState.playOrder).toEqual(['p1', 'p2', 'p3', 'p4']);
      expect(nextState.word).toEqual(mockWords[0]);
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
      state.impostorId = 'p1';
      
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
      state.impostorId = 'p1'; // Alice is impostor
      
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
      state.impostorId = 'p1'; 
      
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
      state.impostorId = 'p1';
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
});
