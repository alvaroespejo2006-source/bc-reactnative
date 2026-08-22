// src/types/index.ts
// Dominio: Vivero de plantas.

export interface Item {
  id: string;
  name: string;
  category: string;      // tipo de planta
  supplier: string;       // proveedor que abastece la planta
  price: number;          // precio de venta
  description: string;    // descripción para la ficha de detalle
  light: string;           // requerimiento de luz
  watering: string;        // frecuencia de riego
}

export type PlantCategory =
  | 'Suculenta'
  | 'Árbol de interior'
  | 'Arbusto ornamental'
  | 'Hierba aromática'
  | 'Planta de flor'
  | 'Cactus';