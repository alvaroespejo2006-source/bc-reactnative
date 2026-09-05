// src/components/FormField.tsx
// Componente genérico y reutilizable: Controller + TextInput + error inline.
// Usado tanto en CreateScreen como en EditScreen.

import React from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

interface FormFieldProps<T extends FieldValues> extends Omit<TextInputProps, 'style'> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errorMessage?: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  errorMessage,
  ...textInputProps
}: FormFieldProps<T>): React.JSX.Element {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errorMessage && styles.inputError]}
            value={value !== undefined ? String(value) : ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={COLORS.textSecondary}
            {...textInputProps}
          />
        )}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: SPACING.xs },
  label: { ...TYPOGRAPHY.body, fontWeight: '600' },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 2,
  },
});