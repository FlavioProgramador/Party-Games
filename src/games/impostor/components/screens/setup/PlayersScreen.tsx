import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Plus, X, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { PlayerAvatar } from '@/games/impostor/components/shared/PlayerAvatar';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { Player } from '@/games/impostor/types';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

export function PlayersScreen() {
  const router = useRouter();
  const { players: storedPlayers, setPlayers } = useImpostorStore();

  // Initialize local state with current players or default 4
  const [players, setLocalPlayers] = useState<Player[]>(() => {
    if (storedPlayers.length > 0) return [...storedPlayers];
    return [
      { id: 'p_1', name: 'Jogador 1' },
      { id: 'p_2', name: 'Jogador 2' },
      { id: 'p_3', name: 'Jogador 3' },
      { id: 'p_4', name: 'Jogador 4' },
    ];
  });

  const lastInputRef = useRef<TextInput | null>(null);

  const handleNameChange = (id: string, newName: string) => {
    setLocalPlayers(prev =>
      prev.map(p => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  const handleAddPlayer = () => {
    hapticsService.triggerSelection();
    const newId = `player_${Date.now()}`;
    const nextNumber = players.length + 1;
    setLocalPlayers(prev => [
      ...prev,
      { id: newId, name: `Jogador ${nextNumber}` },
    ]);
  };

  const handleRemovePlayer = (id: string) => {
    if (players.length <= 3) return;
    hapticsService.triggerImpact();
    setLocalPlayers(prev => prev.filter(p => p.id !== id));
  };

  const handleConfirm = () => {
    // Clean up empty names
    const cleaned = players.map((p, idx) => ({
      ...p,
      name: p.name.trim() || `Jogador ${idx + 1}`,
    }));
    setPlayers(cleaned);
    router.back();
  };

  const isValid = players.length >= 3;

  return (
    <SettingsScreenLayout
      title="Jogadores"
      subtitle={`${players.length} participantes`}
      confirmButtonText="CONFIRMAR"
      onConfirm={handleConfirm}
      confirmDisabled={!isValid}
    >
      <View style={styles.introBox}>
        <Typography variant="body" color={theme.colors.textSecondary} style={{ fontSize: 14, lineHeight: 20 }}>
          Defina quem vai jogar nesta partida. O jogo precisa de pelo menos 3 participantes.
        </Typography>
      </View>

      {/* Players List */}
      <View style={styles.list}>
        {players.map((player, index) => {
          const canDelete = players.length > 3;
          return (
            <View key={player.id} style={styles.playerRow}>
              <PlayerAvatar name={player.name || `J${index + 1}`} id={player.id} size={42} />

              <TextInput
                ref={index === players.length - 1 ? lastInputRef : undefined}
                style={styles.input}
                value={player.name}
                onChangeText={text => handleNameChange(player.id, text)}
                placeholder={`Jogador ${index + 1}`}
                placeholderTextColor={theme.colors.textMuted}
                maxLength={20}
                autoCorrect={false}
              />

              {canDelete ? (
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleRemovePlayer(player.id)}
                  hitSlop={8}
                >
                  <X size={18} color={theme.colors.textSecondary} />
                </Pressable>
              ) : (
                <View style={styles.deletePlaceholder} />
              )}
            </View>
          );
        })}
      </View>

      {/* Add Player Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPlayer}
        activeOpacity={0.7}
      >
        <Plus size={20} color={theme.colors.primary} />
        <Typography bold style={{ color: theme.colors.primary, marginLeft: 8, fontSize: 15 }}>
          Adicionar jogador
        </Typography>
      </TouchableOpacity>

      {!isValid && (
        <View style={styles.errorNotice}>
          <AlertCircle size={18} color={theme.colors.danger} />
          <Typography variant="caption" color={theme.colors.danger} style={{ marginLeft: 6 }}>
            Adicione pelo menos 3 jogadores para continuar.
          </Typography>
        </View>
      )}
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
  list: {
    marginBottom: 16,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121827',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 44,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginLeft: 12,
    marginRight: 8,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A2338',
  },
  deletePlaceholder: {
    width: 36,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(124, 58, 237, 0.4)',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(124, 58, 237, 0.06)',
    marginTop: 4,
    marginBottom: 20,
  },
  errorNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
});
