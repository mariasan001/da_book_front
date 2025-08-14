export type Modo = 'editar' | 'vista';

export type AcadItem = { id: string; texto: string };

export type EducacionData = {
  historia: string;
  influencias: string[];
  academico: AcadItem[];
};
