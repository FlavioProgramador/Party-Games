import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Target, Users, Key, HelpCircle, Skull, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

export function RulesScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useImpostorStore();
  const rules = settings.votingRules || {
    accusationMode: 'one_at_a_time',
    lastChance: true,
    partialGuess: false,
    civilianAccusedMeansImpostorWins: false,
  };

  const handleSetMode = (mode: 'one_at_a_time' | 'all_at_once') => {
    hapticsService.triggerSelection();
    updateSettings({
      votingRules: {
        ...rules,
        accusationMode: mode,
      },
    });
  };

  return (
    <SettingsScreenLayout
      title="Regras & Votação"
      subtitle="Indicação e Condições de Vitória"
      confirmButtonText="VOLTAR AO MENU"
      onConfirm={() => router.back()}
    >
      <View style={styles.introBox}>
        <Typography variant="body" color={theme.colors.textSecondary} style={{ fontSize: 14, lineHeight: 20 }}>
          Defina a dinâmica das acusações e as condições especiais para a vitória do impostor ou dos civis.
        </Typography>
      </View>

      {/* ─── SECTION 1: MODO DE INDICAÇÃO ─── */}
      <Typography variant="body" bold style={styles.sectionTitle}>
        MODO DE INDICAÇÃO
      </Typography>

      <View style={styles.modeContainer}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            rules.accusationMode === 'one_at_a_time' && styles.modeButtonActive,
          ]}
          onPress={() => handleSetMode('one_at_a_time')}
          activeOpacity={0.8}
        >
          <Target
            size={20}
            color={rules.accusationMode === 'one_at_a_time' ? '#FFFFFF' : theme.colors.textSecondary}
          />
          <Typography
            bold
            style={[
              styles.modeButtonText,
              rules.accusationMode === 'one_at_a_time' && styles.modeButtonTextActive,
            ]}
          >
            Um por vez
          </Typography>
          <Typography variant="caption" color={theme.colors.textSecondary} style={styles.modeDesc}>
            Cada participante vota em sequência individual.
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modeButton,
            rules.accusationMode === 'all_at_once' && styles.modeButtonActive,
          ]}
          onPress={() => handleSetMode('all_at_once')}
          activeOpacity={0.8}
        >
          <Users
            size={20}
            color={rules.accusationMode === 'all_at_once' ? '#FFFFFF' : theme.colors.textSecondary}
          />
          <Typography
            bold
            style={[
              styles.modeButtonText,
              rules.accusationMode === 'all_at_once' && styles.modeButtonTextActive,
            ]}
          >
            Simultâneo
          </Typography>
          <Typography variant="caption" color={theme.colors.textSecondary} style={styles.modeDesc}>
            Todos apontam o suspeito na contagem de 3.
          </Typography>
        </TouchableOpacity>
      </View>

      {/* ─── SECTION 2: REGRAS ADICIONAIS ─── */}
      <Typography variant="body" bold style={[styles.sectionTitle, { marginTop: 24 }]}>
        REGRAS ESPECIAIS
      </Typography>

      {/* Rule 1: Última Chance */}
      <TouchableOpacity
        style={[styles.itemCard, rules.lastChance && styles.itemCardActive]}
        onPress={() => router.push('/impostor/setup/rule-detail?type=lastChance')}
        activeOpacity={0.75}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: '#F59E0B' }]}>
            <Key size={22} color="#F59E0B" />
          </View>
          <View style={styles.textContainer}>
            <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 16 }}>
              Última Chance
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
              Impostor pode adivinhar a palavra se for descoberto.
            </Typography>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.badge, rules.lastChance ? styles.badgeActive : styles.badgeInactive]}>
            <Typography
              variant="caption"
              bold
              style={{ color: rules.lastChance ? '#10B981' : theme.colors.textMuted, fontSize: 11 }}
            >
              {rules.lastChance ? 'ATIVADO' : 'DESATIVADO'}
            </Typography>
          </View>
          <ChevronRight size={18} color={theme.colors.textSecondary} style={{ marginLeft: 6 }} />
        </View>
      </TouchableOpacity>

      {/* Rule 2: Acerto Parcial */}
      <TouchableOpacity
        style={[styles.itemCard, rules.partialGuess && styles.itemCardActive]}
        onPress={() => router.push('/impostor/setup/rule-detail?type=partialGuess')}
        activeOpacity={0.75}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(6, 182, 212, 0.15)', borderColor: '#06B6D4' }]}>
            <HelpCircle size={22} color="#06B6D4" />
          </View>
          <View style={styles.textContainer}>
            <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 16 }}>
              Acerto Parcial
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
              Tolera sinônimos e palavras com sentido muito próximo.
            </Typography>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.badge, rules.partialGuess ? styles.badgeActive : styles.badgeInactive]}>
            <Typography
              variant="caption"
              bold
              style={{ color: rules.partialGuess ? '#10B981' : theme.colors.textMuted, fontSize: 11 }}
            >
              {rules.partialGuess ? 'ATIVADO' : 'DESATIVADO'}
            </Typography>
          </View>
          <ChevronRight size={18} color={theme.colors.textSecondary} style={{ marginLeft: 6 }} />
        </View>
      </TouchableOpacity>

      {/* Rule 3: Escolha Errada */}
      <TouchableOpacity
        style={[styles.itemCard, rules.civilianAccusedMeansImpostorWins && styles.itemCardActive]}
        onPress={() => router.push('/impostor/setup/rule-detail?type=civilianAccusedMeansImpostorWins')}
        activeOpacity={0.75}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(244, 63, 94, 0.15)', borderColor: '#F43F5E' }]}>
            <Skull size={22} color="#F43F5E" />
          </View>
          <View style={styles.textContainer}>
            <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 16 }}>
              Escolha Errada É Fim de Jogo
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
              Se eliminarem um inocente, o impostor vence direto.
            </Typography>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.badge, rules.civilianAccusedMeansImpostorWins ? styles.badgeActive : styles.badgeInactive]}>
            <Typography
              variant="caption"
              bold
              style={{ color: rules.civilianAccusedMeansImpostorWins ? '#10B981' : theme.colors.textMuted, fontSize: 11 }}
            >
              {rules.civilianAccusedMeansImpostorWins ? 'ATIVADO' : 'DESATIVADO'}
            </Typography>
          </View>
          <ChevronRight size={18} color={theme.colors.textSecondary} style={{ marginLeft: 6 }} />
        </View>
      </TouchableOpacity>
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
  sectionTitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  modeButton: {
    flex: 1,
    backgroundColor: '#121827',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1E293B',
    padding: 14,
    alignItems: 'center',
  },
  modeButtonActive: {
    borderColor: '#7C3AED',
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  modeButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 4,
  },
  modeButtonTextActive: {
    color: '#FFFFFF',
  },
  modeDesc: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 15,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121827',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    padding: 16,
    marginBottom: 12,
  },
  itemCardActive: {
    borderColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: '#141C2E',
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  badgeInactive: {
    backgroundColor: '#182133',
    borderColor: '#243048',
  },
});
