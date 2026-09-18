import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Layers,
  Sparkles,
  CheckCheck,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { SelectionCard } from '@/games/impostor/components/shared/SelectionCard';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { CATEGORIES } from '@/games/impostor/data/wordBank';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

const CATEGORY_META: Record<string, { iconText: string; desc: string; color: string }> = {
  animais: { iconText: '🐶', desc: 'Mamíferos, aves, répteis e animais marinhos', color: '#10B981' },
  comidas: { iconText: '🍕', desc: 'Pratos, frutas, sobremesas e ingredientes culinários', color: '#F59E0B' },
  esportes: { iconText: '⚽', desc: 'Modalidades esportivas, equipamentos e termos', color: '#06B6D4' },
  filmes_e_series: { iconText: '🎬', desc: 'Cinema, séries famosas, gêneros e cultura pop', color: '#EC4899' },
  lugares: { iconText: '🌍', desc: 'Países, cidades famosas, monumentos e pontos turísticos', color: '#6366F1' },
  jogos: { iconText: '🎮', desc: 'Videogames, jogos de tabuleiro e personagens icônicos', color: '#8B5CF6' },
  musica: { iconText: '🎵', desc: 'Instrumentos, ritmos musicais e estilos sonoros', color: '#14B8A6' },
  cotidiano: { iconText: '☀️', desc: 'Situações diárias, rotinas e tarefas da vida real', color: '#EAB308' },
  objetos: { iconText: '📦', desc: 'Itens de casa, ferramentas, tecnologias e utensílios', color: '#F97316' },
  profissoes: { iconText: '💼', desc: 'Carreiras, ocupações tradicionais e modernas', color: '#3B82F6' },
};

const INDIVIDUAL_CATEGORIES = CATEGORIES.filter(c => c.id !== 'all');

export function CategoriesScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useImpostorStore();

  // Initialize selected categories
  const initialSelection = (): string[] => {
    if (settings.categoryIds && settings.categoryIds.length > 0) {
      if (settings.categoryIds.includes('all')) {
        return INDIVIDUAL_CATEGORIES.map(c => c.id);
      }
      return settings.categoryIds;
    }
    if (settings.categoryId && settings.categoryId !== 'all') {
      return [settings.categoryId];
    }
    // Default: all categories selected
    return INDIVIDUAL_CATEGORIES.map(c => c.id);
  };

  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelection);

  const isAllSelected = selectedIds.length === INDIVIDUAL_CATEGORIES.length;

  const handleToggleAll = () => {
    hapticsService.triggerSelection();
    if (isAllSelected) {
      // Keep at least the first one selected
      setSelectedIds([INDIVIDUAL_CATEGORIES[0].id]);
    } else {
      setSelectedIds(INDIVIDUAL_CATEGORIES.map(c => c.id));
    }
  };

  const handleToggleCategory = (id: string) => {
    hapticsService.triggerSelection();
    if (selectedIds.includes(id)) {
      // Don't allow deselecting all (keep at least 1)
      if (selectedIds.length <= 1) return;
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleConfirm = () => {
    const finalCategoryIds = isAllSelected ? ['all'] : selectedIds;
    updateSettings({
      categoryIds: finalCategoryIds,
      categoryId: finalCategoryIds.length === 1 ? finalCategoryIds[0] : 'all',
    });
    router.back();
  };

  const subtitleText = isAllSelected
    ? 'Todas as 10 categorias ativas'
    : `${selectedIds.length} de ${INDIVIDUAL_CATEGORIES.length} selecionadas`;

  return (
    <SettingsScreenLayout
      title="Categorias de Palavras"
      subtitle={subtitleText}
      confirmButtonText="CONFIRMAR SELEÇÃO"
      onConfirm={handleConfirm}
      confirmDisabled={selectedIds.length === 0}
    >
      <View style={styles.introBox}>
        <Typography variant="body" color={theme.colors.textSecondary} style={{ fontSize: 14, lineHeight: 20 }}>
          Selecione uma ou mais categorias para diversificar o vocabulário da partida. Palavras serão sorteadas aleatoriamente entre as selecionadas.
        </Typography>
      </View>

      {/* Select All Card */}
      <SelectionCard
        title="Todas as Categorias"
        description="Mistura aleatória de todos os temas do jogo para máximo dinamismo."
        icon={<Sparkles size={22} color="#8B5CF6" />}
        selected={isAllSelected}
        onPress={handleToggleAll}
        indicatorType="checkbox"
        accentColor="#8B5CF6"
      />

      {/* Quick Action Bar */}
      <View style={styles.quickBar}>
        <Typography variant="caption" bold style={{ color: theme.colors.textSecondary, letterSpacing: 1 }}>
          CATEGORIAS INDIVIDUAIS ({selectedIds.length}/{INDIVIDUAL_CATEGORIES.length})
        </Typography>

        <TouchableOpacity
          style={styles.quickActionBtn}
          onPress={handleToggleAll}
          activeOpacity={0.7}
        >
          <CheckCheck size={14} color={theme.colors.secondary} style={{ marginRight: 4 }} />
          <Typography variant="caption" bold color={theme.colors.secondary}>
            {isAllSelected ? 'Limpar' : 'Marcar todas'}
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Individual Categories */}
      {INDIVIDUAL_CATEGORIES.map(cat => {
        const meta = CATEGORY_META[cat.id] || {
          iconText: '🎲',
          desc: 'Palavras variadas desta temática',
          color: theme.colors.secondary,
        };
        const isSelected = selectedIds.includes(cat.id);

        return (
          <SelectionCard
            key={cat.id}
            title={cat.name}
            description={meta.desc}
            icon={
              <Typography style={{ fontSize: 20 }}>
                {meta.iconText}
              </Typography>
            }
            selected={isSelected}
            onPress={() => handleToggleCategory(cat.id)}
            indicatorType="checkbox"
            accentColor={meta.color}
          />
        );
      })}
    </SettingsScreenLayout>
  );
}

const styles = StyleSheet.create({
  introBox: {
    marginBottom: 20,
    backgroundColor: '#111726',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  quickBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  quickActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
});
