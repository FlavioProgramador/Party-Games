import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Plus, Trash2, Sparkles, AlertCircle, Check, Tag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { useCustomWordsStore, validateCustomWord } from '@/games/impostor/store/useCustomWordsStore';
import { CATEGORIES } from '@/games/impostor/data/wordBank';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

const AVAILABLE_CATEGORIES = CATEGORIES.filter(c => c.id !== 'all');

const DIFFICULTIES: Array<{ id: 'easy' | 'medium' | 'hard'; label: string; color: string }> = [
  { id: 'easy', label: 'Fácil', color: theme.colors.success },
  { id: 'medium', label: 'Médio', color: theme.colors.suspense },
  { id: 'hard', label: 'Difícil', color: theme.colors.danger },
];

export function CustomWordsScreen() {
  const router = useRouter();
  const { customWords, addCustomWord, removeCustomWord } = useCustomWordsStore();

  const [wordValue, setWordValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personalizadas');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [impostorHint, setImpostorHint] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasMultipleWordsInHint = /\s/.test(impostorHint.trim());

  const handleHintChange = (text: string) => {
    setImpostorHint(text);
    if (/\s/.test(text.trim())) {
      setErrorMessage('A dica do impostor deve ser SOMENTE UMA PALAVRA (sem espaços ou frases).');
    } else {
      setErrorMessage(null);
    }
  };

  const handleAddWord = () => {
    const input = {
      value: wordValue,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      impostorHint,
    };

    const validation = validateCustomWord(input);
    if (!validation.valid) {
      hapticsService.triggerError();
      setErrorMessage(validation.error || 'Preencha os campos corretamente.');
      return;
    }

    const result = addCustomWord(input);
    if (result.valid) {
      hapticsService.triggerSuccess();
      setWordValue('');
      setImpostorHint('');
      setErrorMessage(null);
    } else {
      hapticsService.triggerError();
      setErrorMessage(result.error || 'Erro ao adicionar palavra.');
    }
  };

  const handleRemove = (id: string, name: string) => {
    hapticsService.triggerImpact();
    Alert.alert(
      'Remover Palavra',
      `Deseja remover "${name}" das suas palavras personalizadas?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            removeCustomWord(id);
            hapticsService.triggerSelection();
          },
        },
      ]
    );
  };

  const getCategoryName = (catId: string) => {
    return CATEGORIES.find(c => c.id === catId)?.name || catId;
  };

  return (
    <SettingsScreenLayout
      title="Palavras Personalizadas"
      subtitle={`${customWords.length} ${customWords.length === 1 ? 'palavra salva' : 'palavras salvas'}`}
      confirmButtonText="CONCLUÍDO"
      onConfirm={() => router.back()}
    >
      {/* Card de Cadastro */}
      <Card variant="modal" style={styles.formCard}>
        <View style={styles.formHeader}>
          <Sparkles size={18} color={theme.colors.secondary} style={{ marginRight: 6 }} />
          <Typography variant="body" bold color={theme.colors.text}>
            CRIAR NOVA PALAVRA
          </Typography>
        </View>

        {/* Input da Palavra */}
        <Typography variant="caption" bold color={theme.colors.textSecondary} style={styles.inputLabel}>
          PALAVRA SECRETA
        </Typography>
        <TextInput
          style={styles.input}
          placeholder="Ex: Pão de Alho, Batman, Churrasqueira..."
          placeholderTextColor={theme.colors.textMuted}
          value={wordValue}
          onChangeText={text => {
            setWordValue(text);
            if (errorMessage) setErrorMessage(null);
          }}
          maxLength={35}
        />

        {/* Categoria */}
        <Typography variant="caption" bold color={theme.colors.textSecondary} style={styles.inputLabel}>
          CATEGORIA
        </Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <View style={styles.categoryChipsRow}>
            {AVAILABLE_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                  onPress={() => {
                    hapticsService.triggerSelection();
                    setSelectedCategory(cat.id);
                  }}
                  activeOpacity={0.7}
                >
                  <Typography
                    variant="caption"
                    bold={isSelected}
                    color={isSelected ? theme.colors.text : theme.colors.textSecondary}
                  >
                    {cat.name}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Dificuldade */}
        <Typography variant="caption" bold color={theme.colors.textSecondary} style={styles.inputLabel}>
          DIFICULDADE
        </Typography>
        <View style={styles.difficultyRow}>
          {DIFFICULTIES.map(d => {
            const isSelected = selectedDifficulty === d.id;
            return (
              <TouchableOpacity
                key={d.id}
                style={[
                  styles.difficultyBtn,
                  isSelected && { borderColor: d.color, backgroundColor: `${d.color}15` },
                ]}
                onPress={() => {
                  hapticsService.triggerSelection();
                  setSelectedDifficulty(d.id);
                }}
                activeOpacity={0.7}
              >
                <Typography
                  variant="caption"
                  bold
                  color={isSelected ? d.color : theme.colors.textSecondary}
                >
                  {d.label}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Dica do Impostor */}
        <View style={styles.hintLabelRow}>
          <Typography variant="caption" bold color={theme.colors.textSecondary}>
            DICA DO IMPOSTOR
          </Typography>
          <View style={styles.rulePill}>
            <Typography variant="caption" bold color={theme.colors.danger} style={{ fontSize: 10 }}>
              SOMENTE 1 PALAVRA
            </Typography>
          </View>
        </View>

        <TextInput
          style={[
            styles.input,
            hasMultipleWordsInHint && { borderColor: theme.colors.danger },
          ]}
          placeholder="Ex: Fogo, Carro, Sobremesa... (sem espaços)"
          placeholderTextColor={theme.colors.textMuted}
          value={impostorHint}
          onChangeText={handleHintChange}
          maxLength={20}
          autoCapitalize="words"
        />

        {/* Mensagem de Erro / Alerta de Validação */}
        {errorMessage && (
          <View style={styles.errorBox}>
            <AlertCircle size={14} color={theme.colors.danger} style={{ marginRight: 6 }} />
            <Typography variant="caption" bold color={theme.colors.danger} style={{ flex: 1 }}>
              {errorMessage}
            </Typography>
          </View>
        )}

        <Button
          title="ADICIONAR PALAVRA"
          variant="primary"
          onPress={handleAddWord}
          style={{ marginTop: theme.spacing.md }}
        />
      </Card>

      {/* Lista de Palavras Cadastradas */}
      <View style={styles.listHeader}>
        <Tag size={16} color={theme.colors.secondary} style={{ marginRight: 6 }} />
        <Typography variant="label" color={theme.colors.textSecondary} style={{ letterSpacing: 1 }}>
          PALAVRAS SALVAS ({customWords.length})
        </Typography>
      </View>

      {customWords.length === 0 ? (
        <Card variant="modal" style={styles.emptyCard}>
          <Typography variant="body" bold color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: 4 }}>
            Nenhuma palavra personalizada ainda
          </Typography>
          <Typography variant="caption" color={theme.colors.textMuted} style={{ textAlign: 'center' }}>
            Adicione palavras acima. Elas são salvas offline e poderão ser sorteadas nas partidas!
          </Typography>
        </Card>
      ) : (
        customWords.map(word => {
          const diffMeta = DIFFICULTIES.find(d => d.id === word.difficulty) || DIFFICULTIES[0];
          return (
            <View key={word.id} style={styles.wordItemCard}>
              <View style={styles.wordItemLeft}>
                <Typography variant="body" bold style={styles.wordItemText}>
                  {word.value}
                </Typography>

                <View style={styles.wordItemMetaRow}>
                  <View style={styles.metaTag}>
                    <Typography variant="caption" color={theme.colors.secondary}>
                      {getCategoryName(word.category)}
                    </Typography>
                  </View>

                  <View style={[styles.metaTag, { borderColor: `${diffMeta.color}40`, backgroundColor: `${diffMeta.color}15` }]}>
                    <Typography variant="caption" bold color={diffMeta.color}>
                      {diffMeta.label}
                    </Typography>
                  </View>

                  <View style={styles.hintTag}>
                    <Typography variant="caption" color={theme.colors.textMuted}>
                      Dica:{' '}
                    </Typography>
                    <Typography variant="caption" bold color={theme.colors.suspense}>
                      {word.impostorHint}
                    </Typography>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemove(word.id, word.value)}
                activeOpacity={0.7}
              >
                <Trash2 size={18} color={theme.colors.danger} />
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </SettingsScreenLayout>
  );
}

const styles = StyleSheet.create({
  formCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    letterSpacing: 1,
    marginTop: theme.spacing.sm,
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 15,
  },
  categoryScroll: {
    marginBottom: 4,
  },
  categoryChipsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryChipSelected: {
    borderColor: theme.colors.secondary,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  difficultyBtn: {
    flex: 1,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: 6,
  },
  rulePill: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    padding: 10,
    borderRadius: 8,
    marginTop: theme.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  emptyCard: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  wordItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  wordItemLeft: {
    flex: 1,
  },
  wordItemText: {
    fontSize: 16,
    marginBottom: 6,
  },
  wordItemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  hintTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
});
