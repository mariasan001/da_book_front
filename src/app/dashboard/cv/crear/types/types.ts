export type TipoElemento = 'contenedor' | 'linea' | 'texto' | 'imagen' // etc.

export interface ElementoCV {
  id: string;
  type: TipoElemento;
  content?: string;
  style?: Record<string, string | number>;
  width?: number;
  height?: number;
  x?: number;
  y?: number;

  // (Opcional) Lista de acciones para el menú contextual
  actions?: {
    label: string;
    action: () => void;
  }[];
}
export interface EditorContextType {
  elements: ElementoCV[];
  selectedElement: string | null;
  addElement: (type: ElementoCV['type']) => void;
  selectElement: (id: string) => void;
  updateElementStyle: (prop: string, value: string | number) => void;
  updateElement: (id: string, updates: Partial<ElementoCV>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void; // ✅ AGREGADO AQUÍ
  getElementById: (id: string) => ElementoCV | undefined;
}

