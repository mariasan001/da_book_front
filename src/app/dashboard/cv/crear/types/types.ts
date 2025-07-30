import type { CSSProperties } from 'react';

// Tipos disponibles de elementos en el editor
export type TipoElemento =
  | 'contenedor'
  | 'linea'
  | 'texto'
  | 'imagen'
  | 'mosaico'   // 🧩 tipo independiente para múltiples imágenes
  | 'enlace'
  | 'video'
  | 'flecha'
  | 'titulo'
  | 'icono';

// Elemento base del editor
export interface ElementoCV {
  id: string;
  type: TipoElemento;

  // ✅ Ahora permite string (para imagen normal) o string[] (para mosaico)
  content?: string | string[];

  // ✅ Estilos CSS aplicables al elemento
  style?: CSSProperties;

  // Tamaño (opcional)
  width?: number;
  height?: number;

  // Posición absoluta
  x?: number;
  y?: number;

  // Rotación
  rotation?: number;

  // Icono específico (solo si type === 'icono')
  iconName?: string;

  // ✅ Props específicas para mosaico
  columns?: number;
  spacing?: number;

  // Acciones para el menú contextual (opcional)
  actions?: {
    label: string;
    action: () => void;
  }[];
}

// Contexto global del editor
export interface EditorContextType {
  elements: ElementoCV[];
  selectedElement: string | null;

  addElement: (
    type: ElementoCV['type'],
    extraProps?: Partial<ElementoCV>
  ) => void;

  selectElement: (id: string) => void;
  updateElementStyle: (prop: string, value: string | number) => void;
  updateElement: (id: string, updates: Partial<ElementoCV>) => void;

  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  getElementById: (id: string) => ElementoCV | undefined;
}
