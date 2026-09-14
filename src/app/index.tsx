import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { theme } from '@/theme';
import { GAME_REGISTRY } from '@/games/registry';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSelectGame = (gameId: string, available: boolean) => {
    if (available && gameId === 'impostor') {
      router.push('/impostor');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 40, 60), paddingBottom: Math.max(insets.bottom + 40, 40) }]}>
      <View style={styles.header}>
        <Typography variant="display" color={theme.colors.primary} bold>PARTY</Typography>
        <Typography variant="display" bold>GAMES</Typography>
      </View>

      <View style={styles.section}>
        <Typography variant="h3" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.lg }}>
          Selecione um jogo
        </Typography>

        {GAME_REGISTRY.map((game) => (
          <Card 
            key={game.id} 
            style={styles.gameCard}
            variant="default"
          >
            <View style={styles.gameInfo}>
              <Typography variant="h2" bold>{game.name.toUpperCase()}</Typography>
              {game.available ? (
                <View style={[styles.badge, styles.badgeAvailable]}>
                  <Typography variant="caption" color={theme.colors.success} bold>DISPONÍVEL</Typography>
                </View>
              ) : (
                <View style={[styles.badge, styles.badgeUnavailable]}>
                  <Typography variant="caption" color={theme.colors.textSecondary} bold>EM BREVE</Typography>
                </View>
              )}
            </View>
            <Typography variant="body" color={theme.colors.textSecondary} style={{ marginVertical: theme.spacing.md }}>
              {game.description}
            </Typography>
            
            <Button 
              title={game.available ? "JOGAR" : "INDISPONÍVEL"} 
              variant={game.available ? 'primary' : 'outline'}
              disabled={!game.available}
              onPress={() => handleSelectGame(game.id, game.available)}
              style={{ marginTop: theme.spacing.sm }}
            />
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.margin,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  section: {
    marginBottom: theme.spacing.xxl,
  },
  gameCard: {
    marginBottom: theme.spacing.lg,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
  },
  badgeAvailable: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  badgeUnavailable: {
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
});
