import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Dice5, Users, Clock, MessageCircle, Eye, CheckCircle2, ArrowRight, RefreshCw, ChevronLeft } from 'lucide-react-native';
import { Typography } from '../../../../components/Typography';
import { useImpostorStore } from '../../store/useImpostorStore';
import { theme } from '../../../../theme';

export function PreStartScreen() {
  const insets = useSafeAreaInsets();
  const { players, playOrder, settings, startReveal, reshufflePlayOrder } = useImpostorStore();
  
  const [isAnimating, setIsAnimating] = useState(true);
  const [displayedName, setDisplayedName] = useState('');

  // The first player in playOrder will be the one who starts
  const targetPlayerId = playOrder[0];
  const targetPlayer = players.find(p => p.id === targetPlayerId);

  useEffect(() => {
    if (!isAnimating) {
      if (targetPlayer) {
        setDisplayedName(targetPlayer.name.toUpperCase());
      }
      return;
    }
    
    let iterations = 0;
    const interval = setInterval(() => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      setDisplayedName(randomPlayer.name.toUpperCase());
      iterations++;
      
      // Stop animating after about 2-3 seconds (20-30 iterations at 100ms)
      if (iterations > 25) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimating, players, targetPlayer]);

  const handleReshuffle = () => {
    if (isAnimating) return;
    reshufflePlayOrder();
    setIsAnimating(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: Math.max(insets.top + 20, 40), paddingBottom: Math.max(insets.bottom + 20, 40) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft color={theme.colors.textSecondary} size={24} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.badgePrimary}>
              <View style={styles.dot} />
              <Typography variant="caption" bold style={{ color: theme.colors.primary, letterSpacing: 1 }}>IMPOSTOR</Typography>
            </View>
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 4 }}>Partida pronta!</Typography>
          </View>

          <View style={styles.headerRight}>
            <Users color={theme.colors.secondary} size={16} />
            <Typography variant="caption" bold style={{ color: theme.colors.text, marginLeft: 6 }}>{players.length}</Typography>
          </View>
        </View>

        {/* TITLE */}
        <View style={styles.titleSection}>
          <Typography variant="h3" bold style={{ color: theme.colors.primary, marginBottom: 8 }}>
            QUEM COMEÇA?
          </Typography>
          <Typography variant="body" color={theme.colors.textSecondary}>
            Sorteando o jogador inicial da rodada...
          </Typography>
        </View>

        {/* SORT CARD */}
        <LinearGradient
          colors={['#1B2030', '#151923']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.sortCard}
        >
          <View style={styles.diceContainer}>
            <Dice5 color={theme.colors.text} size={28} />
          </View>
          
          <View style={styles.sortBadge}>
            <Typography variant="caption" bold color={theme.colors.textSecondary} style={{ letterSpacing: 1 }}>
              {isAnimating ? 'SORTEANDO...' : 'SORTEADO!'}
            </Typography>
          </View>

          <Typography variant="display" bold style={{ color: theme.colors.text, marginVertical: 16 }}>
            {displayedName}
          </Typography>

          <Typography variant="body" color={theme.colors.textSecondary} style={{ marginBottom: 24 }}>
            {isAnimating ? 'Aguarde a seleção...' : 'Você começa!'}
          </Typography>

          <TouchableOpacity 
            style={[styles.reshuffleBtn, isAnimating && styles.reshuffleBtnDisabled]} 
            onPress={handleReshuffle}
            disabled={isAnimating}
          >
            <Typography variant="caption" color={isAnimating ? theme.colors.textMuted : theme.colors.textSecondary}>
              Sortear novamente
            </Typography>
            <RefreshCw color={isAnimating ? theme.colors.textMuted : theme.colors.textSecondary} size={14} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </LinearGradient>

        {/* INFO BADGES */}
        <View style={styles.infoRow}>
          <View style={styles.infoBadge}>
            <Clock color={theme.colors.secondary} size={14} />
            <Typography variant="caption" bold style={{ color: theme.colors.textSecondary, marginLeft: 6 }}>
              TEMPO DE JOGO: <Typography variant="caption" bold style={{ color: theme.colors.text }}>{formatTime(settings.timeLimit)}</Typography>
            </Typography>
          </View>
          <View style={styles.infoBadge}>
            <Users color={theme.colors.primary} size={14} />
            <Typography variant="caption" bold style={{ color: theme.colors.textSecondary, marginLeft: 6 }}>
              {players.length} JOGADORES
            </Typography>
          </View>
        </View>

        {/* HOW IT WORKS */}
        <View style={styles.howItWorksHeader}>
          <Typography variant="h3" bold style={{ color: theme.colors.text, fontSize: 18 }}>COMO FUNCIONA</Typography>
          <Typography variant="caption" color={theme.colors.textSecondary}>Regras rápidas</Typography>
        </View>

        <View style={styles.stepsContainer}>
          <View style={styles.stepCard}>
            <View style={styles.stepIconContainer}>
              <MessageCircle color={theme.colors.primary} size={20} />
            </View>
            <View style={styles.stepText}>
              <Typography variant="caption" bold style={{ color: theme.colors.primary, letterSpacing: 1 }}>01 <Typography variant="label" bold style={{ color: theme.colors.text }}>ASSOCIE</Typography></Typography>
              <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>Dê uma palavra ou pista relacionada ao segredo.</Typography>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={[styles.stepIconContainer, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Eye color={theme.colors.secondary} size={20} />
            </View>
            <View style={styles.stepText}>
              <Typography variant="caption" bold style={{ color: theme.colors.secondary, letterSpacing: 1 }}>02 <Typography variant="label" bold style={{ color: theme.colors.text }}>DISCUTA</Typography></Typography>
              <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>Ouça as pistas com atenção e ache o impostor.</Typography>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={[styles.stepIconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <CheckCircle2 color={theme.colors.success} size={20} />
            </View>
            <View style={styles.stepText}>
              <Typography variant="caption" bold style={{ color: theme.colors.success, letterSpacing: 1 }}>03 <Typography variant="label" bold style={{ color: theme.colors.text }}>VOTE</Typography></Typography>
              <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>Apontem quem está fingindo e eliminem o suspeito.</Typography>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* FOOTER BUTTON */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom + 16, 32) }]}>
        <TouchableOpacity 
          style={styles.mainButtonWrapper} 
          onPress={startReveal}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.mainButton}
          >
            <Typography variant="label" bold style={{ color: theme.colors.text, marginRight: 8, fontSize: 16 }}>
              COMEÇAR PARTIDA
            </Typography>
            <ArrowRight color={theme.colors.text} size={20} />
          </LinearGradient>
        </TouchableOpacity>
        <Typography variant="caption" color={theme.colors.textMuted} style={{ textAlign: 'center', marginTop: 12 }}>
          ○ O jogador inicial começa falando no sentido horário.
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B12',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  badgePrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sortCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  diceContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.4)',
  },
  sortBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reshuffleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  reshuffleBtnDisabled: {
    opacity: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 12,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainer,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  howItWorksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  stepsContainer: {
    gap: 12,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#111520',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  stepIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  stepText: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#080B12',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  mainButtonWrapper: {
    width: '100%',
    shadowColor: theme.colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  mainButton: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
