import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Users, Smartphone } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { SelectionCard } from '@/games/impostor/components/shared/SelectionCard';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

export function VotingModeScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useImpostorStore();
  const [selectedMode, setSelectedMode] = useState<'individual' | 'group'>(
    settings.votingMode || 'group'
  );

  const handleSelect = (mode: 'individual' | 'group') => {
    hapticsService.triggerSelection();
    setSelectedMode(mode);
  };

  const handleConfirm = () => {
    updateSettings({ votingMode: selectedMode });
    router.back();
  };

  return (
    <SettingsScreenLayout
      title="Modo de Votação"
      subtitle={selectedMode === 'group' ? 'Votação em grupo' : 'Votação individual'}
      confirmButtonText="CONFIRMAR"
      onConfirm={handleConfirm}
    >
      <View style={styles.introBox}>
        <Typography variant="body" color={theme.colors.textSecondary} style={{ fontSize: 14, lineHeight: 20 }}>
          Escolha como o grupo prefere tomar a decisão de eliminação do(s) impostor(es) ao término da rodada de pistas.
        </Typography>
      </View>

      {/* Opção 1: Votação em grupo */}
      <SelectionCard
        title="Votação em grupo"
        description="O grupo debate presencialmente e registra o resultado conjunto no celular. Uma única pessoa seleciona os acusados."
        icon={<Users size={22} color="#06B6D4" />}
        selected={selectedMode === 'group'}
        onPress={() => handleSelect('group')}
        accentColor="#06B6D4"
      />

      {/* Opção 2: Votação individual */}
      <SelectionCard
        title="Votação individual"
        description="Cada jogador vota individualmente pelo celular em sigilo, passando o aparelho de mão em mão para contabilização."
        icon={<Smartphone size={22} color="#7C3AED" />}
        selected={selectedMode === 'individual'}
        onPress={() => handleSelect('individual')}
        accentColor="#7C3AED"
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
