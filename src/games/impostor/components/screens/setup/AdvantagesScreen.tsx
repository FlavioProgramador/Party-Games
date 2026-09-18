import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Tag, Lightbulb, Shield, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { SettingsScreenLayout } from '@/games/impostor/components/shared/SettingsScreenLayout';
import { useImpostorStore } from '@/games/impostor/store/useImpostorStore';
import { theme } from '@/theme';

export function AdvantagesScreen() {
  const router = useRouter();
  const { settings } = useImpostorStore();
  const advantages = settings.impostorAdvantages || {
    seeCategory: false,
    getHint: true,
    safeStart: false,
  };

  const activeCount = Object.values(advantages).filter(Boolean).length;

  return (
    <SettingsScreenLayout
      title="Vantagens do Impostor"
      subtitle={`${activeCount} de 3 ativadas`}
      confirmButtonText="VOLTAR AO MENU"
      onConfirm={() => router.back()}
    >
      <View style={styles.introBox}>
        <Typography variant="body" color={theme.colors.textSecondary} style={{ fontSize: 14, lineHeight: 20 }}>
          Recursos de auxílio para o impostor conseguir blefar com mais segurança. Clique em cada item para ver detalhes e configurar.
        </Typography>
      </View>

      {/* Card 1: Categoria */}
      <TouchableOpacity
        style={[styles.itemCard, advantages.seeCategory && styles.itemCardActive]}
        onPress={() => router.push('/impostor/setup/advantage-detail?type=seeCategory')}
        activeOpacity={0.75}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(6, 182, 212, 0.15)', borderColor: '#06B6D4' }]}>
            <Tag size={22} color="#06B6D4" />
          </View>
          <View style={styles.textContainer}>
            <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 16 }}>
              Ver Categoria
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
              O impostor descobre a categoria temática da rodada.
            </Typography>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.badge, advantages.seeCategory ? styles.badgeActive : styles.badgeInactive]}>
            <Typography
              variant="caption"
              bold
              style={{ color: advantages.seeCategory ? '#10B981' : theme.colors.textMuted, fontSize: 11 }}
            >
              {advantages.seeCategory ? 'ATIVADO' : 'DESATIVADO'}
            </Typography>
          </View>
          <ChevronRight size={18} color={theme.colors.textSecondary} style={{ marginLeft: 6 }} />
        </View>
      </TouchableOpacity>

      {/* Card 2: Dica */}
      <TouchableOpacity
        style={[styles.itemCard, advantages.getHint && styles.itemCardActive]}
        onPress={() => router.push('/impostor/setup/advantage-detail?type=getHint')}
        activeOpacity={0.75}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: '#F59E0B' }]}>
            <Lightbulb size={22} color="#F59E0B" />
          </View>
          <View style={styles.textContainer}>
            <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 16 }}>
              Receber Pista
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
              Recebe uma pista indireta sobre a palavra secreta.
            </Typography>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.badge, advantages.getHint ? styles.badgeActive : styles.badgeInactive]}>
            <Typography
              variant="caption"
              bold
              style={{ color: advantages.getHint ? '#10B981' : theme.colors.textMuted, fontSize: 11 }}
            >
              {advantages.getHint ? 'ATIVADO' : 'DESATIVADO'}
            </Typography>
          </View>
          <ChevronRight size={18} color={theme.colors.textSecondary} style={{ marginLeft: 6 }} />
        </View>
      </TouchableOpacity>

      {/* Card 3: Início Seguro */}
      <TouchableOpacity
        style={[styles.itemCard, advantages.safeStart && styles.itemCardActive]}
        onPress={() => router.push('/impostor/setup/advantage-detail?type=safeStart')}
        activeOpacity={0.75}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(124, 58, 237, 0.15)', borderColor: '#7C3AED' }]}>
            <Shield size={22} color="#7C3AED" />
          </View>
          <View style={styles.textContainer}>
            <Typography variant="body" bold style={{ color: '#FFFFFF', fontSize: 16 }}>
              Início Seguro
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
              O impostor nunca começa falando na primeira rodada.
            </Typography>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.badge, advantages.safeStart ? styles.badgeActive : styles.badgeInactive]}>
            <Typography
              variant="caption"
              bold
              style={{ color: advantages.safeStart ? '#10B981' : theme.colors.textMuted, fontSize: 11 }}
            >
              {advantages.safeStart ? 'ATIVADO' : 'DESATIVADO'}
            </Typography>
          </View>
          <ChevronRight size={18} color={theme.colors.textSecondary} style={{ marginLeft: 6 }} />
        </View>
      </TouchableOpacity>
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
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121827',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    padding: 16,
    marginBottom: 12,
  },
  itemCardActive: {
    borderColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: '#141C2E',
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  badgeInactive: {
    backgroundColor: '#182133',
    borderColor: '#243048',
  },
});
