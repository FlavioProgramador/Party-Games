import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@party_games_${key}`, jsonValue);
    } catch (e) {
      console.error('Error saving data', e);
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(`@party_games_${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error reading data', e);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`@party_games_${key}`);
    } catch (e) {
      console.error('Error removing data', e);
    }
  }
};
