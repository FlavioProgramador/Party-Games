export interface GameModule {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  available: boolean;
  category?: string;
  duration?: string;
  image?: any;
}

export const GAME_REGISTRY: GameModule[] = [
  {
    id: 'impostor',
    name: 'Impostor',
    description: 'Descubra quem é o Impostor antes que ele vença!',
    minPlayers: 3,
    maxPlayers: 10,
    available: true,
    category: 'Dedução Social',
    duration: '~10 min',
    image: require('../../assets/images/impostor-bg.jpg'),
  },
  {
    id: 'eu_duvido',
    name: 'Eu Duvido',
    description: 'Será que você sabe mentir?',
    minPlayers: 3,
    maxPlayers: 10,
    available: false,
    category: 'Blefe',
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
