import { Audio } from 'expo-av';

export type SoundEffect = 'click' | 'success' | 'fail' | 'tick' | 'alarm';

class AudioService {
  private sounds: Record<string, Audio.Sound> = {};

  async preload() {
    // Implementação mock para evitar erros se os arquivos reais não existirem no assets/
    // Em um cenário real, carregaríamos require('../../../assets/sounds/click.mp3')
    console.log('AudioService: preload called');
  }

  async playSound(effect: SoundEffect) {
    console.log(`AudioService: playing sound [${effect}]`);
    // Aqui tocaria o som real, ex:
    // if (this.sounds[effect]) {
    //   await this.sounds[effect].replayAsync();
    // }
  }
}

export const audioService = new AudioService();
