// Tipos disponibles de elementos en el editor
export type TipoElemento =
  | 'contenedor'
  | 'linea'
  | 'texto'
  | 'imagen'
  | 'flecha'
  | 'titulo'
  | 'icono'; // ✅ Agregado 'icono'

// Elemento base del editor
export interface ElementoCV {
  id: string;
  type: TipoElemento;
  content?: string;

  // Estilos dinámicos aplicables a cada tipo
  style?: Record<string, string | number>;

  // Tamaño del elemento (opcional)
  width?: number;
  height?: number;

  // Posición en el canvas
  x?: number;
  y?: number;

  // Rotación opcional
  rotation?: number;

  // Icono específico (solo si type === 'icono')
  iconName?: string; // ✅ Agregado

  // Acciones para menú contextual (opcional)
  actions?: {
    label: string;
    action: () => void;
  }[];
}

// Contexto global del editor
export interface EditorContextType {
  elements: ElementoCV[];
  selectedElement: string | null;

  // Agregar nuevo elemento (con props extra opcionales)
  addElement: (
    type: ElementoCV['type'],
    extraProps?: Partial<ElementoCV> // ✅ Para iconName, etc.
  ) => void;

  // Selección y edición
  selectElement: (id: string) => void;
  updateElementStyle: (prop: string, value: string | number) => void;
  updateElement: (id: string, updates: Partial<ElementoCV>) => void;

  // Manejo de elementos
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  getElementById: (id: string) => ElementoCV | undefined;
}
