// src/schemas/itemSchema.ts
// Schema Zod para el formulario de plantas del vivero.

import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  category: z.string().min(2, 'La categoría debe tener al menos 2 caracteres'),
  supplier: z.string().min(2, 'El proveedor debe tener al menos 2 caracteres'),
  price: z.coerce.number().positive('El precio debe ser mayor que 0'),
  description: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
});

export type ItemFormData = z.infer<typeof itemSchema>;