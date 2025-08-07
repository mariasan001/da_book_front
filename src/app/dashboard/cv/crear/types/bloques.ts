// Define los IDs válidos para cada tipo de bloque en el CV
export type BloqueID =
  | 'presentacion'
  | 'fraseYRedes'
  | 'lineaTiempo'
  | 'galeria'
  | 'educacion'
  | 'cursos';

// Interfaz que representa un bloque individual
export interface Bloque {
  id: BloqueID;           // identificador interno del bloque
  nombre: string;         // nombre legible para mostrar en UI (opcional)
  activo: boolean;        // indica si el bloque se debe renderizar
  orden: number;          // posición dentro del layout final
}
