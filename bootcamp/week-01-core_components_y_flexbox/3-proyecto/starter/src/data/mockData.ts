// ============================================================
// MOCK DATA — src/data/mockData.ts
// ============================================================
// Dominio: Vivero de plantas.
// ============================================================

import { Plant } from '../types';

export const MOCK_ITEMS: Plant[] = [
  {
    id: '1',
    name: 'Suculenta Echeveria',
    subtitle: 'Suculenta',
    imageUri: 'https://picsum.photos/seed/echeveria/300/200',
    supplier: 'Vivero El Rosal',
    price: 12000,
  },
  {
    id: '2',
    name: 'Ficus Lyrata',
    subtitle: 'Árbol de interior',
    imageUri: 'https://picsum.photos/seed/ficuslyrata/300/200',
    supplier: 'Plantas Verdes S.A.S.',
    price: 85000,
  },
  {
    id: '3',
    name: 'Rosal Rojo',
    subtitle: 'Arbusto ornamental',
    imageUri: 'https://picsum.photos/seed/rosalrojo/300/200',
    supplier: 'Vivero El Rosal',
    price: 25000,
  },
  {
    id: '4',
    name: 'Orégano',
    subtitle: 'Hierba aromática',
    imageUri: 'https://picsum.photos/seed/oregano/300/200',
    supplier: 'Agroinsumos del Valle',
    price: 8000,
  },
];