
// src/types/register.types.ts

export interface RegisterPayload {
  userId: string;
  nombre: string;
  upaterno: string;
  uamaterno: string;
  correo: string;
  password: string;
  rolId: number;
  disciplinas: number[];
}
