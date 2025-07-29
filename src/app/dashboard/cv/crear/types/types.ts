// Tipos disponibles de elementos en el editor
export type TipoElemento =
  | 'contenedor'
  | 'linea'
  | 'texto'
  | 'imagen'
  | 'flecha'
  | 'titulo'; // ✅ Agregado 'titulo'

// Elemento base del editor
export interface ElementoCV {
  id: string;
  type: TipoElemento;
  content?: string;
  style?: Record<string, string | number>;
  width?: number;
  height?: number;
  x?: number;
  y?: number;

  // ✅ Nueva propiedad para permitir rotación del elemento
  rotation?: number;

  // Acciones opcionales para menú contextual
  actions?: {
    label: string;
    action: () => void;
  }[];
}

// Contexto del editor con todas las funciones necesarias
export interface EditorContextType {
  elements: ElementoCV[];
  selectedElement: string | null;
  addElement: (type: ElementoCV['type']) => void;
  selectElement: (id: string) => void;
  updateElementStyle: (prop: string, value: string | number) => void;
  updateElement: (id: string, updates: Partial<ElementoCV>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  getElementById: (id: string) => ElementoCV | undefined;
}
