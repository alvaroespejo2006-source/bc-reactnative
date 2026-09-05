// src/hooks/useItems.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateItemPayload, Item, UpdateItemPayload } from '../types';

export const ITEMS_QUERY_KEY = ['plants'] as const;

const CATEGORIES = ['Suculenta', 'Árbol de interior', 'Hierba aromática', 'Planta de flor', 'Cactus'];
const SUPPLIERS = ['Vivero El Rosal', 'Plantas Verdes S.A.S.', 'Agroinsumos del Valle'];
const PLANT_NAMES = [
  'Suculenta Echeveria', 'Ficus Lyrata', 'Rosal Rojo', 'Orégano', 'Sábila',
  'Cactus San Pedro', 'Albahaca', 'Orquídea Phalaenopsis', 'Potos', 'Girasol',
  'Lavanda', 'Bugambilia', 'Jazmín', 'Menta', 'Romero',
];

interface RawPost {
  id: number;
  title: string;
  body: string;
}

function mapPostToPlant(post: RawPost): Item {
  const idx = post.id % 5;
  return {
    id: post.id,
    name: PLANT_NAMES[(post.id - 1) % PLANT_NAMES.length],
    description: post.body,
    category: CATEGORIES[idx % CATEGORIES.length],
    supplier: SUPPLIERS[post.id % SUPPLIERS.length],
    price: 5000 + (post.id % 12) * 7000,
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
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, UpdateItemPayload>({
    mutationFn: async (payload) => {
      const { id, ...rest } = payload;
      const { data } = await apiClient.put<RawPost>(`/posts/${id}`, {
        title: rest.name,
        body: rest.description,
        userId: 1,
      });
      return { ...rest, id: data.id ?? id };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ITEMS_QUERY_KEY, variables.id] });
    },
  });
}