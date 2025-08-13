export type Modo = 'editar' | 'vista';

export interface PresentacionData {
  nombre: string;
  usuario: string;
  bio: string;          // soporta [mark]...[/mark]
  imagen: string;       // url o objectURL
  pais: string;
  alumnos: number;
  articulos: number;
}
