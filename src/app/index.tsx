import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { theme } from '@/theme';
import { GAME_REGISTRY } from '@/games/registry';
import { LinearGradient } from 'expo-linear-gradient';
import { Gamepad2, Heart, BookOpen, User, Users, Timer, Smartphone, Flame, Lock } from 'lucide-react-native';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const resetToMenu = useImpostorStore(state => state.resetToMenu);

  // Constantes de responsividade
  const isDesktop = width > 768;
  const contentWidth = isDesktop ? 600 : '100%';
  const paddingX = isDesktop ? 0 : theme.spacing.margin;

  const handleSelectGame = (gameId: string, available: boolean) => {
    if (available && gameId === 'impostor') {
      // Sempre resetar o estado antes de iniciar uma nova partida,
      // evitando que o estado persistido de uma sessão anterior interfira.
      resetToMenu();
      router.push('/impostor');
    } else {
      Alert.alert('Aviso', 'Este jogo estará disponível em breve!');
    }
  };

  const handleAlert = (msg: string) => {
    Alert.alert('Informação', msg);
  };

  const impostorGame = GAME_REGISTRY.find(g => g.id === 'impostor');
  const upcomingGames = GAME_REGISTRY.filter(g => !g.available);

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: Math.max(insets.top + 20, 40), paddingBottom: Math.max(insets.bottom + 80, 100) },
          isDesktop && { alignItems: 'center' }
        ]}
      >
        <View style={[styles.content, { width: contentWidth, paddingHorizontal: paddingX }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.logoContainer}>
                <Gamepad2 color={theme.colors.primary} size={24} />
              </View>
              <View>
                <Typography variant="body" bold style={{ fontSize: 16 }}>PARTY GAMES</Typography>
                <Typography variant="caption" color={theme.colors.secondary} bold style={{ letterSpacing: 1 }}>JOGOS</Typography>
              </View>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={() => handleAlert('Acessar Perfil')}>
              <User color={theme.colors.primary} size={20} />
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View style={styles.greetingRow}>
            <Typography variant="h3" bold color={theme.colors.secondary}>FALA, GALERA! 👋</Typography>
            <View style={styles.badgePresencial}>
              <View style={styles.dot} />
              <Typography variant="caption" color={theme.colors.textSecondary}>1 Celular Presencial</Typography>
            </View>
          </View>

          {/* Title Area */}
          <View style={styles.titleArea}>
            <Typography variant="display" bold>Escolha o Game</Typography>
            <Typography variant="body" color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
              Reúna a roda e passe o celular de mão em mão.
            </Typography>
            
            <View style={styles.playersReady}>
              <View style={styles.avatarGroup}>
                <View style={[styles.avatar, { backgroundColor: theme.colors.primary, zIndex: 3 }]}><Typography variant="caption" bold>L</Typography></View>
                <View style={[styles.avatar, { backgroundColor: theme.colors.secondary, zIndex: 2, marginLeft: -10 }]}><Typography variant="caption" bold>M</Typography></View>
                <View style={[styles.avatar, { backgroundColor: theme.colors.danger, zIndex: 1, marginLeft: -10 }]}><Typography variant="caption" bold>B</Typography></View>
              </View>
              <Typography variant="caption" color={theme.colors.secondary} bold style={{ marginLeft: 8 }}>3 a 10 amigos prontos na sala</Typography>
            </View>
          </View>

          {/* Main Card (Impostor) */}
          {impostorGame && (
            <Card padding="none" style={styles.mainCard}>
              <View style={styles.cardHeader}>
                <View style={styles.badgeDanger}>
                  <Flame size={14} color="#FFF" style={{ marginRight: 4 }} />
                  <Typography variant="caption" bold color="#FFF">DISPONÍVEL AGORA</Typography>
                </View>
                <View style={styles.badgeGhost}>
                  <Typography variant="caption" color={theme.colors.textSecondary}>{impostorGame.category}</Typography>
                </View>
              </View>

              <View style={styles.imageContainer}>
                <ImageBackground 
                  source={impostorGame.image} 
                  style={styles.gameImage}
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={['transparent', 'rgba(26, 34, 52, 0.8)', theme.colors.surface]}
                    style={styles.imageOverlay}
                  >
                    <View style={styles.gameTitleContainer}>
                      <Typography variant="display" bold>O IMPOSTOR</Typography>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </View>

              <View style={styles.cardBody}>
                <Typography variant="body" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.lg }}>
                  {impostorGame.description}
                </Typography>
                
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Users size={16} color={theme.colors.secondary} style={{ marginRight: 6 }} />
                    <Typography variant="caption" bold>{impostorGame.minPlayers}–{impostorGame.maxPlayers}</Typography>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Timer size={16} color={theme.colors.primary} style={{ marginRight: 6 }} />
                    <Typography variant="caption" bold>{impostorGame.duration}</Typography>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Smartphone size={16} color={theme.colors.danger} style={{ marginRight: 6 }} />
                    <Typography variant="caption" bold>1 Celular</Typography>
                  </View>
                </View>

                <Button 
                  title="▶ JOGAR AGORA" 
                  variant="primary"
                  onPress={() => handleSelectGame(impostorGame.id, impostorGame.available)}
                  style={{ marginBottom: theme.spacing.md }}
                />
                
                <Button 
                  title="ⓘ Como Jogar" 
                  variant="outline"
                  onPress={() => handleAlert('Regras e Tutorial do Impostor abertos.')}
                />
              </View>
            </Card>
          )}

          {/* Em Breve */}
          {upcomingGames.length > 0 && (
            <View style={styles.upcomingSection}>
              <View style={styles.upcomingHeader}>
                <Typography variant="h3" bold>EM BREVE NA PLATAFORMA</Typography>
                <Typography variant="caption" color={theme.colors.secondary} bold>Novidades</Typography>
              </View>
              <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.lg }}>
                Novos party games chegando a cada atualização.
              </Typography>

              {upcomingGames.map(game => (
                <Card key={game.id} padding="md" style={styles.upcomingCard}>
                  <View style={styles.upcomingIconContainer}>
                    <Lock size={24} color={theme.colors.textSecondary} />
                  </View>
                  <View style={styles.upcomingInfo}>
                    <View style={styles.upcomingTitleRow}>
                      <Typography variant="h3" bold>{game.name.toUpperCase()}</Typography>
                      <View style={styles.badgeUpcoming}>
                        <Typography variant="caption" color={theme.colors.textSecondary} bold>Em Breve</Typography>
                      </View>
                    </View>
                    <Typography variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
                      {game.description}
                    </Typography>
                  </View>
                </Card>
              ))}
            </View>
          )}

        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={[styles.navContainer, isDesktop && { width: contentWidth, alignSelf: 'center' }]}>
          <TouchableOpacity style={styles.navItem}>
            <Gamepad2 size={24} color={theme.colors.secondary} />
            <Typography variant="caption" color={theme.colors.secondary} bold style={{ marginTop: 4 }}>Jogos</Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleAlert('Abrindo Favoritos')}>
            <Heart size={24} color={theme.colors.textSecondary} />
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 4 }}>Favoritos</Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleAlert('Abrindo Regras')}>
            <BookOpen size={24} color={theme.colors.textSecondary} />
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 4 }}>Regras</Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleAlert('Abrindo Perfil')}>
            <User size={24} color={theme.colors.textSecondary} />
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 4 }}>Perfil</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    // Definido dinamicamente via style na view baseada no tamanho da tela
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  badgePresencial: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.secondary,
    marginRight: 6,
  },
  titleArea: {
    marginBottom: theme.spacing.xxl,
  },
  playersReady: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  mainCard: {
    marginBottom: theme.spacing.xxl,
    overflow: 'hidden', // Importante para as bordas arredondadas não vazarem a imagem
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  badgeDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E11D48',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeGhost: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  imageContainer: {
    width: '100%',
    height: 240, // Ampliado para dar mais destaque à arte
    backgroundColor: theme.colors.surfaceContainer,
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.spacing.md,
  },
  gameTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBody: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  upcomingSection: {
    marginBottom: theme.spacing.xl,
  },
  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  upcomingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badgeUpcoming: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0B0D13',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 12,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
