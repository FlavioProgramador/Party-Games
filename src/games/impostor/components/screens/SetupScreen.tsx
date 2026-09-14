import { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { theme } from '../../../../theme';
import { useImpostorStore } from '../../store/useImpostorStore';
import { CATEGORIES } from '../../data/wordBank';

export function SetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { settings, updateSettings, setPlayers, startGame } = useImpostorStore();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [playerCount, setPlayerCount] = useState(5);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(5).fill(''));
  const [error, setError] = useState('');

  const handleNext = () => {
    setStep(2);
    setPlayerNames(Array(playerCount).fill(''));
  };

  const handleStart = () => {
    const trimmedNames = playerNames.map(n => n.trim());
    const validNames = trimmedNames.filter(n => n.length >= 2 && n.length <= 15);
    
    if (validNames.length !== playerCount) {
      setError('Todos os nomes devem ter entre 2 e 15 caracteres.');
      return;
    }
    
    const uniqueNames = new Set(validNames);
    if (uniqueNames.size !== validNames.length) {
      setError('Nomes não podem ser repetidos.');
      return;
    }
    
    setError('');
    
    const players = validNames.map((name, index) => ({
      id: `player_${Date.now()}_${index}`,
      name,
    }));
    
    setPlayers(players);
    startGame();
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 20, 40), paddingBottom: Math.max(insets.bottom + 20, 40) }]}
      >
        <View style={styles.header}>
          <Button 
            title="VOLTAR" 
            variant="ghost" 
            size="sm"
            fullWidth={false}
            onPress={() => {
              if (step === 2) setStep(1);
              else router.push('/');
            }}
          />
          <Typography variant="h3" bold>NOVA PARTIDA</Typography>
          <View style={{ width: 80 }} />
        </View>

        {step === 1 ? (
          <View style={styles.stepContainer}>
            <Card style={styles.card} padding="lg">
              <Typography variant="label" color={theme.colors.textSecondary} style={styles.label}>NÚMERO DE JOGADORES</Typography>
              <View style={styles.row}>
                <Button 
                  title="-" 
                  variant="secondary" 
                  size="md"
                  fullWidth={false}
                  disabled={playerCount <= 3}
                  onPress={() => setPlayerCount(p => Math.max(3, p - 1))} 
                  style={{ width: 60 }}
                />
                <Typography variant="display" bold>{playerCount}</Typography>
                <Button 
                  title="+" 
                  variant="secondary" 
                  size="md"
                  fullWidth={false}
                  disabled={playerCount >= 10}
                  onPress={() => setPlayerCount(p => Math.min(10, p + 1))} 
                  style={{ width: 60 }}
                />
              </View>
            </Card>

            <Card style={styles.card} padding="lg">
              <Typography variant="label" color={theme.colors.textSecondary} style={styles.label}>CATEGORIA</Typography>
              <View style={styles.categories}>
                {CATEGORIES.slice(0, 4).map(cat => (
                  <Button 
                    key={cat.id}
                    title={cat.name} 
                    variant={settings.categoryId === cat.id ? 'primary' : 'secondary'}
                    size="md"
                    onPress={() => updateSettings({ categoryId: cat.id })}
                    style={{ marginBottom: theme.spacing.sm }}
                  />
                ))}
              </View>
            </Card>

            <Card style={styles.card} padding="lg">
              <Typography variant="label" color={theme.colors.textSecondary} style={styles.label}>TEMPO DE DISCUSSÃO</Typography>
              <View style={styles.row}>
                {[30, 45, 60, 90].map(time => (
                  <Button 
                    key={time}
                    title={`${time}s`} 
                    variant={settings.timeLimit === time ? 'primary' : 'secondary'}
                    size="sm"
                    fullWidth={false}
                    onPress={() => updateSettings({ timeLimit: time })}
                    style={{ flex: 1, marginHorizontal: 4 }}
                  />
                ))}
              </View>
            </Card>

            <Button title="CONTINUAR" onPress={handleNext} style={{ marginTop: theme.spacing.lg }} />
          </View>
        ) : (
          <View style={styles.stepContainer}>
            <Typography variant="h2" bold style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}>
              Quem vai jogar?
            </Typography>

            {error ? (
              <View style={styles.errorContainer}>
                <Typography variant="caption" color={theme.colors.danger} bold>
                  {error}
                </Typography>
              </View>
            ) : null}

            {Array.from({ length: playerCount }).map((_, i) => (
              <TextInput
                key={i}
                style={styles.input}
                placeholder={`Jogador ${i + 1}`}
                placeholderTextColor={theme.colors.textMuted}
                value={playerNames[i]}
                onChangeText={(text) => {
                  const newNames = [...playerNames];
                  newNames[i] = text;
                  setPlayerNames(newNames);
                  setError('');
                }}
                maxLength={15}
                autoCorrect={false}
              />
            ))}

            <Button title="INICIAR PARTIDA" variant="primary" onPress={handleStart} style={{ marginTop: theme.spacing.xl }} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  stepContainer: {
    flex: 1,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  categories: {
    flexDirection: 'column',
  },
  input: {
    backgroundColor: theme.colors.surfaceContainer,
    color: theme.colors.text,
    height: 56,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  errorContainer: {
    backgroundColor: theme.colors.dangerAmbient,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  }
});
