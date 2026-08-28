export interface Item {
  id: string | number;
  name: string;
  category: string;
  supplier: string;
  price: number;
  description: string;
  light: string;
  watering: string;
}

export type CreateItemPayload = Omit<Item, 'id'>;