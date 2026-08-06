// ============================================================
// TYPES — src/types/index.ts
// ============================================================
// Dominio asignado: Vivero de plantas.
// ============================================================

// --- Implementación del aprendiz (Álvaro Enrique Espejo Barreto) ---
export interface Plant {
  id: string;
  name: string;
  imageUri: string;
  subtitle: string; // categoría de la planta
  supplier: string; // proveedor que abastece la planta
  price: number; // precio de venta al público
}