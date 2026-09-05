// src/screens/EditScreen.tsx

import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useItemById, useUpdateItem } from '../hooks/useItems';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  const { data: item, isLoading } = useItemById(id);
  const { mutate: updateItem, isPending } = useUpdateItem();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: { name: '', category: '', supplier: '', price: 0, description: '' },
  });

  // PASO clave del EditScreen: cargar los datos reales cuando lleguen de la API
  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        category: item.category,
        supplier: item.supplier,
        price: item.price,
        description: item.description,
      });
    }
  }, [item, reset]);

  function onSubmit(data: ItemFormData): void {
    updateItem({ id, ...data }, { onSuccess: () => navigation.goBack() });
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionLabel}>Editar planta</Text>

        <FormField control={control} name="name" label="Nombre" errorMessage={errors.name?.message} />
        <FormField control={control} name="category" label="Categoría" errorMessage={errors.category?.message} />
        <FormField control={control} name="supplier" label="Proveedor" errorMessage={errors.supplier?.message} />
        <FormField control={control} name="price" label="Precio" keyboardType="numeric" errorMessage={errors.price?.message} />
        <FormField control={control} name="description" label="Descripción" multiline numberOfLines={4} errorMessage={errors.description?.message} />

        <Pressable style={[styles.button, isPending && styles.buttonDisabled]} onPress={handleSubmit(onSubmit)} disabled={isPending}>
          {isPending ? <ActivityIndicator size="small" color={COLORS.background} /> : <Text style={styles.buttonText}>Guardar cambios</Text>}
        </Pressable>

        <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  sectionLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background },
  button: { backgroundColor: COLORS.accent, borderRadius: RADIUS.sm, padding: SPACING.md, alignItems: 'center', marginTop: SPACING.sm },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});