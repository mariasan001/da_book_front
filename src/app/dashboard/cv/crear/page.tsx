'use client';
import { useMemo, useState } from 'react';
import { blockMapper } from './lib/blockMapper';
import type { Bloque } from './types/bloques';
import type { Modo } from './types/modo';

const BLOQUES_BASE: Bloque[] = [
  { id: 'presentacion', nombre: 'Presentación', activo: true, orden: 1 },
  { id: 'fraseYRedes', nombre: 'Frase + Redes', activo: true, orden: 2 },
  { id: 'lineaTiempo', nombre: 'Línea de tiempo', activo: true, orden: 3 },
  { id: 'galeria', nombre: 'Galería', activo: true, orden: 4 },
  { id: 'educacion', nombre: 'Educación', activo: true, orden: 5 },
  { id: 'cursos', nombre: 'Cursos', activo: false, orden: 6 },
];

export default function CrearCV() {
  const [modo, setModo] = useState<Modo>('editar');
  const toggleModo = () => setModo(m => (m === 'editar' ? 'vista' : 'editar'));

  const activosOrdenados = useMemo(
    () => BLOQUES_BASE.filter(b => b.activo).sort((a, b) => a.orden - b.orden),
    []
  ); 

  return (
    <main style={{ position: 'relative', padding: 24 }}>
      {activosOrdenados.map(bloque => {
        const Componente = blockMapper[bloque.id];
        if (!Componente) return null; 
        return <Componente key={bloque.id} modo={modo} />;
      })}

      {/* FAB global */}
      <button
        type="button"
        onClick={toggleModo}
        aria-label={modo === 'editar' ? 'Cambiar a vista' : 'Cambiar a edición'}
        title={modo === 'editar' ? 'Vista' : 'Editar'}
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          border: 'none',
          background: '#111',
          color: '#fff',
          fontSize: 22,
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,.25)',
        }}
      >
        {modo === 'editar' ? '👁️' : '✏️'}
      </button>
    </main>
  );
}
/**
 * ahora ya no tinene erroes pero ahora cmo funciona 
 * ya que anrtes lo tenia en compoente.tsx ahora esta en factures/presentacion 
 * y viene todo lo que creamos  que sigue ?? para que agoea tme este 
 */