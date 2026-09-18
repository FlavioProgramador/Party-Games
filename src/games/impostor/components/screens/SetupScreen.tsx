import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users,
  UserCheck,
  Sparkles,
  Zap,
  Flame,
  Shield,
  Target,
  Layers,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Clock,
  Vote,
} from 'lucide-react-native';
import { Typography } from '@/components/Typography';
import { useImpostorStore } from '../../store/useImpostorStore';
import { CATEGORIES } from '../../data/wordBank';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { hapticsService } from '@/core/haptics/hapticsService';

export function SetupScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { settings, players, setPlayers, updateSettings, startGame } = useImpostorStore();

  // If store has no players, provide default 4 players
  const currentPlayers = players.length >= 3 ? players : [
    { id: 'p_1', name: 'Jogador 1' },
    { id: 'p_2', name: 'Jogador 2' },
    { id: 'p_3', name: 'Jogador 3' },
    { id: 'p_4', name: 'Jogador 4' },
  ];

  const handleStartGame = () => {
    hapticsService.triggerImpact();
    // Ensure players are persisted
    if (players.length < 3) {
      setPlayers(currentPlayers);
    }
    startGame();
    router.replace('/impostor');
  };

  // Helper values for display
  const impostorCountDisplay = () => {
    const config = settings.impostorCount;
    if (!config || config.mode === 'fixed') {
      const val = config?.fixedValue || 1;
      return `${val} impostor${val > 1 ? 'es' : ''}`;
    }
    return `Aleatório (${config.randomRange.min}-${config.randomRange.max})`;
  };

  const categoryBadgeDisplay = () => {
    const cats = settings.categoryIds || (settings.categoryId ? [settings.categoryId] : ['all']);
    if (cats.includes('all') || cats.length >= CATEGORIES.length - 1) {
      return 'Todas';
    }
    return `${cats.length} cat.`;
  };

  const categorySubtitleDisplay = () => {
    const cats = settings.categoryIds || (settings.categoryId ? [settings.categoryId] : ['all']);
    if (cats.includes('all') || cats.length >= CATEGORIES.length - 1) {
      return 'Todas as categorias ativas';
    }
    if (cats.length === 1) {
      return CATEGORIES.find(c => c.id === cats[0])?.name || '1 selecionada';
    }
    return `${cats.length} categorias selecionadas`;
  };

  const difficultyDisplay = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
  }[settings.difficulty || 'easy'];

  const advantagesActiveCount = Object.values(settings.impostorAdvantages || {}).filter(Boolean).length;
  const votingDisplay = settings.votingType === 'secret' ? 'Votação Secreta' : 'Votação Aberta';

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 12, 32),
            paddingBottom: Math.max(insets.bottom + 160, 180),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── HEADER ─── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/')}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft color={theme.colors.textSecondary} size={22} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.badgePrimary}>
              <Typography variant="caption" bold style={styles.badgeText}>
                SETUP DA PARTIDA
              </Typography>
            </View>
            <Typography variant="h2" bold style={styles.headerTitle}>
              Quem é o Impostor?
            </Typography>
          </View>

          <View style={styles.backButtonPlaceholder} />
        </View>

        {/* ─── CARDS DE CONFIGURAÇÃO ─── */}
        <View style={styles.cardsList}>
          {/* 1. JOGADORES */}
          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push('/impostor/setup/players')}
            activeOpacity={0.75}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(124, 58, 237, 0.15)', borderColor: '#7C3AED' }]}>
                <Users size={22} color="#7C3AED" />
              </View>
              <View style={styles.cardTextContainer}>
                <Typography variant="body" bold style={styles.cardTitle} numberOfLines={1}>
                  Jogadores
                </Typography>
                <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
                  {currentPlayers.length} participantes • {currentPlayers.slice(0, 3).map(p => p.name).join(', ')}{currentPlayers.length > 3 ? '...' : ''}
                </Typography>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.valueBadge}>
                <Typography variant="caption" bold style={{ color: '#C4B5FD', fontSize: 12 }} numberOfLines={1}>
                  {currentPlayers.length}
                </Typography>
              </View>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* 2. NÚMERO DE IMPOSTORES */}
          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push('/impostor/setup/impostors')}
            activeOpacity={0.75}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(6, 182, 212, 0.15)', borderColor: '#06B6D4' }]}>
                <UserCheck size={22} color="#06B6D4" />
              </View>
              <View style={styles.cardTextContainer}>
                <Typography variant="body" bold style={styles.cardTitle} numberOfLines={1}>
                  Nº de Impostores
                </Typography>
                <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
                  {impostorCountDisplay()}
                </Typography>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.valueBadge, { borderColor: 'rgba(6, 182, 212, 0.3)', backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
                <Typography variant="caption" bold style={{ color: '#67E8F9', fontSize: 12 }} numberOfLines={1}>
                  {impostorCountDisplay()}
                </Typography>
              </View>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* 3. DIFICULDADE */}
          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push('/impostor/setup/difficulty')}
            activeOpacity={0.75}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10B981' }]}>
                <Sparkles size={22} color="#10B981" />
              </View>
              <View style={styles.cardTextContainer}>
                <Typography variant="body" bold style={styles.cardTitle} numberOfLines={1}>
                  Dificuldade
                </Typography>
                <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
                  Palavras e pistas ({difficultyDisplay})
                </Typography>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.valueBadge, { borderColor: 'rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                <Typography variant="caption" bold style={{ color: '#6EE7B7', fontSize: 12 }} numberOfLines={1}>
                  {difficultyDisplay}
                </Typography>
              </View>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* 4. VANTAGENS DO IMPOSTOR */}
          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push('/impostor/setup/advantages')}
            activeOpacity={0.75}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: '#F59E0B' }]}>
                <Shield size={22} color="#F59E0B" />
              </View>
              <View style={styles.cardTextContainer}>
                <Typography variant="body" bold style={styles.cardTitle} numberOfLines={1}>
                  Vantagens do Impostor
                </Typography>
                <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
                  Pistas, categoria e início seguro
                </Typography>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.valueBadge, { borderColor: 'rgba(245, 158, 11, 0.3)', backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                <Typography variant="caption" bold style={{ color: '#FCD34D', fontSize: 12 }} numberOfLines={1}>
                  {advantagesActiveCount}/3
                </Typography>
              </View>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* 5. REGRAS & VOTAÇÃO */}
          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push('/impostor/setup/rules')}
            activeOpacity={0.75}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(244, 63, 94, 0.15)', borderColor: '#F43F5E' }]}>
                <Target size={22} color="#F43F5E" />
              </View>
              <View style={styles.cardTextContainer}>
                <Typography variant="body" bold style={styles.cardTitle} numberOfLines={1}>
                  Regras & Indicação
                </Typography>
                <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
                  {settings.votingRules?.accusationMode === 'all_at_once' ? 'Simultâneo' : 'Um por vez'} • Última chance {settings.votingRules?.lastChance ? 'ON' : 'OFF'}
                </Typography>
              </View>
            </View>
            <View style={styles.cardRight}>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* 4. CATEGORIAS */}
          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push('/impostor/setup/categories')}
            activeOpacity={0.75}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(6, 182, 212, 0.15)', borderColor: '#06B6D4' }]}>
                <Layers size={22} color="#06B6D4" />
              </View>
              <View style={styles.cardTextContainer}>
                <Typography variant="body" bold style={styles.cardTitle} numberOfLines={1}>
                  Categorias
                </Typography>
                <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
                  {categorySubtitleDisplay()}
                </Typography>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.valueBadge, { borderColor: 'rgba(6, 182, 212, 0.3)', backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
                <Typography variant="caption" bold style={{ color: '#67E8F9', fontSize: 12 }} numberOfLines={1}>
                  {categoryBadgeDisplay()}
                </Typography>
              </View>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* 5. MODO DE VOTAÇÃO */}
          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push('/impostor/setup/voting-mode')}
            activeOpacity={0.75}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10B981' }]}>
                <Vote size={22} color="#10B981" />
              </View>
              <View style={styles.cardTextContainer}>
                <Typography variant="body" bold style={styles.cardTitle} numberOfLines={1}>
                  Modo de Votação
                </Typography>
                <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
                  {settings.votingMode === 'individual' ? 'Cada um vota no celular' : 'Grupo decide presencialmente'}
                </Typography>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.valueBadge, { borderColor: 'rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                <Typography variant="caption" bold style={{ color: '#6EE7B7', fontSize: 12 }} numberOfLines={1}>
                  {settings.votingMode === 'individual' ? 'Individual' : 'Em Grupo'}
                </Typography>
              </View>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* ─── TEMPO DA RODADA ─── */}
          <View style={styles.inlineCard}>
            <View style={styles.inlineHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={18} color="#F59E0B" style={{ marginRight: 8 }} />
                <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 15 }}>
                  Tempo da Rodada
                </Typography>
              </View>
              <Typography variant="caption" color="#F59E0B" bold>
                {settings.timeLimit > 0 ? `${settings.timeLimit}s` : 'Sem limite'}
              </Typography>
            </View>

            <View style={styles.timePillsRow}>
              {[0, 30, 60, 90, 120].map(time => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timePill,
                    settings.timeLimit === time && styles.timePillActive,
                  ]}
                  onPress={() => {
                    hapticsService.triggerSelection();
                    updateSettings({ timeLimit: time });
                  }}
                >
                  <Typography
                    variant="caption"
                    bold
                    style={[styles.timePillText, settings.timeLimit === time && styles.timePillTextActive]}
                  >
                    {time === 0 ? 'Livre' : `${time}s`}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ─── FOOTER FIXO COM RESUMO E BOTÃO DE INICIAR ─── */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: Math.max(insets.bottom + 16, 24),
          },
        ]}
      >
        <View style={styles.summaryBox}>
          <View style={styles.summaryItem}>
            <Users size={14} color="#C4B5FD" />
            <Typography variant="caption" bold style={{ color: '#F8FAFC', fontSize: 12 }}>
              {currentPlayers.length} jogadores
            </Typography>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <UserCheck size={14} color="#67E8F9" />
            <Typography variant="caption" bold style={{ color: '#F8FAFC', fontSize: 12 }}>
              {impostorCountDisplay()}
            </Typography>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Sparkles size={14} color="#6EE7B7" />
            <Typography variant="caption" bold style={{ color: '#F8FAFC', fontSize: 12 }}>
              {difficultyDisplay}
            </Typography>
          </View>
        </View>

        <TouchableOpacity
          style={styles.mainButtonWrapper}
          onPress={handleStartGame}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#8B5CF6', '#6366F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mainButton}
          >
            <Typography bold style={styles.mainButtonText}>
              INICIAR PARTIDA
            </Typography>
            <ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#141C2E',
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: 42,
  },
  headerCenter: {
    alignItems: 'center',
  },
  badgePrimary: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderColor: 'rgba(124, 58, 237, 0.4)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 6,
  },
  badgeText: {
    color: '#A78BFA',
    fontSize: 11,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  cardsList: {
    gap: 12,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121827',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1C263A',
    padding: 16,
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    minWidth: 0,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  cardTextContainer: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  valueBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    maxWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineCard: {
    backgroundColor: '#121827',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1C263A',
    padding: 16,
    marginTop: 4,
  },
  inlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryScroll: {
    marginHorizontal: -6,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#182133',
    borderWidth: 1,
    borderColor: '#243048',
    marginHorizontal: 4,
  },
  categoryPillActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: '#06B6D4',
  },
  categoryPillText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
  },
  categoryPillTextActive: {
    color: '#67E8F9',
  },
  timePillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#182133',
    borderWidth: 1,
    borderColor: '#243048',
    alignItems: 'center',
  },
  timePillActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: '#F59E0B',
  },
  timePillText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
  },
  timePillTextActive: {
    color: '#FCD34D',
  },
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
  summaryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#111726',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1C263A',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#243048',
  },
  mainButtonWrapper: {
    borderRadius: 28,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  mainButton: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1,
  },
});
