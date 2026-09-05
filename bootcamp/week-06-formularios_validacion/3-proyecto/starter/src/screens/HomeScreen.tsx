// src/screens/HomeScreen.tsx

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useItems } from '../hooks/useItems';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function ItemCard({ item, onPress }: { item: Item; onPress: () => void }): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
      onPress={onPress}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.cardAvatar}>
        <Text style={styles.cardAvatarText}>{item.name.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {item.supplier} · ${item.price.toLocaleString('es-CO')}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.chevron}>✎</Text>
    </Pressable>
  );
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();
  const { data, isLoading, isError, isFetching, refetch } = useItems();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ No se pudo cargar el catálogo</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ItemCard
      item={item}
      onPress={() => navigation.navigate('Edit', { id: item.id, name: item.name })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        ListHeaderComponent={
          <Text style={styles.countLabel}>Toca una planta para editarla</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  separator: { height: SPACING.sm },
  countLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', marginBottom: SPACING.sm },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    borderRadius: RADIUS.md, padding: SPACING.md, borderWidth: 1,
    borderColor: COLORS.border, gap: SPACING.md,
  },
  cardAvatar: {
    width: 44, height: 44, borderRadius: RADIUS.sm, backgroundColor: COLORS.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  cardAvatarText: { ...TYPOGRAPHY.h3, color: COLORS.accent },
  cardContent: { flex: 1, gap: SPACING.xs },
  cardTitle: { ...TYPOGRAPHY.body, fontWeight: '600' },
  cardSubtitle: { ...TYPOGRAPHY.caption },
  badge: {
    alignSelf: 'flex-start', backgroundColor: COLORS.surface, borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm, paddingVertical: 2,
  },
  badgeText: { fontSize: 11, fontWeight: '600' as const, color: COLORS.accent },
  chevron: { fontSize: 18, color: COLORS.textMuted },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  retryButton: {
    backgroundColor: COLORS.accent, borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm,
  },
  retryButtonText: { ...TYPOGRAPHY.body, color: COLORS.background, fontWeight: '600' },
});