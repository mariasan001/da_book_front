export type Modo = 'editar' | 'vista';

export type GalleryItem = {
  id: string;
  src: string;        // URL (objectURL o remota)
  title: string;
  desc: string;
  _objectUrl?: boolean; // si es un objectURL para revocarlo
};
