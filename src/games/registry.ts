export interface GameModule {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  available: boolean;
}

export const GAME_REGISTRY: GameModule[] = [
  {
    id: 'impostor',
    name: 'Impostor',
    description: 'Descubra quem é o Impostor antes que ele vença!',
    minPlayers: 3,
    maxPlayers: 10,
    available: true,
  },
  {
    id: 'eu_duvido',
    name: 'Eu Duvido',
    description: 'Será que você sabe mentir?',
    minPlayers: 3,
    maxPlayers: 10,
    available: false,
  },
  {
    id: 'quem_e_mais',
    name: 'Quem é Mais?',
    description: 'Vote em quem tem mais chance de...',
    minPlayers: 3,
    maxPlayers: 10,
    available: false,
  }
];
