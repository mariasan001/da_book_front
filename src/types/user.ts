export interface Role {
  id: number;
  description: string;
}

export interface Funcionalidad {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface Licencia {
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  funcionalidades: Funcionalidad[];
}

export interface Disciplina {
  id: number;
  nombre: string;
}

export interface User {
  userId: string;
  nombrue: string;
  uapaterno: string;
  uamaterno: string;
  correo: string;
  active: boolean;
  roles: Role[];
  licencias: Licencia[];
  disciplinas: Disciplina[];
}
