import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Animated,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users,
  UserMinus,
  Gauge,
  EyeOff,
  Dices,
  Inbox,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  HelpCircle,
} from 'lucide-react-native';
import { Typography } from '../../../../components/Typography';
import { useImpostorStore } from '../../store/useImpostorStore';
import { CATEGORIES } from '../../data/wordBank';
import { theme } from '../../../../theme';
import { useRouter } from 'expo-router';

// Helper component for Accordion Section
const AccordionSection = ({
  icon: Icon,
  title,
  value,
  isOpen,
  onToggle,
  iconColor,
  children,
}: any) => {
  return (
    <View style={[styles.card, isOpen && styles.cardOpen]}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeaderLeft}>
          <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15`, borderColor: `${iconColor}30` }]}>
            <Icon color={iconColor} size={20} />
          </View>
          <View>
            <Typography variant="body" bold style={{ color: '#FFFFFF' }}>
              {title}
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              {value}
            </Typography>
          </View>
        </View>

        <View style={styles.cardHeaderRight}>
          {isOpen ? (
            <ChevronDown color={theme.colors.textSecondary} size={20} />
          ) : (
            <View style={styles.badgeClosed}>
              <Typography variant="caption" bold color={theme.colors.secondary}>
                {value}
              </Typography>
              <ChevronRight color={theme.colors.secondary} size={16} style={{ marginLeft: 4 }} />
            </View>
          )}
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.cardContent}>
          {children}
        </View>
      )}
    </View>
  );
};

export function SetupScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { settings, updateSettings, setPlayers, startGame, resetToMenu } = useImpostorStore();

  const [openSection, setOpenSection] = useState<string | null>('players');
  const [playerCount, setPlayerCount] = useState(4); // Default to 4

  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleContinue = () => {
    // Generate simple player objects based on count
    const generatedPlayers = Array.from({ length: playerCount }).map((_, i) => ({
      id: `player_${Date.now()}_${i}`,
      name: `Jogador ${i + 1}`,
    }));
    
    setPlayers(generatedPlayers);
    startGame();
  };

  // Helper values for display
  const difficultyDisplay = {
    easy: 'Fácil',
    normal: 'Normal',
    hard: 'Difícil',
  }[settings.difficulty || 'normal'];

  const categoryDisplay = CATEGORIES.find(c => c.id === settings.categoryId)?.name || 'Aleatória';
  
  const votingDisplay = settings.votingType === 'secret' ? 'Secreta' : 'Aberta';

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 12, 32),
            paddingBottom: Math.max(insets.bottom + 120, 150),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── HEADER ─── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')} activeOpacity={0.7}>
            <ChevronLeft color={theme.colors.textSecondary} size={20} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.badgePrimary}>
              <Typography variant="caption" bold style={styles.badgeText}>
                IMPOSTOR
              </Typography>
            </View>
            <Typography
              variant="caption"
              color={theme.colors.textSecondary}
              style={{ marginTop: 4 }}
            >
              Configure sua partida
            </Typography>
          </View>

          <TouchableOpacity style={styles.helpButton} onPress={() => {}} activeOpacity={0.7}>
            <HelpCircle color={theme.colors.textSecondary} size={20} />
          </TouchableOpacity>
        </View>

        {/* ─── HERO ─── */}
        <View style={styles.heroSection}>
          <View style={styles.heroText}>
            <Typography variant="h2" bold style={{ color: '#FFFFFF' }}>
              Prepare a rodada
            </Typography>
            <Typography variant="body-sm" color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
              Defina as regras e deixe o resto com a gente.
            </Typography>
          </View>
        </View>

        {/* ─── ACCORDIONS ─── */}
        <View style={styles.accordionsContainer}>
          {/* 1. JOGADORES */}
          <AccordionSection
            icon={Users}
            iconColor="#06B6D4" // Cyan
            title="Jogadores"
            value={`${playerCount} jogadores`}
            isOpen={openSection === 'players'}
            onToggle={() => handleToggle('players')}
          >
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: 16 }}>
              Escolha quantas pessoas participarão da rodada.
            </Typography>
            <View style={styles.counterRow}>
              <TouchableOpacity
                style={[styles.counterBtn, playerCount <= 3 && styles.counterBtnDisabled]}
                onPress={() => setPlayerCount(Math.max(3, playerCount - 1))}
                disabled={playerCount <= 3}
              >
                <Text style={styles.counterBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{playerCount}</Text>
              <TouchableOpacity
                style={[styles.counterBtn, playerCount >= 10 && styles.counterBtnDisabled]}
                onPress={() => setPlayerCount(Math.min(10, playerCount + 1))}
                disabled={playerCount >= 10}
              >
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </AccordionSection>

          {/* 2. NÚMERO DE IMPOSTORES */}
          <AccordionSection
            icon={UserMinus}
            iconColor="#F43F5E" // Rose/Red
            title="Número de impostores"
            value={`${settings.impostorCount} impostor${settings.impostorCount > 1 ? 'es' : ''}`}
            isOpen={openSection === 'impostors'}
            onToggle={() => handleToggle('impostors')}
          >
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: 16 }}>
              Quantos impostores estarão escondidos no grupo.
            </Typography>
            <View style={styles.optionsRow}>
              {[1, 2].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.optionBtn,
                    settings.impostorCount === num && styles.optionBtnActive,
                    num === 2 && playerCount < 7 && { opacity: 0.5 }, // Exemplo: 2 impostores apenas para 7+ jogadores
                  ]}
                  disabled={num === 2 && playerCount < 7}
                  onPress={() => updateSettings({ impostorCount: num })}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionBtnText,
                      settings.impostorCount === num && styles.optionBtnTextActive,
                    ]}
                  >
                    {num} IMPOSTOR{num > 1 ? 'ES' : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </AccordionSection>

          {/* 3. DIFICULDADE */}
          <AccordionSection
            icon={Gauge}
            iconColor="#8B5CF6" // Violet
            title="Dificuldade"
            value={difficultyDisplay}
            isOpen={openSection === 'difficulty'}
            onToggle={() => handleToggle('difficulty')}
          >
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: 16 }}>
              Define quão complexas serão as palavras do jogo.
            </Typography>
            <View style={styles.optionsRow}>
              {(['easy', 'normal', 'hard'] as const).map((diff) => (
                <TouchableOpacity
                  key={diff}
                  style={[
                    styles.optionBtn,
                    styles.optionBtnSmall,
                    settings.difficulty === diff && styles.optionBtnActive,
                  ]}
                  onPress={() => updateSettings({ difficulty: diff })}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionBtnText,
                      settings.difficulty === diff && styles.optionBtnTextActive,
                    ]}
                  >
                    {diff === 'easy' ? 'FÁCIL' : diff === 'normal' ? 'NORMAL' : 'DIFÍCIL'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </AccordionSection>

          {/* 4. VANTAGENS DOS IMPOSTORES */}
          <AccordionSection
            icon={EyeOff}
            iconColor="#10B981" // Emerald/Green
            title="Vantagens dos impostores"
            value={settings.impostorAdvantages ? 'Ativadas' : 'Desativadas'}
            isOpen={openSection === 'advantages'}
            onToggle={() => handleToggle('advantages')}
          >
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: 16 }}>
              Permite recursos especiais que podem ajudar o impostor durante a partida.
            </Typography>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  !settings.impostorAdvantages && styles.optionBtnActive,
                ]}
                onPress={() => updateSettings({ impostorAdvantages: false })}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionBtnText,
                    !settings.impostorAdvantages && styles.optionBtnTextActive,
                  ]}
                >
                  DESATIVADAS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  settings.impostorAdvantages && styles.optionBtnActive,
                ]}
                onPress={() => updateSettings({ impostorAdvantages: true })}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionBtnText,
                    settings.impostorAdvantages && styles.optionBtnTextActive,
                  ]}
                >
                  ATIVADAS
                </Text>
              </TouchableOpacity>
            </View>
          </AccordionSection>

          {/* 5. CATEGORIAS */}
          <AccordionSection
            icon={Dices}
            iconColor="#6366F1" // Indigo
            title="Categorias"
            value={categoryDisplay}
            isOpen={openSection === 'categories'}
            onToggle={() => handleToggle('categories')}
          >
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: 16 }}>
              Escolha o tema das palavras que serão sorteadas.
            </Typography>
            <View style={styles.categoriesGrid}>
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  styles.categoryBtn,
                  settings.categoryId === 'all' && styles.optionBtnActive,
                ]}
                onPress={() => updateSettings({ categoryId: 'all' })}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionBtnText,
                    settings.categoryId === 'all' && styles.optionBtnTextActive,
                  ]}
                >
                  Aleatória
                </Text>
              </TouchableOpacity>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.optionBtn,
                    styles.categoryBtn,
                    settings.categoryId === cat.id && styles.optionBtnActive,
                  ]}
                  onPress={() => updateSettings({ categoryId: cat.id })}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionBtnText,
                      settings.categoryId === cat.id && styles.optionBtnTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </AccordionSection>

          {/* 6. VOTAÇÃO */}
          <AccordionSection
            icon={Inbox}
            iconColor="#D946EF" // Fuchsia/Pink
            title="Votação"
            value={votingDisplay}
            isOpen={openSection === 'voting'}
            onToggle={() => handleToggle('voting')}
          >
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: 16 }}>
              Votação aberta (todos veem os votos) ou secreta (votos ocultos até o fim).
            </Typography>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  settings.votingType === 'all' && styles.optionBtnActive,
                ]}
                onPress={() => updateSettings({ votingType: 'all' })}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionBtnText,
                    settings.votingType === 'all' && styles.optionBtnTextActive,
                  ]}
                >
                  ABERTA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  settings.votingType === 'secret' && styles.optionBtnActive,
                ]}
                onPress={() => updateSettings({ votingType: 'secret' })}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionBtnText,
                    settings.votingType === 'secret' && styles.optionBtnTextActive,
                  ]}
                >
                  SECRETA
                </Text>
              </TouchableOpacity>
            </View>
          </AccordionSection>
        </View>
      </ScrollView>

      {/* ─── FIXED FOOTER ─── */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom + 16, 28) }]}>
        
        {/* RESUMO */}
        <View style={styles.summaryBox}>
          <Typography variant="caption" bold color={theme.colors.textSecondary} style={{ marginBottom: 8, fontSize: 10, letterSpacing: 0.5 }}>
            RESUMO DA PARTIDA
          </Typography>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Users color="#06B6D4" size={14} />
              <View style={styles.summaryTextCol}>
                <Typography variant="caption" bold style={{ color: '#FFFFFF', lineHeight: 14 }}>{playerCount}</Typography>
                <Typography variant="caption" style={{ color: theme.colors.textSecondary, fontSize: 9 }}>jogadores</Typography>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <UserMinus color="#F43F5E" size={14} />
              <View style={styles.summaryTextCol}>
                <Typography variant="caption" bold style={{ color: '#FFFFFF', lineHeight: 14 }}>{settings.impostorCount}</Typography>
                <Typography variant="caption" style={{ color: theme.colors.textSecondary, fontSize: 9 }}>impostor{settings.impostorCount > 1 ? 'es' : ''}</Typography>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Gauge color="#8B5CF6" size={14} />
              <View style={styles.summaryTextCol}>
                <Typography variant="caption" bold style={{ color: '#FFFFFF', lineHeight: 14 }}>{difficultyDisplay}</Typography>
                <Typography variant="caption" style={{ color: theme.colors.textSecondary, fontSize: 9 }}>dificuldade</Typography>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Dices color="#6366F1" size={14} />
              <View style={styles.summaryTextCol}>
                <Typography variant="caption" bold style={{ color: '#FFFFFF', lineHeight: 14 }} numberOfLines={1}>{categoryDisplay}</Typography>
                <Typography variant="caption" style={{ color: theme.colors.textSecondary, fontSize: 9 }}>categoria</Typography>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.mainButtonWrapper}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#7C3AED', '#06B6D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.mainButton}
          >
            <Text style={styles.mainButtonText}>CONTINUAR</Text>
            <ArrowRight color="#FFFFFF" size={20} style={{ marginLeft: 10 }} />
          </LinearGradient>
        </TouchableOpacity>
        
        <Typography
          variant="caption"
          color={theme.colors.textSecondary}
          style={{ textAlign: 'center', marginTop: 12, fontSize: 11 }}
        >
          Na próxima etapa, vamos sortear quem começa.
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070A', // Darker blue/black background
  },
  scrollContent: {
    paddingHorizontal: 20,
  },

  // ─── HEADER ───
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F1520',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E2A40',
  },
  helpButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  badgePrimary: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.4)',
  },
  badgeText: {
    color: '#D8B4FE',
    fontSize: 10,
    letterSpacing: 1.2,
  },

  // ─── HERO ───
  heroSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  heroText: {
    alignItems: 'center',
  },

  // ─── ACCORDIONS ───
  accordionsContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: '#0B0F19',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#161F30',
    overflow: 'hidden',
  },
  cardOpen: {
    borderColor: '#2A3B5C',
    backgroundColor: '#0F1520',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeClosed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 4,
  },

  // ─── CONTROLS ───
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#05070A',
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#1E2A40',
  },
  counterBtn: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#161F30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnDisabled: {
    opacity: 0.5,
  },
  counterBtnText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  counterValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: theme.typography.fontFamily.bold,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#05070A',
    borderWidth: 1,
    borderColor: '#1E2A40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionBtnSmall: {
    paddingHorizontal: 8,
  },
  categoryBtn: {
    flex: 0,
    minWidth: '31%',
    paddingHorizontal: 12,
  },
  optionBtnActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderColor: '#7C3AED',
  },
  optionBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.bold,
    letterSpacing: 0.5,
  },
  optionBtnTextActive: {
    color: '#FFFFFF',
  },

  // ─── FOOTER ───
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#05070A',
    borderTopWidth: 1,
    borderTopColor: '#161F30',
  },
  summaryBox: {
    backgroundColor: '#0B0F19',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#161F30',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  summaryTextCol: {
    justifyContent: 'center',
    flex: 1,
  },
  mainButtonWrapper: {
    width: '100%',
    borderRadius: 32,
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  mainButton: {
    flexDirection: 'row',
    height: 58,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    fontSize: 15,
    fontFamily: theme.typography.fontFamily.extraBold,
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
});
