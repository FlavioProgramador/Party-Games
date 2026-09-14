import { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { theme } from '../../../../theme';
import { useImpostorStore } from '../../store/useImpostorStore';

export function ImpostorGuessScreen() {
  const store = useImpostorStore();
  const insets = useSafeAreaInsets();
  const [guess, setGuess] = useState('');

  const handleConfirm = () => {
    if (guess.trim().length > 0) {
      store.submitImpostorGuess(guess);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: Math.max(insets.top + 40, 60), paddingBottom: Math.max(insets.bottom + 40, 40) }
        ]}
      >
        <Typography variant="label" color={theme.colors.danger} style={{ marginBottom: theme.spacing.xl, letterSpacing: 2 }}>
          ÚLTIMA CHANCE
        </Typography>
        
        <Typography variant="h2" bold style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
          Você foi descoberto.
        </Typography>
        
        <Typography variant="body" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.xl, textAlign: 'center' }}>
          Mas ainda pode vencer o jogo se acertar a palavra secreta.
        </Typography>

        <Card variant="modal" style={{ padding: theme.spacing.xl, width: '100%', marginBottom: theme.spacing.xxl, borderColor: theme.colors.danger }}>
          <Typography variant="label" color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.sm, textAlign: 'center' }}>
            SUA DICA
          </Typography>
          <Typography variant="h3" bold style={{ textAlign: 'center', fontStyle: 'italic' }}>
            "{store.word?.impostorHint}"
          </Typography>
        </Card>

        <Typography variant="h3" bold style={{ marginBottom: theme.spacing.md }}>
          Qual era a palavra?
        </Typography>

        <TextInput
          style={styles.input}
          placeholder="Digite a palavra..."
          placeholderTextColor={theme.colors.textMuted}
          value={guess}
          onChangeText={setGuess}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleConfirm}
        />

        <Button
          title="CONFIRMAR"
          variant="danger"
          disabled={guess.trim().length === 0}
          onPress={handleConfirm}
          style={{ marginTop: theme.spacing.xl, width: '100%' }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.margin,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  input: {
    backgroundColor: theme.colors.surfaceContainer,
    color: theme.colors.text,
    height: 64,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.sizes.xl,
    fontFamily: theme.typography.fontFamily.bold,
    width: '100%',
    borderWidth: 2,
    borderColor: theme.colors.danger,
    textAlign: 'center',
  }
});
