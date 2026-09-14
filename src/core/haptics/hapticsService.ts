import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

class HapticsService {
  async triggerSelection() {
    if (Platform.OS !== 'web') {
      await Haptics.selectionAsync();
    }
  }

  async triggerSuccess() {
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }

  async triggerError() {
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  async triggerWarning() {
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }

  async triggerImpact(style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium) {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(style);
    }
  }
}

export const hapticsService = new HapticsService();
