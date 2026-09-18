import { WORD_BANK, CATEGORIES } from '../../data/wordBank';
import { validateCustomWord, useCustomWordsStore } from '../../store/useCustomWordsStore';
import { createEngine, EngineDependencies } from '../gameEngine';
import { createInitialState } from '../gameState';
import { Player, Word } from '../../types';

describe('Word Bank Expansion & Custom Words Integrity', () => {
  let mockDeps: EngineDependencies;
  let engine: ReturnType<typeof createEngine>;

  const mockPlayers: Player[] = [
    { id: 'p1', name: 'Alice' },
    { id: 'p2', name: 'Bob' },
    { id: 'p3', name: 'Charlie' },
  ];

  beforeEach(() => {
    mockDeps = {
      randomItem: jest.fn((arr: any[]) => arr[0]),
      shuffleArray: jest.fn((arr: any[]) => [...arr]),
      now: jest.fn(() => 1000),
    };
    engine = createEngine(mockDeps);
    useCustomWordsStore.getState().clearCustomWords();
  });

  describe('1. Regras Globais do Banco de Palavras Oficial', () => {
    it('garante que todas as palavras do WORD_BANK possuem dica de SOMENTE UMA PALAVRA', () => {
      const violations: string[] = [];

      WORD_BANK.forEach(w => {
        const hint = w.impostorHint?.trim();
        if (!hint) {
          violations.push(`Palavra "${w.value}" (${w.id}) possui dica vazia`);
        } else if (/\s/.test(hint)) {
          violations.push(`Palavra "${w.value}" (${w.id}) possui dica com múltiplos termos: "${hint}"`);
        }
      });

      expect(violations).toEqual([]);
    });

    it('garante que nenhuma dica é idêntica ao nome da própria categoria', () => {
      const violations: string[] = [];

      WORD_BANK.forEach(w => {
        if (w.impostorHint.toLowerCase() === w.category.toLowerCase()) {
          violations.push(`Palavra "${w.value}" tem dica igual à categoria: "${w.impostorHint}"`);
        }
      });

      expect(violations).toEqual([]);
    });

    it('garante que não existem categorias duplicadas no CATEGORIES', () => {
      const ids = CATEGORIES.map(c => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('garante a presença das novas categorias solicitadas', () => {
      const categoryIds = CATEGORIES.map(c => c.id);
      expect(categoryIds).toContain('memes_brasileiros');
      expect(categoryIds).toContain('cultura_brasileira');
      expect(categoryIds).toContain('personagens');
      expect(categoryIds).toContain('marcas');
      expect(categoryIds).toContain('tecnologia');
      expect(categoryIds).toContain('personalizadas');
    });

    it('garante palavras em fácil, médio e difícil para as novas categorias', () => {
      const newCats = ['memes_brasileiros', 'cultura_brasileira', 'personagens', 'marcas', 'tecnologia'];

      newCats.forEach(cat => {
        const wordsInCat = WORD_BANK.filter(w => w.category === cat);
        expect(wordsInCat.length).toBeGreaterThanOrEqual(25);

        const easy = wordsInCat.filter(w => w.difficulty === 'easy');
        const medium = wordsInCat.filter(w => w.difficulty === 'medium');
        const hard = wordsInCat.filter(w => w.difficulty === 'hard');

        expect(easy.length).toBeGreaterThanOrEqual(10);
        expect(medium.length).toBeGreaterThanOrEqual(10);
        expect(hard.length).toBeGreaterThanOrEqual(5);
      });
    });
  });

  describe('2. Validação Estrita de Palavras Personalizadas', () => {
    it('rejeita palavra vazia', () => {
      const res = validateCustomWord({
        value: '   ',
        category: 'personalizadas',
        difficulty: 'easy',
        impostorHint: 'Dica',
      });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('A palavra secreta é obrigatória.');
    });

    it('rejeita dica vazia', () => {
      const res = validateCustomWord({
        value: 'Feijoada',
        category: 'comidas',
        difficulty: 'easy',
        impostorHint: '   ',
      });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('A dica do impostor é obrigatória.');
    });

    it('rejeita dica com múltiplas palavras ou frases (com espaços)', () => {
      const res = validateCustomWord({
        value: 'Cachorro Quente',
        category: 'comidas',
        difficulty: 'easy',
        impostorHint: 'comida de festa',
      });
      expect(res.valid).toBe(false);
      expect(res.error).toContain('SOMENTE UMA PALAVRA');
    });

    it('rejeita dica idêntica à palavra', () => {
      const res = validateCustomWord({
        value: 'Pizza',
        category: 'comidas',
        difficulty: 'easy',
        impostorHint: 'pizza',
      });
      expect(res.valid).toBe(false);
      expect(res.error).toContain('não pode ser igual');
    });

    it('aceita palavra válida com dica de palavra única', () => {
      const res = validateCustomWord({
        value: 'Boi-Bumbá',
        category: 'cultura_brasileira',
        difficulty: 'medium',
        impostorHint: 'Festival',
      });
      expect(res.valid).toBe(true);
      expect(res.error).toBeUndefined();
    });
  });

  describe('3. Store e Armazenamento de Palavras Personalizadas', () => {
    it('adiciona palavra personalizada e remove com sucesso', () => {
      const store = useCustomWordsStore.getState();

      const addRes = store.addCustomWord({
        value: 'Manoel Gomes',
        category: 'memes_brasileiros',
        difficulty: 'easy',
        impostorHint: 'Caneta',
      });

      expect(addRes.valid).toBe(true);
      expect(useCustomWordsStore.getState().customWords).toHaveLength(1);

      const added = useCustomWordsStore.getState().customWords[0];
      expect(added.value).toBe('Manoel Gomes');
      expect(added.impostorHint).toBe('Caneta');
      expect(added.category).toBe('memes_brasileiros');
      expect(added.id).toMatch(/^custom_/);

      // Remover palavra
      useCustomWordsStore.getState().removeCustomWord(added.id);
      expect(useCustomWordsStore.getState().customWords).toHaveLength(0);
    });
  });

  describe('4. Seleção por Categoria e Dificuldade com Palavras Personalizadas', () => {
    it('filtra palavra sorteada respeitando a dificuldade configurada', () => {
      const state = createInitialState({ difficulty: 'hard' });
      const stateWithPlayers = engine.setPlayers(state, mockPlayers);

      const nextState = engine.startGame(stateWithPlayers, WORD_BANK);

      expect(nextState.word?.difficulty).toBe('hard');
    });

    it('integra palavra personalizada no sorteio da partida', () => {
      const customWord: Word = {
        id: 'custom_123',
        value: 'Torta de Limão',
        category: 'personalizadas',
        difficulty: 'easy',
        impostorHint: 'Azedo',
      };

      const state = createInitialState({
        categoryIds: ['personalizadas'],
        difficulty: 'easy',
      });
      const stateWithPlayers = engine.setPlayers(state, mockPlayers);

      const pool = [...WORD_BANK, customWord];
      const nextState = engine.startGame(stateWithPlayers, pool);

      expect(nextState.word).toEqual(customWord);
      expect(nextState.word?.value).toBe('Torta de Limão');
      expect(nextState.word?.impostorHint).toBe('Azedo');
    });
  });
});
