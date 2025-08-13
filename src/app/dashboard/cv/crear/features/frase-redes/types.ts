export type Modo = 'editar' | 'vista';

export type SocialKind = 'spotify' | 'youtube' | 'instagram' | 'procesos' | 'web';

export type Social = {
  id: string;
  tipo: SocialKind;
  url: string;
  label: string;
};

export type LayoutKind = 'contenido-izq' | 'redes-izq';

export interface FraseRedesData {
  frase: string;
  descripcion: string;
  redes: Social[];
}
