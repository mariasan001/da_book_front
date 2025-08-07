// src/services/registerService.ts

// Instancia de Axios personalizada (con baseURL, headers, etc.)
import api from '@/lib/axios';

// Tipado para disciplinas
import { Disciplina } from '@/types/disciplina';
import { RegisterPayload } from '@/types/register.types';

// Tipado para el payload del registro


/**
 * Obtiene los roles disponibles desde la API.
 * Usado para mostrar opciones como "alumno", "artista", etc.
 * 
 * Endpoint: GET /register/roles
 * Respuesta: Array de objetos con id y descripción
 */
export const getAvailableRoles = () => api.get('/register/roles');

/**
 * Obtiene la lista de disciplinas artísticas disponibles desde la API.
 * Tipado con Disciplina[] para asegurar la estructura correcta.
 * 
 * Endpoint: GET /register/disciplinas
 */
export const getDisciplinas = () => api.get<Disciplina[]>('/register/disciplinas');

/**
 * Registra un nuevo usuario en el sistema.
 * Envía los datos al backend según el esquema:
 * {
 *   userId: string;
 *   nombre: string;
 *   upaterno: string;
 *   uamaterno: string;
 *   correo: string;
 *   password: string;
 *   rolId: number;
 *   disciplinas: number[];
 * }
 * 
 * Endpoint: POST /register
 * Retorna los datos de la respuesta si el registro fue exitoso.
 */
export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await api.post('/register', payload);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error en el registro:', error.response?.data || error.message);
    throw error;
  }
};
