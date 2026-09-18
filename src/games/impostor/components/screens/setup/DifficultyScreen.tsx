import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Sparkles, Zap, Flame } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { SelectionCard } from '@/games/impostor/components/shared/SelectionCard';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

export function DifficultyScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useImpostorStore();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    settings.difficulty || 'easy'
  );

  const handleSelect = (level: 'easy' | 'medium' | 'hard') => {
    hapticsService.triggerSelection();
    setSelectedDifficulty(level);
  };

  const handleConfirm = () => {
    updateSettings({ difficulty: selectedDifficulty });
    router.back();
  };

  const difficultyNames = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
  };

  return (
    <SettingsScreenLayout
      title="Dificuldade"
      subtitle={difficultyNames[selectedDifficulty]}
      confirmButtonText="CONFIRMAR"
      onConfirm={handleConfirm}
    >
      <View style={styles.introBox}>
        <Typography variant="body" color={theme.colors.textSecondary} style={{ fontSize: 14, lineHeight: 20 }}>
          A dificuldade define o quão óbvias são as palavras secretas e o nível de clareza das pistas fornecidas.
        </Typography>
      </View>

      {/* Fácil */}
      <SelectionCard
        title="Fácil"
        description="Palavras comuns e temas do dia a dia. Pistas diretas para ajudar o impostor a se camuflar."
        icon={<Sparkles size={22} color="#10B981" />}
        selected={selectedDifficulty === 'easy'}
        onPress={() => handleSelect('easy')}
        accentColor="#10B981"
      />

      {/* Médio */}
      <SelectionCard
        title="Médio"
        description="Equilíbrio entre palavras populares e específicas. Pistas moderadas exigindo boa leitura do grupo."
        icon={<Zap size={22} color="#F59E0B" />}
        selected={selectedDifficulty === 'medium'}
        onPress={() => handleSelect('medium')}
        accentColor="#F59E0B"
      />

      {/* Difícil */}
      <SelectionCard
        title="Difícil"
        description="Palavras abstratas, conceituais ou raras. Pistas vagas exigindo máxima atenção a cada pista dita."
        icon={<Flame size={22} color="#F43F5E" />}
        selected={selectedDifficulty === 'hard'}
        onPress={() => handleSelect('hard')}
        accentColor="#F43F5E"
      />
    </SettingsScreenLayout>
  );
}

const styles = StyleSheet.create({
  introBox: {
    marginBottom: 20,
    backgroundColor: '#111726',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
});
