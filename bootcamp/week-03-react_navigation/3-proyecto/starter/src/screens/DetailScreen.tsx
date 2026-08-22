// src/screens/DetailScreen.tsx
// Ficha de detalle de la planta seleccionada.

import { useRoute, type RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type DetailScreenRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailScreenRouteProp>();
  const { id, name, category, price } = route.params;

  // Datos extra que no viajan en los params (descripción, luz, riego, proveedor)
  const plant = ITEMS.find((item) => item.id === id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{category}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Precio</Text>
        <Text style={styles.fieldValue}>${price.toLocaleString('es-CO')}</Text>
      </View>

      {plant && (
        <>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Proveedor</Text>
            <Text style={styles.fieldValue}>{plant.supplier}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Luz</Text>
            <Text style={styles.fieldValue}>{plant.light}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Riego</Text>
            <Text style={styles.fieldValue}>{plant.watering}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Descripción</Text>
            <Text style={styles.fieldValue}>{plant.description}</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
    gap: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.md,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.accent,
  },
  field: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
  },
});