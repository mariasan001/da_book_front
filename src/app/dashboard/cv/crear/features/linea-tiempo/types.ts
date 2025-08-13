
export type TimelineItem = {
  id: string;
  fecha: string;
  titulo: string;
  descripcion?: string;
  enlace?: string;
};

export type Modo = 'editar' | 'vista';
