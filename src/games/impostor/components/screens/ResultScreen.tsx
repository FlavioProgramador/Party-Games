import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {
  Trophy,
  ShieldAlert,
  KeyRound,
  Lightbulb,
  CheckCircle2,
  XCircle,
} from 'lucide-react-native';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { theme } from '../../../../theme';
import { useImpostorStore } from '../../store/useImpostorStore';
import { hapticsService } from '../../../../core/haptics/hapticsService';
import { audioService } from '../../../../core/audio/audioService';
import { CelebrationEffects } from './result/CelebrationEffects';
import { ImpostorPlayerCard } from './result/ImpostorPlayerCard';
import { MatchStatsGrid } from './result/MatchStatsGrid';
import { CATEGORIES } from '../../data/wordBank';

export function ResultScreen() {
  const router = useRouter();
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();

  const impostors = store.players.filter(p => store.impostorIds.includes(p.id));
  const impostorWon = store.winner === 'impostor';

  // Revelação em estágios:
  // 1: Resultado/Vencedor
  // 2: Impostor(es)
  // 3: Palavra Secreta
  // 4: Estatísticas
  // 5: Ações
  const [stage, setStage] = useState(1);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Valores de animação Reanimated
  const headerAnim = useSharedValue(0);
  const impostorAnim = useSharedValue(0);
  const wordAnim = useSharedValue(0);
  const statsAnim = useSharedValue(0);
  const actionsAnim = useSharedValue(0);

  // Inicialização e som/haptic
  useEffect(() => {
    // Dispara animação do cabeçalho imediatamente
    headerAnim.value = withSpring(1, { damping: 14, stiffness: 120 });

    if (impostorWon) {
      audioService.playSound('fail');
      hapticsService.triggerError();
    } else {
      audioService.playSound('success');
      hapticsService.triggerSuccess();
    }

    // Estágio 2: Revelação do Impostor (650ms)
    const t1 = setTimeout(() => {
      setStage(prev => Math.max(prev, 2));
      impostorAnim.value = withSpring(1, { damping: 12, stiffness: 110 });
      hapticsService.triggerImpact();
    }, 650);

    // Estágio 3: Palavra Secreta (1250ms)
    const t2 = setTimeout(() => {
      setStage(prev => Math.max(prev, 3));
      wordAnim.value = withTiming(1, { duration: 400 });
    }, 1250);

    // Estágio 4: Estatísticas da Rodada (1600ms)
    const t3 = setTimeout(() => {
      setStage(prev => Math.max(prev, 4));
      statsAnim.value = withTiming(1, { duration: 400 });
    }, 1600);

    // Estágio 5: Botões de Ação (1950ms)
    const t4 = setTimeout(() => {
      setStage(5);
      actionsAnim.value = withTiming(1, { duration: 400 });
    }, 1950);

    timersRef.current = [t1, t2, t3, t4];

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [impostorWon, headerAnim, impostorAnim, wordAnim, statsAnim, actionsAnim]);

  // Pular animação caso o usuário dê um toque na tela
  const handleSkipAnimation = () => {
    if (stage < 5) {
      timersRef.current.forEach(clearTimeout);
      setStage(5);
      headerAnim.value = 1;
      impostorAnim.value = 1;
      wordAnim.value = 1;
      statsAnim.value = 1;
      actionsAnim.value = 1;
    }
  };

  // Estilos animados para cada seção
  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerAnim.value,
    transform: [
      { scale: interpolate(headerAnim.value, [0, 1], [0.88, 1]) },
      { translateY: interpolate(headerAnim.value, [0, 1], [-20, 0]) },
    ] as any,
  }));

  const impostorSectionStyle = useAnimatedStyle(() => ({
    opacity: impostorAnim.value,
    transform: [
      { translateY: interpolate(impostorAnim.value, [0, 1], [25, 0]) },
    ] as any,
  }));

  const wordCardStyle = useAnimatedStyle(() => ({
    opacity: wordAnim.value,
    transform: [
      { translateY: interpolate(wordAnim.value, [0, 1], [20, 0]) },
    ] as any,
  }));

  const statsSectionStyle = useAnimatedStyle(() => ({
    opacity: statsAnim.value,
    transform: [
      { translateY: interpolate(statsAnim.value, [0, 1], [20, 0]) },
    ] as any,
  }));

  const actionsStyle = useAnimatedStyle(() => ({
    opacity: actionsAnim.value,
    transform: [
      { translateY: interpolate(actionsAnim.value, [0, 1], [20, 0]) },
    ] as any,
  }));

  // Categoria da palavra
  const categoryName = store.word?.category
    ? CATEGORIES.find(c => c.id === store.word?.category)?.name || store.word.category
    : 'Geral';

  return (
    <View style={styles.outerContainer}>
      {/* Efeito de comemoração / atmosfera visual de encerramento */}
      <CelebrationEffects impostorWon={impostorWon} />

      <TouchableWithoutFeedback onPress={handleSkipAnimation}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(insets.top + 24, 44),
              paddingBottom: Math.max(insets.bottom + 36, 48),
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Tag de Topo */}
          <Typography
            variant="label"
            color={theme.colors.textSecondary}
            style={styles.topBadge}
          >
            FIM DE PARTIDA
          </Typography>

          {/* Banner do Veredito da Rodada (Estágio 1) */}
          <Animated.View style={[styles.verdictBanner, headerStyle]}>
            <View
              style={[
                styles.verdictIconWrapper,
                {
                  backgroundColor: impostorWon
                    ? 'rgba(244, 63, 94, 0.15)'
                    : 'rgba(16, 185, 129, 0.15)',
                  borderColor: impostorWon ? theme.colors.danger : theme.colors.success,
                },
              ]}
            >
              {impostorWon ? (
                <ShieldAlert size={36} color={theme.colors.danger} />
              ) : (
                <Trophy size={36} color={theme.colors.success} />
              )}
            </View>

            <View
              style={[
                styles.subBadge,
                {
                  borderColor: impostorWon ? 'rgba(244, 63, 94, 0.4)' : 'rgba(16, 185, 129, 0.4)',
                },
              ]}
            >
              <Typography
                variant="caption"
                bold
                color={impostorWon ? theme.colors.danger : theme.colors.success}
                style={styles.subBadgeText}
              >
                {impostorWon ? 'INFILTRAÇÃO BEM-SUCEDIDA' : 'O IMPOSTOR FOI DESMASCARADO'}
              </Typography>
            </View>

            <Typography
              variant="h1"
              bold
              color={impostorWon ? theme.colors.danger : theme.colors.success}
              style={styles.verdictTitle}
            >
              {impostorWon ? 'O IMPOSTOR VENCEU!' : 'OS CIVIS VENCERAM!'}
            </Typography>

            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={styles.verdictSubtitle}
            >
              {impostorWon
                ? 'O impostor enganou os civis e escapou sem ser descoberto!'
                : 'Os civis descobriram a identidade do infiltrado a tempo!'}
            </Typography>
          </Animated.View>

          {/* Revelação do(s) Impostor(es) (Estágio 2) */}
          <Animated.View style={[styles.impostorSection, impostorSectionStyle]}>
            <Typography
              variant="label"
              color={theme.colors.danger}
              style={styles.impostorSectionTitle}
            >
              {impostors.length > 1 ? 'QUEM ERAM OS IMPOSTORES?' : 'QUEM ERA O IMPOSTOR?'}
            </Typography>

            {impostors.length > 0 ? (
              impostors.map((player, idx) => (
                <ImpostorPlayerCard
                  key={player.id}
                  player={player}
                  index={idx}
                  revealed={stage >= 2}
                />
              ))
            ) : (
              <View style={styles.noImpostorCard}>
                <Typography variant="body" color={theme.colors.textMuted}>
                  Nenhum impostor registrado.
                </Typography>
              </View>
            )}
          </Animated.View>

          {/* Card da Palavra Secreta (Estágio 3) */}
          <Animated.View style={[styles.wordCardContainer, wordCardStyle]}>
            <Card variant="modal" style={styles.wordCard}>
              <View style={styles.wordHeaderRow}>
                <KeyRound size={16} color={theme.colors.secondary} />
                <Typography
                  variant="label"
                  color={theme.colors.textSecondary}
                  style={styles.wordHeaderLabel}
                >
                  PALAVRA DA RODADA
                </Typography>
                <View style={styles.categoryPill}>
                  <Typography variant="caption" bold color={theme.colors.secondary}>
                    {categoryName.toUpperCase()}
                  </Typography>
                </View>
              </View>

              <Typography
                variant="display"
                bold
                color={theme.colors.secondary}
                style={styles.secretWord}
              >
                {store.word?.value.toUpperCase()}
              </Typography>

              {/* Dica que o impostor recebeu */}
              {store.word?.impostorHint ? (
                <View style={styles.hintRow}>
                  <Lightbulb size={14} color={theme.colors.suspense} style={styles.hintIcon} />
                  <Typography variant="caption" color={theme.colors.textMuted}>
                    Dica do impostor:{' '}
                  </Typography>
                  <Typography variant="caption" bold color={theme.colors.suspense}>
                    {store.word.impostorHint}
                  </Typography>
                </View>
              ) : null}

              {/* Chute do Impostor (se ocorreu) */}
              {store.impostorGuess ? (
                <View style={styles.guessBox}>
                  <View style={styles.guessHeader}>
                    {impostorWon ? (
                      <CheckCircle2 size={16} color={theme.colors.success} />
                    ) : (
                      <XCircle size={16} color={theme.colors.danger} />
                    )}
                    <Typography
                      variant="caption"
                      bold
                      color={impostorWon ? theme.colors.success : theme.colors.danger}
                      style={styles.guessLabel}
                    >
                      {impostorWon ? 'CHUTE CORRETO DO IMPOSTOR' : 'CHUTE INCORRETO DO IMPOSTOR'}
                    </Typography>
                  </View>
                  <Typography
                    variant="h3"
                    bold
                    color={impostorWon ? theme.colors.success : theme.colors.danger}
                    style={styles.guessValue}
                  >
                    "{store.impostorGuess.toUpperCase()}"
                  </Typography>
                </View>
              ) : null}
            </Card>
          </Animated.View>

          {/* Painel de Estatísticas da Partida (Estágio 4) */}
          <Animated.View style={[styles.statsContainer, statsSectionStyle]}>
            <MatchStatsGrid store={store} />
          </Animated.View>

          {/* Botões de Ação da Partida (Estágio 5) */}
          <Animated.View style={[styles.actionsContainer, actionsStyle]}>
            <Button
              title="JOGAR NOVAMENTE"
              variant="primary"
              onPress={() => store.playAgain()}
              style={styles.actionButton}
            />

            <Button
              title="VOLTAR AO MENU"
              variant="secondary"
              onPress={() => {
                store.resetToMenu();
                router.replace('/');
              }}
              style={styles.menuButton}
            />
          </Animated.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.margin,
    alignItems: 'center',
  },
  topBadge: {
    letterSpacing: 3,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    opacity: 0.8,
  },
  verdictBanner: {
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  verdictIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  subBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
  },
  subBadgeText: {
    letterSpacing: 1.5,
    fontSize: 10,
  },
  verdictTitle: {
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs,
  },
  verdictSubtitle: {
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    fontSize: 13,
    lineHeight: 18,
  },
  impostorSection: {
    width: '100%',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  impostorSectionTitle: {
    letterSpacing: 2,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  noImpostorCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  wordCardContainer: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
  wordCard: {
    width: '100%',
    padding: theme.spacing.lg,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  wordHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  wordHeaderLabel: {
    letterSpacing: 1.5,
    marginLeft: 6,
    marginRight: 8,
  },
  categoryPill: {
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  secretWord: {
    textAlign: 'center',
    letterSpacing: 1.5,
    marginVertical: theme.spacing.sm,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  hintIcon: {
    marginRight: 4,
  },
  guessBox: {
    width: '100%',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
  },
  guessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  guessLabel: {
    letterSpacing: 1,
    marginLeft: 6,
  },
  guessValue: {
    textAlign: 'center',
    marginTop: 2,
  },
  statsContainer: {
    width: '100%',
  },
  actionsContainer: {
    width: '100%',
    marginTop: theme.spacing.xl,
  },
  actionButton: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  menuButton: {
    width: '100%',
  },
});
