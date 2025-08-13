// src/app/dashboard/cv/crear/lib/blockMapper.ts
import type { FC } from 'react';
import { BloqueID } from '@/app/dashboard/cv/crear/types/bloques';
import { Modo } from '@/app/dashboard/cv/crear/types/modo';




import Galeria from '../components/Galeria';
import Educacion from '../components/Educacion';
import PresentacionCard from '../features/presentacion/components/PresentacionCard';
import { LineaDeTiempo } from '../features/linea-tiempo';
import FraseYRedes from '../features/frase-redes/components/FraseYRedes';

// Todos los bloques deben aceptar (opcional) la prop `modo`
export type BloqueComponent = FC<{ modo?: Modo }>;

// Mapper tolerante: permite `undefined` mientras un bloque no exista aún
export const blockMapper: Record<BloqueID, BloqueComponent | undefined> = {
  presentacion: PresentacionCard,
  fraseYRedes: FraseYRedes,
  lineaTiempo: LineaDeTiempo,
  galeria: Galeria,
  educacion: Educacion,
  cursos: undefined,
};
