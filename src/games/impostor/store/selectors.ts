import { ImpostorStore } from './useImpostorStore';

export const selectCurrentPlayerReveal = (state: ImpostorStore) => {
  if (state.phase !== 'reveal') return null;
  const currentId = state.playOrder[state.revealedCount];
  if (!currentId) return null;
  return state.players.find(p => p.id === currentId) || null;
};

export const selectIsImpostor = (playerId: string) => (state: ImpostorStore) => {
  return state.impostorId === playerId;
};

export const selectGameSettings = (state: ImpostorStore) => state.settings;

export const selectPlayers = (state: ImpostorStore) => state.players;

export const selectRoundEndTime = (state: ImpostorStore) => state.roundEndTime;
