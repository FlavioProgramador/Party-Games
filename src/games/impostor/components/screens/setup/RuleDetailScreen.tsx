import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Key, HelpCircle, Skull } from 'lucide-react-native';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { ToggleOption } from '@/games/impostor/components/shared/ToggleOption';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { theme } from '@/theme';
import { hapticsService } from '@/core/haptics/hapticsService';

const RULE_INFO = {
  lastChance: {
    title: 'Última Chance',
    icon: (color: string) => <Key size={24} color={color} />,
    accentColor: '#F59E0B',
    shortDesc: 'Permite ao impostor tentar adivinhar a palavra secreta se for descoberto.',
    howItWorks:
      'Quando o impostor for o mais votado na rodada, antes da vitória dos civis ser declarada, ele tem uma última chance de digitar o palpite exato da palavra secreta.',
    impact:
      'Mantém a tensão até o último segundo! O impostor precisa prestar muita atenção nas pistas dos outros durante toda a rodada para tentar adivinhar a palavra caso seja pego.',
    recommendation:
      'Regra oficial e recomendada para a maioria das partidas. Adiciona grande reviravolta.',
  },
  partialGuess: {
    title: 'Acerto Parcial',
    icon: (color: string) => <HelpCircle size={24} color={color} />,
    accentColor: '#06B6D4',
    shortDesc: 'Aceita palpites com sentido similar ou pequenas variações de escrita.',
    howItWorks:
      'Ao chutar a palavra, sinônimos diretos ou termos estreitamente relacionados são aceitos como resposta correta (ex: "Carro" aceita "Automóvel").',
    impact:
      'Reduz a frustração de perder por uma diferença gramatical ou termo muito específico quando o impostor captou a ideia central.',
    recommendation:
      'Ótimo para jogar com crianças ou palavras em outros idiomas.',
  },
  civilianAccusedMeansImpostorWins: {
    title: 'Escolha Errada É Fim de Jogo',
    icon: (color: string) => <Skull size={24} color={color} />,
    accentColor: '#F43F5E',
    shortDesc: 'Se o grupo eliminar um inocente na votação, o impostor vence na hora.',
    howItWorks:
      'Os civis não têm segunda chance. Caso votem na maioria em alguém que não seja o impostor, a rodada se encerra com vitória imediata do infiltrado.',
    impact:
      'Aumenta drasticamente o nível de suspense e cautela nas discussões. Ninguém pode votar no impulso.',
    recommendation:
      'Para jogadores experientes que querem partidas de alta tensão e risco elevado.',
  },
};

export function RuleDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();
  const typeKey = (params.type || 'lastChance') as keyof typeof RULE_INFO;
  const info = RULE_INFO[typeKey] || RULE_INFO.lastChance;

  const { settings, updateSettings } = useImpostorStore();
  const currentRules = settings.votingRules || {
    accusationMode: 'one_at_a_time',
    lastChance: true,
    partialGuess: false,
    civilianAccusedMeansImpostorWins: false,
  };

  const [enabled, setEnabled] = useState<boolean>(Boolean(currentRules[typeKey]));

  const handleToggle = (val: boolean) => {
    hapticsService.triggerSelection();
    setEnabled(val);
  };

  const handleConfirm = () => {
    updateSettings({
      votingRules: {
        ...currentRules,
        [typeKey]: enabled,
      },
    });
    router.back();
  };

  return (
    <SettingsScreenLayout
      title={info.title}
      subtitle={enabled ? 'Ativado' : 'Desativado'}
      confirmButtonText="SALVAR REGRA"
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
          Dinâmica do jogo
        </Typography>
        <Typography variant="body" color={theme.colors.textSecondary} style={styles.bodyText}>
          {info.impact}
        </Typography>
      </View>

      <View style={[styles.card, styles.tipCard]}>
        <Typography variant="body" bold style={{ color: info.accentColor, marginBottom: 6 }}>
          💡 Dica do grupo
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
    backgroundColor: 'rgba(244, 63, 94, 0.06)',
    borderColor: 'rgba(244, 63, 94, 0.25)',
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
