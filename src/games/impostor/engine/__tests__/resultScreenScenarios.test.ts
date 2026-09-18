import { createEngine, EngineDependencies } from '../gameEngine';
import { createInitialState, ImpostorGameState } from '../gameState';
import { Player, Word } from '../../types';
import { CATEGORIES } from '../../data/wordBank';

describe('Result Screen Scenarios & State Integrity', () => {
  let mockDeps: EngineDependencies;
  let engine: ReturnType<typeof createEngine>;

  const players: Player[] = [
    { id: 'p1', name: 'Ana' },
    { id: 'p2', name: 'Bruno' },
    { id: 'p3', name: 'Carlos' },
    { id: 'p4', name: 'Daniela' },
    { id: 'p5', name: 'Eduardo' },
    { id: 'p6', name: 'Fernanda' },
  ];

  const word: Word = {
    id: 'animais_easy_1',
    value: 'Cachorro',
    category: 'animais',
    difficulty: 'easy',
    impostorHint: 'Companhia',
  };

  beforeEach(() => {
    mockDeps = {
      randomItem: jest.fn((arr: any[]) => arr[0]),
      shuffleArray: jest.fn((arr: any[]) => [...arr]),
      now: jest.fn(() => 1000),
    };
    engine = createEngine(mockDeps);
  });

  it('correctly models Civilians Victory state', () => {
    let state = createInitialState({ timeLimit: 60 });
    state = engine.setPlayers(state, players);
    state = engine.startGame(state, [word]);

    // Impostor is p1
    expect(state.impostorIds).toEqual(['p1']);

    // Group accuses the impostor p1
    state = engine.finishGroupVoting(state, ['p1']);

    // With lastChance enabled, phase is impostor_guess
    expect(state.phase).toBe('impostor_guess');

    // Impostor fails guess
    state = engine.impostorGuess(state, 'Gato');

    expect(state.phase).toBe('result');
    expect(state.winner).toBe('players');
    expect(state.impostorGuess).toBe('Gato');

    // Verify Result Screen computed data
    const impostors = state.players.filter(p => state.impostorIds.includes(p.id));
    expect(impostors).toHaveLength(1);
    expect(impostors[0].name).toBe('Ana');

    const impostorWon = state.winner === 'impostor';
    expect(impostorWon).toBe(false);

    const categoryName = CATEGORIES.find(c => c.id === state.word?.category)?.name;
    expect(categoryName).toBe('Animais');
  });

  it('correctly models Impostor Victory state via correct guess', () => {
    let state = createInitialState({ timeLimit: 60 });
    state = engine.setPlayers(state, players);
    state = engine.startGame(state, [word]);

    state = engine.finishGroupVoting(state, ['p1']);
    // Impostor guesses the word correctly
    state = engine.impostorGuess(state, 'Cachorro');

    expect(state.phase).toBe('result');
    expect(state.winner).toBe('impostor');
    expect(state.impostorGuess).toBe('Cachorro');

    const impostorWon = state.winner === 'impostor';
    expect(impostorWon).toBe(true);
  });

  it('correctly models Impostor Victory state when innocent is eliminated', () => {
    let state = createInitialState({
      votingRules: {
        accusationMode: 'one_at_a_time',
        lastChance: true,
        partialGuess: false,
        civilianAccusedMeansImpostorWins: true,
      },
    });
    state = engine.setPlayers(state, players);
    state = engine.startGame(state, [word]);

    // Accuse civilian p2
    state = engine.finishGroupVoting(state, ['p2']);

    expect(state.phase).toBe('result');
    expect(state.winner).toBe('impostor');
    expect(state.impostorGuess).toBeNull();
  });

  it('handles multiple impostors scenario', () => {
    let state = createInitialState({
      impostorCount: { mode: 'fixed', fixedValue: 2, randomRange: { min: 2, max: 2 } },
    });
    state = engine.setPlayers(state, players);
    state = engine.startGame(state, [word]);

    expect(state.impostorIds).toHaveLength(2);
    expect(state.impostorIds).toEqual(['p1', 'p2']);

    const impostors = state.players.filter(p => state.impostorIds.includes(p.id));
    expect(impostors).toHaveLength(2);
    expect(impostors.map(p => p.name)).toEqual(['Ana', 'Bruno']);
  });

  it('handles large number of players without data corruption', () => {
    const manyPlayers: Player[] = Array.from({ length: 14 }, (_, i) => ({
      id: `p${i + 1}`,
      name: `Jogador ${i + 1}`,
    }));

    let state = createInitialState({
      impostorCount: { mode: 'fixed', fixedValue: 3, randomRange: { min: 3, max: 3 } },
      timeLimit: 120,
    });
    state = engine.setPlayers(state, manyPlayers);
    state = engine.startGame(state, [word]);

    expect(state.players).toHaveLength(14);
    expect(state.impostorIds).toHaveLength(3);

    const civilianCount = state.players.length - state.impostorIds.length;
    expect(civilianCount).toBe(11);
  });

  it('preserves playAgain and resetToMenu transitions', () => {
    let state = createInitialState();
    state = engine.setPlayers(state, players);
    state = engine.startGame(state, [word]);
    state = engine.finishGroupVoting(state, ['p1']);
    state = engine.impostorGuess(state, 'Cachorro');

    expect(state.phase).toBe('result');

    // playAgain returns to setup with same players preserved
    const replayState = engine.playAgain(state);
    expect(replayState.phase).toBe('setup');
    expect(replayState.players).toHaveLength(players.length);
    expect(replayState.winner).toBeNull();
    expect(replayState.impostorGuess).toBeNull();

    // resetToMenu resets state to setup
    const menuState = createInitialState(state.settings);
    expect(menuState.phase).toBe('setup');
    expect(menuState.players).toEqual([]);
  });
});
