'use client';

import { blockMapper } from './lib/blockMapper';
import { Bloque } from './types/bloques';

// Lista de bloques activos
const bloques: Bloque[] = [
  { id: 'presentacion', nombre: 'Presentación', activo: true, orden: 1 },
  { id: 'fraseYRedes', nombre: 'Frase + Redes', activo: true, orden: 2 },
  { id: 'lineaTiempo', nombre: 'Línea de tiempo', activo: false, orden: 3 },
  // otros bloques si gustas
];

export default function CrearCV() {
  return (
    <main>
      {bloques
        .filter((bloque) => bloque.activo)
        .sort((a, b) => a.orden - b.orden)
        .map((bloque) => {
          const Componente = blockMapper[bloque.id];
          if (!Componente) {
            console.warn(`No existe componente para el bloque: ${bloque.id}`);
            return null;
          }
          return <Componente key={bloque.id} />;
        })}
    </main>
  );
}
