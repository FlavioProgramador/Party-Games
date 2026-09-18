import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UserCheck, Users, Shuffle, Minus, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { SelectionCard } from '@/games/impostor/components/shared/SelectionCard';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { ImpostorCountConfig } from '@/games/impostor/types';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

export function ImpostorsScreen() {
  const router = useRouter();
  const { settings, players, updateSettings } = useImpostorStore();

  const currentConfig = settings.impostorCount || {
    mode: 'fixed',
    fixedValue: 1,
    randomRange: { min: 1, max: 2 },
  };

  const [mode, setMode] = useState<'fixed' | 'random'>(currentConfig.mode);
  const [fixedValue, setFixedValue] = useState<number>(currentConfig.fixedValue || 1);
  const [randomMin, setRandomMin] = useState<number>(currentConfig.randomRange?.min || 1);
  const [randomMax, setRandomMax] = useState<number>(currentConfig.randomRange?.max || 2);

  const playerCount = players.length > 0 ? players.length : 4;
  const canHaveTwoImpostors = playerCount >= 7;

  const handleSelectOne = () => {
    hapticsService.triggerSelection();
    setMode('fixed');
    setFixedValue(1);
  };

  const handleSelectTwo = () => {
    if (!canHaveTwoImpostors) return;
    hapticsService.triggerSelection();
    setMode('fixed');
    setFixedValue(2);
  };

  const handleSelectRandom = () => {
    hapticsService.triggerSelection();
    setMode('random');
  };

  const handleConfirm = () => {
    const newConfig: ImpostorCountConfig = {
      mode,
      fixedValue,
      randomRange: {
        min: randomMin,
        max: Math.max(randomMin, randomMax),
      },
    };
    updateSettings({ impostorCount: newConfig });
    router.back();
  };

  return (
    <SettingsScreenLayout
      title="Nº de Impostores"
      subtitle={mode === 'random' ? `Aleatório (${randomMin}-${randomMax})` : `${fixedValue} impostor${fixedValue > 1 ? 'es' : ''}`}
      confirmButtonText="CONFIRMAR"
      onConfirm={handleConfirm}
    >
      <View style={styles.introBox}>
        <Typography variant="body" color={theme.colors.textSecondary} style={{ fontSize: 14, lineHeight: 20 }}>
          Escolha quantos jogadores serão infiltrados como impostores nesta partida.
        </Typography>
      </View>

      {/* Option 1: 1 Impostor */}
      <SelectionCard
        title="1 Impostor"
        description="Um único jogador tenta enganar todo o grupo sem ser descoberto."
        icon={<UserCheck size={22} color="#7C3AED" />}
        selected={mode === 'fixed' && fixedValue === 1}
        onPress={handleSelectOne}
        accentColor="#7C3AED"
      />

      {/* Option 2: 2 Impostores */}
      <SelectionCard
        title="2 Impostores"
        description="Dois infiltrados jogam em conjunto para criar confusão."
        icon={<Users size={22} color="#06B6D4" />}
        selected={mode === 'fixed' && fixedValue === 2}
        onPress={handleSelectTwo}
        disabled={!canHaveTwoImpostors}
        disabledReason={`Requer no mínimo 7 jogadores (atualmente: ${playerCount}).`}
        accentColor="#06B6D4"
      />

      {/* Option 3: Aleatório */}
      <SelectionCard
        title="Aleatório"
        description="O número de impostores varia a cada partida para mais mistério."
        icon={<Shuffle size={22} color="#F59E0B" />}
        selected={mode === 'random'}
        onPress={handleSelectRandom}
        accentColor="#F59E0B"
      >
        <View style={styles.rangeContainer}>
          <Typography variant="body" bold style={{ color: '#FFFFFF', marginBottom: 12 }}>
            Intervalo de impostores
          </Typography>

          <View style={styles.rangeControlsRow}>
            {/* Min control */}
            <View style={styles.rangeCol}>
              <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: 6 }}>
                MÍNIMO
              </Typography>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  style={[styles.counterBtn, randomMin <= 1 && styles.counterBtnDisabled]}
                  onPress={() => {
                    if (randomMin > 1) {
                      hapticsService.triggerSelection();
                      setRandomMin(randomMin - 1);
                    }
                  }}
                  disabled={randomMin <= 1}
                >
                  <Minus size={16} color={randomMin <= 1 ? theme.colors.textMuted : '#FFFFFF'} />
                </TouchableOpacity>
                <Typography bold style={styles.counterVal}>{randomMin}</Typography>
                <TouchableOpacity
                  style={[styles.counterBtn, randomMin >= randomMax && styles.counterBtnDisabled]}
                  onPress={() => {
                    if (randomMin < randomMax) {
                      hapticsService.triggerSelection();
                      setRandomMin(randomMin + 1);
                    }
                  }}
                  disabled={randomMin >= randomMax}
                >
                  <Plus size={16} color={randomMin >= randomMax ? theme.colors.textMuted : '#FFFFFF'} />
                </TouchableOpacity>
              </View>
            </View>

            <Typography bold color={theme.colors.textMuted} style={{ marginHorizontal: 12 }}>
              até
            </Typography>

            {/* Max control */}
            <View style={styles.rangeCol}>
              <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: 6 }}>
                MÁXIMO
              </Typography>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  style={[styles.counterBtn, randomMax <= randomMin && styles.counterBtnDisabled]}
                  onPress={() => {
                    if (randomMax > randomMin) {
                      hapticsService.triggerSelection();
                      setRandomMax(randomMax - 1);
                    }
                  }}
                  disabled={randomMax <= randomMin}
                >
                  <Minus size={16} color={randomMax <= randomMin ? theme.colors.textMuted : '#FFFFFF'} />
                </TouchableOpacity>
                <Typography bold style={styles.counterVal}>{randomMax}</Typography>
                <TouchableOpacity
                  style={[styles.counterBtn, (randomMax >= (canHaveTwoImpostors ? 3 : 2)) && styles.counterBtnDisabled]}
                  onPress={() => {
                    const ceiling = canHaveTwoImpostors ? 3 : 2;
                    if (randomMax < ceiling) {
                      hapticsService.triggerSelection();
                      setRandomMax(randomMax + 1);
                    }
                  }}
                  disabled={randomMax >= (canHaveTwoImpostors ? 3 : 2)}
                >
                  <Plus size={16} color={randomMax >= (canHaveTwoImpostors ? 3 : 2) ? theme.colors.textMuted : '#FFFFFF'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SelectionCard>
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
  rangeContainer: {
    backgroundColor: '#0F1523',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1C263A',
  },
  rangeControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rangeCol: {
    flex: 1,
    alignItems: 'center',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#182133',
    borderRadius: 10,
    padding: 4,
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#222E46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnDisabled: {
    backgroundColor: 'transparent',
  },
  counterVal: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingHorizontal: 12,
  },
});
