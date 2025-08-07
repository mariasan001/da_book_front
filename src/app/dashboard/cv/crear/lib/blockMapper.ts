// src/lib/blockMapper.ts

// Importa cada componente visual (bloques) que vas a usar


// Define el tipo de claves (opcional si usas TS)
import { BloqueID } from '@/app/dashboard/cv/crear/types/bloques';
import Presentacion from '../components/Presentacion';

// Crea el mapper: cada clave representa el ID de un bloque
export const blockMapper: Record<BloqueID, React.FC> = {
  presentacion: Presentacion,
  fraseYRedes: undefined,
  lineaTiempo: undefined,
  galeria: undefined,
  educacion: undefined,
  cursos: undefined
};
