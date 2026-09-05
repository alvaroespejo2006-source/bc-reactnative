// src/screens/CreateScreen.tsx

import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useCreateItem } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();
  const { mutate: createItem, isPending } = useCreateItem();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: { name: '', category: '', supplier: '', price: 0, description: '' },
  });

  function onSubmit(data: ItemFormData): void {
    createItem(data, { onSuccess: () => navigation.goBack() });
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionLabel}>Datos de la nueva planta</Text>

        <FormField control={control} name="name" label="Nombre" placeholder="Ej. Suculenta Echeveria" errorMessage={errors.name?.message} />
        <FormField control={control} name="category" label="Categoría" placeholder="Ej. Suculenta" errorMessage={errors.category?.message} />
        <FormField control={control} name="supplier" label="Proveedor" placeholder="Ej. Vivero El Rosal" errorMessage={errors.supplier?.message} />
        <FormField control={control} name="price" label="Precio" placeholder="Ej. 15000" keyboardType="numeric" errorMessage={errors.price?.message} />
        <FormField control={control} name="description" label="Descripción" placeholder="Descripción de la planta..." multiline numberOfLines={4} errorMessage={errors.description?.message} />

        <Pressable style={[styles.button, isPending && styles.buttonDisabled]} onPress={handleSubmit(onSubmit)} disabled={isPending}>
          {isPending ? <ActivityIndicator size="small" color={COLORS.background} /> : <Text style={styles.buttonText}>Agregar planta</Text>}
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
  button: { backgroundColor: COLORS.accent, borderRadius: RADIUS.sm, padding: SPACING.md, alignItems: 'center', marginTop: SPACING.sm },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});