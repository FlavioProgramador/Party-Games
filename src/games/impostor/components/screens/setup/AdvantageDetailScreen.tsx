import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Tag, Lightbulb, Shield } from 'lucide-react-native';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { ToggleOption } from '@/games/impostor/components/shared/ToggleOption';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

const ADVANTAGE_INFO = {
  seeCategory: {
    title: 'Ver Categoria',
    icon: (color: string) => <Tag size={24} color={color} />,
    accentColor: '#06B6D4',
    shortDesc: 'Permite que o impostor visualize a categoria temática da palavra secreta.',
    howItWorks:
      'Durante a fase de revelação dos papéis, o impostor verá o tema da rodada (por exemplo: "Comidas", "Filmes" ou "Lugares"). A palavra exata permanece oculta.',
    impact:
      'Ajuda o impostor a não falar algo completamente fora de contexto na primeira fala, reduzindo chances de eliminação instantânea.',
    recommendation:
      'Ideal para grupos com jogadores iniciantes ou rodadas com categorias muito amplas.',
  },
  getHint: {
    title: 'Receber Pista',
    icon: (color: string) => <Lightbulb size={24} color={color} />,
    accentColor: '#F59E0B',
    shortDesc: 'Dá uma pista sutil sobre o significado ou uso da palavra secreta.',
    howItWorks:
      'O impostor recebe uma pista conceitual cuidadosamente elaborada pelo banco de palavras (ex: se a palavra for "Café", a dica pode ser "Bebida matinal quente").',
    impact:
      'Dá pistas ao impostor sem entregar a resposta completa, tornando o blefe muito mais convincente e desafiador para os civis descobrirem.',
    recommendation:
      'Recomendado para partidas normais a equilibradas.',
  },
  safeStart: {
    title: 'Início Seguro',
    icon: (color: string) => <Shield size={24} color={color} />,
    accentColor: '#7C3AED',
    shortDesc: 'Impede que o impostor seja sorteado para iniciar a rodada de pistas.',
    howItWorks:
      'Ao sortear a ordem dos jogadores, o jogo garante que o primeiro a falar seja sempre um civil. O impostor terá a chance de ouvir ao menos uma pista antes da sua vez.',
    impact:
      'Elimina o pânico do impostor ter que inventar uma pista sem nenhuma referência do tema ou contexto.',
    recommendation:
      'Excelente para manter o ritmo de diversão e diminuir a pressão competitiva.',
  },
};

export function AdvantageDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();
  const typeKey = (params.type || 'seeCategory') as keyof typeof ADVANTAGE_INFO;
  const info = ADVANTAGE_INFO[typeKey] || ADVANTAGE_INFO.seeCategory;

  const { settings, updateSettings } = useImpostorStore();
  const currentAdvantages = settings.impostorAdvantages || {
    seeCategory: false,
    getHint: true,
    safeStart: false,
  };

  const [enabled, setEnabled] = useState<boolean>(Boolean(currentAdvantages[typeKey]));

  const handleToggle = (val: boolean) => {
    hapticsService.triggerSelection();
    setEnabled(val);
  };

  const handleConfirm = () => {
    updateSettings({
      impostorAdvantages: {
        ...currentAdvantages,
        [typeKey]: enabled,
      },
    });
    router.back();
  };

  return (
    <SettingsScreenLayout
      title={info.title}
      subtitle={enabled ? 'Ativado' : 'Desativado'}
      confirmButtonText="SALVAR ALTERAÇÃO"
      onConfirm={handleConfirm}
    >
      {/* Toggle Option */}
      <ToggleOption
        title={info.title}
        description={info.shortDesc}
        icon={info.icon(info.accentColor)}
        value={enabled}
        onValueChange={handleToggle}
        accentColor={info.accentColor}
      />

      {/* Explanatory cards */}
      <View style={styles.card}>
        <Typography variant="body" bold style={styles.sectionHeader}>
          Como funciona
        </Typography>
        <Typography variant="body" color={theme.colors.textSecondary} style={styles.bodyText}>
          {info.howItWorks}
        </Typography>
      </View>

      <View style={styles.card}>
        <Typography variant="body" bold style={styles.sectionHeader}>
          Impacto no jogo
        </Typography>
        <Typography variant="body" color={theme.colors.textSecondary} style={styles.bodyText}>
          {info.impact}
        </Typography>
      </View>

      <View style={[styles.card, styles.tipCard]}>
        <Typography variant="body" bold style={{ color: info.accentColor, marginBottom: 6 }}>
          💡 Recomendação
        </Typography>
        <Typography variant="caption" color={theme.colors.textSecondary} style={styles.bodyText}>
          {info.recommendation}
        </Typography>
      </View>
    </SettingsScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111726',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 14,
  },
  tipCard: {
    backgroundColor: 'rgba(124, 58, 237, 0.06)',
    borderColor: 'rgba(124, 58, 237, 0.25)',
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
