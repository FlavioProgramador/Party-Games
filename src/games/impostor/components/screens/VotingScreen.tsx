import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, X, ShieldAlert, Check, Vote, Users } from 'lucide-react-native';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { PlayerAvatar } from '../shared/PlayerAvatar';
import { theme } from '@/theme';
import { useImpostorStore } from '../../store/useImpostorStore';
import { hapticsService } from '@/core/haptics/hapticsService';

export function VotingScreen() {
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();
  const isGroupMode = store.settings.votingMode === 'group';

  // ─────────────────────────────────────────────────────────────
  // MODO 1: VOTAÇÃO EM GRUPO (DECISÃO COLETIVA)
  // ─────────────────────────────────────────────────────────────
  if (isGroupMode) {
    return <GroupVotingScreen />;
  }

  // ─────────────────────────────────────────────────────────────
  // MODO 2: VOTAÇÃO INDIVIDUAL (PASSA O CELULAR)
  // ─────────────────────────────────────────────────────────────
  return <IndividualVotingScreen />;
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE DE VOTAÇÃO EM GRUPO
// ═══════════════════════════════════════════════════════════════
function GroupVotingScreen() {
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Maximum impostors that can be selected (based on actual impostor count in match)
  const maxImpostors = Math.max(1, store.impostorIds.length);

  const handleTogglePlayer = (playerId: string) => {
    hapticsService.triggerSelection();
    if (selectedIds.includes(playerId)) {
      setSelectedIds(prev => prev.filter(id => id !== playerId));
    } else {
      if (selectedIds.length >= maxImpostors) {
        if (maxImpostors === 1) {
          // If only 1 impostor, replace with new selection directly
          setSelectedIds([playerId]);
        } else {
          // If multiple allowed, replace the first one
          setSelectedIds(prev => [...prev.slice(1), playerId]);
        }
      } else {
        setSelectedIds(prev => [...prev, playerId]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedIds.length === 0) return;
    hapticsService.triggerImpact();
    store.finishGroupVoting(selectedIds);
  };

  return (
    <View style={styles.container}>
      {/* ─── HEADER COM BOTÕES CIRCULARES E ÍCONE CENTRAL ─── */}
      <View style={[styles.groupHeader, { paddingTop: Math.max(insets.top + 10, 22) }]}>
        <TouchableOpacity
          style={styles.circularHeaderBtn}
          onPress={() => store.resetToMenu()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft color="#FFFFFF" size={22} />
        </TouchableOpacity>

        <View style={styles.centerBadgeIcon}>
          <Vote size={20} color="#F43F5E" />
        </View>

        <TouchableOpacity
          style={styles.circularHeaderBtn}
          onPress={() => store.resetToMenu()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>
      </View>

      {/* ─── TÍTULO E SUBTÍTULO ─── */}
      <View style={styles.groupTitleContainer}>
        <Typography variant="h1" bold style={styles.groupMainTitle}>
          VOTAÇÃO
        </Typography>
        <Typography
          variant="body"
          color={theme.colors.textSecondary}
          style={styles.groupMainSubtitle}
        >
          Quem o grupo decidiu que são os impostores?
        </Typography>

        {maxImpostors > 1 && (
          <View style={styles.groupHintBadge}>
            <Users size={13} color="#F43F5E" style={{ marginRight: 6 }} />
            <Typography variant="caption" bold style={{ color: '#F43F5E', fontSize: 12 }}>
              Selecione até {maxImpostors} suspeitos ({selectedIds.length}/{maxImpostors})
            </Typography>
          </View>
        )}
      </View>

      {/* ─── GRADE DE 2 COLUNAS DE JOGADORES ─── */}
      <ScrollView
        contentContainerStyle={[
          styles.groupScrollContent,
          {
            paddingBottom: Math.max(insets.bottom + 110, 130),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.groupGrid}>
          {store.players.map((player, index) => {
            const isSelected = selectedIds.includes(player.id);
            const playerTag = `J${index + 1}`;

            return (
              <Pressable
                key={player.id}
                style={[
                  styles.groupCard,
                  isSelected && styles.groupCardSelected,
                ]}
                onPress={() => handleTogglePlayer(player.id)}
              >
                {/* Indicador de Check no canto superior direito */}
                <View style={styles.groupCardHeader}>
                  <View
                    style={[
                      styles.checkIndicator,
                      isSelected && styles.checkIndicatorActive,
                    ]}
                  >
                    {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                </View>

                {/* Avatar Circular com Tag J1, J2 etc */}
                <View
                  style={[
                    styles.groupAvatarCircle,
                    isSelected && styles.groupAvatarCircleSelected,
                  ]}
                >
                  <Typography
                    bold
                    style={[
                      styles.groupAvatarText,
                      isSelected && styles.groupAvatarTextSelected,
                    ]}
                  >
                    {playerTag}
                  </Typography>
                </View>

                {/* Nome do Jogador */}
                <Typography
                  bold
                  style={[
                    styles.groupPlayerName,
                    isSelected && styles.groupPlayerNameSelected,
                  ]}
                  numberOfLines={1}
                >
                  {player.name}
                </Typography>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* ─── RODAPÉ FIXO COM BOTÃO CONFIRMAR VOTAÇÃO ─── */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: Math.max(insets.bottom + 16, 24),
          },
        ]}
      >
        <Button
          title="CONFIRMAR VOTAÇÃO"
          variant="danger"
          disabled={selectedIds.length === 0}
          onPress={handleConfirm}
        />
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE DE VOTAÇÃO INDIVIDUAL (PASSA O CELULAR)
// ═══════════════════════════════════════════════════════════════
function IndividualVotingScreen() {
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<'pass' | 'vote'>('pass');
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  // Find the current voter who hasn't voted yet
  const currentVoterId = store.playOrder.find(id => !store.votes[id]);
  const currentVoter = store.players.find(p => p.id === currentVoterId);

  const totalPlayers = store.players.length;
  const votesCast = Object.keys(store.votes).length;

  useEffect(() => {
    setStep('pass');
    setSelectedVote(null);
  }, [currentVoterId]);

  // If everyone has voted, finish voting
  useEffect(() => {
    if (!currentVoterId && votesCast === totalPlayers && totalPlayers > 0) {
      store.finishVoting();
    }
  }, [currentVoterId, store.votes, totalPlayers, votesCast]);

  if (!currentVoter) return <View style={styles.container} />;

  // ─── PASSO 1: ENTREGAR O CELULAR ───
  if (step === 'pass') {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <View style={styles.passBox}>
          <View style={styles.badgePass}>
            <Typography variant="caption" bold style={{ color: '#F59E0B', letterSpacing: 1.5 }}>
              VOTAÇÃO INDIVIDUAL ({votesCast + 1}/{totalPlayers})
            </Typography>
          </View>

          <Typography variant="h3" bold style={styles.passTitle}>
            Passe o aparelho para
          </Typography>

          <View style={styles.voterAvatarWrapper}>
            <PlayerAvatar name={currentVoter.name} id={currentVoter.id} size={88} />
            <Typography variant="h2" bold style={styles.voterName}>
              {currentVoter.name}
            </Typography>
          </View>

          <Typography
            variant="body"
            color={theme.colors.textSecondary}
            style={{ textAlign: 'center', marginBottom: 32, lineHeight: 22 }}
          >
            Apenas você deve ver esta tela. Vote em sigilo sem que os outros saibam a sua escolha!
          </Typography>

          <Button
            title="SOU EU, VOTAR AGORA"
            onPress={() => {
              hapticsService.triggerSelection();
              setStep('vote');
            }}
          />
        </View>
      </View>
    );
  }

  // ─── PASSO 2: SELEÇÃO INDIVIDUAL ───
  const handleConfirmVote = () => {
    if (selectedVote) {
      hapticsService.triggerImpact();
      store.registerVote(currentVoter.id, selectedVote);
    }
  };

  const eligibleTargets = store.players.filter(p => p.id !== currentVoter.id);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 20) }]}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => setStep('pass')}
          activeOpacity={0.7}
        >
          <ChevronLeft color={theme.colors.text} size={22} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 16 }} numberOfLines={1}>
            Voto de {currentVoter.name}
          </Typography>
          <Typography variant="caption" color={theme.colors.textSecondary}>
            {votesCast} de {totalPlayers} já votaram
          </Typography>
        </View>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => store.resetToMenu()}
          activeOpacity={0.7}
        >
          <X color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom + 110, 130),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.instructionBanner}>
          <ShieldAlert size={20} color="#F43F5E" style={{ marginRight: 10 }} />
          <Typography variant="body" color={theme.colors.textSecondary} style={{ flex: 1, fontSize: 13, lineHeight: 18 }}>
            Selecione quem você acredita ser o infiltrado.
          </Typography>
        </View>

        <View style={styles.gridContainer}>
          {eligibleTargets.map(player => {
            const isSelected = selectedVote === player.id;
            return (
              <Pressable
                key={player.id}
                style={[
                  styles.candidateCard,
                  isSelected && styles.candidateCardSelected,
                ]}
                onPress={() => {
                  hapticsService.triggerSelection();
                  setSelectedVote(player.id);
                }}
              >
                <View style={styles.cardHeaderIndicator}>
                  <View
                    style={[
                      styles.selectionIndicator,
                      isSelected && styles.selectionIndicatorActive,
                    ]}
                  >
                    {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                </View>

                <PlayerAvatar
                  name={player.name}
                  id={player.id}
                  size={56}
                  isSelected={isSelected}
                  selectedBorderColor="#F43F5E"
                />

                <Typography
                  bold
                  style={[
                    styles.candidateName,
                    isSelected && { color: '#FFFFFF' },
                  ]}
                  numberOfLines={1}
                >
                  {player.name}
                </Typography>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: Math.max(insets.bottom + 16, 24),
          },
        ]}
      >
        <Button
          title="CONFIRMAR MEU VOTO"
          variant="danger"
          disabled={!selectedVote}
          onPress={handleConfirmVote}
        />
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
// ESTILOS
// ═══════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },

  // ─── ESTILOS DA VOTAÇÃO EM GRUPO ───
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  circularHeaderBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#141C2E',
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBadgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupTitleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  groupMainTitle: {
    fontSize: 26,
    color: '#FFFFFF',
    letterSpacing: 2,
    textAlign: 'center',
  },
  groupMainSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  groupHintBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.25)',
  },
  groupScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  groupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  groupCard: {
    width: '48%',
    backgroundColor: '#121827',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#1C263A',
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    position: 'relative',
  },
  groupCardSelected: {
    borderColor: '#F43F5E',
    backgroundColor: 'rgba(244, 63, 94, 0.09)',
    shadowColor: '#F43F5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 8,
  },
  groupCardHeader: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  checkIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIndicatorActive: {
    backgroundColor: '#F43F5E',
    borderColor: '#F43F5E',
  },
  groupAvatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#182133',
    borderWidth: 2,
    borderColor: '#26334D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  groupAvatarCircleSelected: {
    borderColor: '#F43F5E',
    backgroundColor: 'rgba(244, 63, 94, 0.18)',
    shadowColor: '#F43F5E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  groupAvatarText: {
    fontSize: 20,
    color: '#94A3B8',
  },
  groupAvatarTextSelected: {
    color: '#FFFFFF',
  },
  groupPlayerName: {
    fontSize: 16,
    color: '#CBD5E1',
    textAlign: 'center',
  },
  groupPlayerNameSelected: {
    color: '#FFFFFF',
  },

  // ─── ESTILOS DA VOTAÇÃO INDIVIDUAL ───
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  passBox: {
    width: '100%',
    backgroundColor: '#121827',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    padding: 24,
    alignItems: 'center',
  },
  badgePass: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  passTitle: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 20,
  },
  voterAvatarWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  voterName: {
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 14,
    letterSpacing: -0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#151D2F',
    backgroundColor: '#0A0E1A',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#141C2E',
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  instructionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.25)',
    padding: 12,
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  candidateCard: {
    width: '48%',
    backgroundColor: '#121827',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#1E293B',
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  candidateCardSelected: {
    borderColor: '#F43F5E',
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    shadowColor: '#F43F5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeaderIndicator: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionIndicatorActive: {
    backgroundColor: '#F43F5E',
    borderColor: '#F43F5E',
  },
  candidateName: {
    fontSize: 15,
    color: '#E2E8F0',
    marginTop: 10,
    textAlign: 'center',
  },

  // ─── RODAPÉ FIXO ───
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#080C16',
    borderTopWidth: 1,
    borderTopColor: '#161F30',
  },
});
