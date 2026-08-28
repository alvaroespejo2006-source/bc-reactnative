// src/hooks/useItems.ts
// La API (JSONPlaceholder) da title/body de relleno en latín.
// Mapeamos esos posts a nuestro dominio, pero usamos nombres reales
// de plantas del vivero en vez del texto en latín del title.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateItemPayload, Item } from '../types';

export const ITEMS_QUERY_KEY = ['plants'] as const;

const PLANT_NAMES = [
  'Suculenta Echeveria',
  'Ficus Lyrata',
  'Rosal Rojo',
  'Orégano',
  'Sábila',
  'Cactus San Pedro',
  'Albahaca',
  'Orquídea Phalaenopsis',
  'Potos',
  'Girasol',
  'Lavanda',
  'Bugambilia',
  'Jazmín',
  'Menta',
  'Romero',
];

const CATEGORIES = ['Suculenta', 'Árbol de interior', 'Hierba aromática', 'Planta de flor', 'Cactus'];
const SUPPLIERS = ['Vivero El Rosal', 'Plantas Verdes S.A.S.', 'Agroinsumos del Valle'];
const LIGHTS = ['Luz directa', 'Luz indirecta', 'Sol pleno', 'Semi-sombra'];
const WATERINGS = ['Cada 3-4 días', 'Cada 7 días', 'Cada 15 días', 'Cada 20 días'];

interface RawPost {
  id: number;
  title: string;
  body: string;
}

function mapPostToPlant(post: RawPost): Item {
  const idx = post.id % 5;
  return {
    id: post.id,
    // Usamos el nombre real de planta según el id, no el title en latín
    name: PLANT_NAMES[(post.id - 1) % PLANT_NAMES.length],
    // El body en latín lo usamos como "descripción de catálogo" genérica,
    // o puedes reemplazarlo también si prefieres texto 100% coherente:
    description: post.body,
    category: CATEGORIES[idx % CATEGORIES.length],
    supplier: SUPPLIERS[post.id % SUPPLIERS.length],
    price: 5000 + (post.id % 12) * 7000,
    light: LIGHTS[post.id % LIGHTS.length],
    watering: WATERINGS[post.id % WATERINGS.length],
  };
}

export function useItems() {
  return useQuery<Item[]>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<RawPost[]>('/posts?_limit=15');
      return data.map(mapPostToPlant);
    },
  });
}

export function useItemById(id: string | number) {
  return useQuery<Item>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<RawPost>(`/posts/${id}`);
      return mapPostToPlant(data);
    },
    enabled: !!id,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, CreateItemPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<RawPost>('/posts', {
        title: payload.name,
        body: payload.description,
        userId: 1,
      });
      return { ...payload, id: data.id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('No se pudo crear la planta:', error.message);
    },
  });
}