export type Modo = 'editar' | 'vista';

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  desc: string;
  _objectUrl?: boolean;
};
