import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Word } from '../types';

export interface CustomWordInput {
  value: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  impostorHint: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateCustomWord(input: CustomWordInput): ValidationResult {
  const trimmedValue = input.value.trim();
  const trimmedHint = input.impostorHint.trim();

  if (!trimmedValue) {
    return { valid: false, error: 'A palavra secreta é obrigatória.' };
  }

  if (trimmedValue.length < 2) {
    return { valid: false, error: 'A palavra secreta deve ter no mínimo 2 letras.' };
  }

  if (!trimmedHint) {
    return { valid: false, error: 'A dica do impostor é obrigatória.' };
  }

  // Regra obrigatória: A dica do impostor deve ser SOMENTE UMA PALAVRA (sem espaços)
  if (/\s/.test(trimmedHint)) {
    return {
      valid: false,
      error: 'A dica do impostor deve ser SOMENTE UMA PALAVRA (sem frases ou espaços).',
    };
  }

  if (trimmedHint.toLowerCase() === trimmedValue.toLowerCase()) {
    return {
      valid: false,
      error: 'A dica não pode ser igual à própria palavra secreta.',
    };
  }

  return { valid: true };
}

interface CustomWordsState {
  customWords: Word[];
  addCustomWord: (input: CustomWordInput) => ValidationResult;
  removeCustomWord: (id: string) => void;
  clearCustomWords: () => void;
}

export const useCustomWordsStore = create<CustomWordsState>()(
  persist(
    (set, get) => ({
      customWords: [],

      addCustomWord: (input: CustomWordInput): ValidationResult => {
        const validation = validateCustomWord(input);
        if (!validation.valid) {
          return validation;
        }

        const newWord: Word = {
          id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          value: input.value.trim(),
          category: input.category || 'personalizadas',
          difficulty: input.difficulty || 'easy',
          impostorHint: input.impostorHint.trim(),
        };

        set({ customWords: [newWord, ...get().customWords] });
        return { valid: true };
      },

      removeCustomWord: (id: string) => {
        set({ customWords: get().customWords.filter(w => w.id !== id) });
      },

      clearCustomWords: () => {
        set({ customWords: [] });
      },
    }),
    {
      name: 'impostor-custom-words',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
