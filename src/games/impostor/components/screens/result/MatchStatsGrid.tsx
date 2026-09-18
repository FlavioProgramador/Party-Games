import { View, StyleSheet } from 'react-native';
import { Users, UserX, Layers, Gauge, Clock, Vote } from 'lucide-react-native';
import { Typography } from '../../../../../components/Typography';
import { theme } from '../../../../../theme';
import { ImpostorGameState } from '../../../engine/gameState';
import { CATEGORIES } from '../../../data/wordBank';

interface MatchStatsGridProps {
  store: ImpostorGameState;
}

export function MatchStatsGrid({ store }: MatchStatsGridProps) {
  const totalPlayers = store.players.length;
  const impostorCount = store.impostorIds.length;
  const civilianCount = Math.max(0, totalPlayers - impostorCount);

  // Categoria legível
  const categoryName = store.word?.category
    ? CATEGORIES.find(c => c.id === store.word?.category)?.name || store.word.category
    : 'Geral';

  // Dificuldade legível
  const difficultyMap: Record<string, { label: string; color: string }> = {
    easy: { label: 'Fácil', color: theme.colors.success },
    medium: { label: 'Médio', color: theme.colors.suspense },
    hard: { label: 'Difícil', color: theme.colors.danger },
  };
  const diffInfo = store.word?.difficulty
    ? difficultyMap[store.word.difficulty] || { label: 'Normal', color: theme.colors.secondary }
    : { label: 'Normal', color: theme.colors.secondary };

  // Modo de votação
  const votingModeLabel = store.settings.votingMode === 'group' ? 'Coletiva' : 'Individual';

  // Tempo de rodada
  const timeLimitLabel = store.settings.timeLimit > 0 ? `${store.settings.timeLimit}s` : 'Livre';

  const stats = [
    {
      id: 'players',
      label: 'JOGADORES',
      value: `${totalPlayers} (${civilianCount} civis)`,
      icon: <Users size={16} color={theme.colors.secondary} />,
    },
    {
      id: 'impostors',
      label: 'IMPOSTORES',
      value: `${impostorCount} ${impostorCount > 1 ? 'impostores' : 'impostor'}`,
      icon: <UserX size={16} color={theme.colors.danger} />,
      valueColor: theme.colors.danger,
    },
    {
      id: 'category',
      label: 'CATEGORIA',
      value: categoryName,
      icon: <Layers size={16} color={theme.colors.primaryGradientStart} />,
    },
    {
      id: 'difficulty',
      label: 'DIFICULDADE',
      value: diffInfo.label,
      icon: <Gauge size={16} color={diffInfo.color} />,
      valueColor: diffInfo.color,
    },
    {
      id: 'voting',
      label: 'VOTAÇÃO',
      value: votingModeLabel,
      icon: <Vote size={16} color={theme.colors.textSecondary} />,
    },
    {
      id: 'timer',
      label: 'TEMPO',
      value: timeLimitLabel,
      icon: <Clock size={16} color={theme.colors.textSecondary} />,
    },
  ];

  return (
    <View style={styles.container}>
      <Typography
        variant="label"
        color={theme.colors.textSecondary}
        style={styles.sectionHeader}
      >
        ESTATÍSTICAS DA RODADA
      </Typography>

      <View style={styles.grid}>
        {stats.map(item => (
          <View key={item.id} style={styles.statCard}>
            <View style={styles.statHeader}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <Typography variant="caption" bold color={theme.colors.textMuted} style={styles.statLabel}>
                {item.label}
              </Typography>
            </View>
            <Typography
              variant="body"
              bold
              color={item.valueColor || theme.colors.text}
              numberOfLines={1}
              style={styles.statValue}
            >
              {item.value}
            </Typography>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: theme.spacing.lg,
  },
  sectionHeader: {
    letterSpacing: 1.5,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconContainer: {
    marginRight: 6,
  },
  statLabel: {
    letterSpacing: 0.8,
    fontSize: 10,
  },
  statValue: {
    fontSize: 13,
    marginTop: 2,
  },
});
