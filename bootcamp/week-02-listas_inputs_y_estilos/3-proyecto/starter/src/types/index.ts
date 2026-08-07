// ============================================
// TYPES — Semana 02
// Dominio asignado: Vivero de plantas.
// ============================================

export interface Item {
  id: string;
  /** Nombre o título principal del elemento */
  name: string;
  // --- Implementación del aprendiz (Álvaro Enrique Espejo Barreto) ---
  category: string; // categoría de la planta
  supplier: string; // proveedor que abastece la planta
  price: number; // precio de venta al público
}

export type PlantCategory =
  | 'Suculenta'
  | 'Árbol de interior'
  | 'Arbusto ornamental'
  | 'Hierba aromática'
  | 'Planta de flor'
  | 'Cactus';