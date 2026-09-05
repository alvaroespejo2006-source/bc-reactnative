// src/types/index.ts
// Dominio: Vivero de plantas.

export interface Item {
  id: string | number;
  name: string;
  category: string;
  supplier: string;
  price: number;
  description: string;
}

export type CreateItemPayload = Omit<Item, 'id'>;
export type UpdateItemPayload = CreateItemPayload & { id: string | number };