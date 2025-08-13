'use client';

import React, { useState } from 'react';
import styles from '../FraseYRedes.module.css';
import type { LayoutKind, Modo, FraseRedesData, Social } from '../types';
import { RefreshCw } from 'lucide-react';
import QuoteAndDescView from './QuoteAndDescView';
import SocialCardsView from './SocialCardsView';
import SocialEditorList from './SocialEditorList';
import { uid } from '../hooks/useUid';

const DEFAULT_DATA: FraseRedesData = {
  frase: '“CADA NOTA, CADA ACORDE, CADA SILENCIO… ES PARTE DE MI HISTORIA.”',
  descripcion:
    'Desde sonidos acústicos que sanan hasta composiciones experimentales que rompen moldes, mi obra busca provocar, emocionar y conectar. Aquí puedes escuchar mi universo:',
  redes: [
    { id: uid(), tipo: 'spotify',   url: 'https://soundcloud.com/', label: 'SoundCloud / Spotify' },
    { id: uid(), tipo: 'youtube',   url: 'https://youtube.com/',    label: 'YouTube con performances' },
    { id: uid(), tipo: 'instagram', url: 'https://instagram.com/',  label: 'Instagram con ensayos' },
    { id: uid(), tipo: 'procesos',  url: '#',                       label: 'Procesos creativos' },
  ],
};

export default function FraseYRedes({
  modo = 'editar',
  layout,
  initial = DEFAULT_DATA,
}: {
  modo?: Modo;
  layout?: LayoutKind;
  initial?: FraseRedesData;
}) {
  const isVista = modo === 'vista';

  // Layout controlado/ interno
  const [internalLayout, setInternalLayout] = useState<LayoutKind>('contenido-izq');
  const effectiveLayout = layout ?? internalLayout;

  // Estado
  const [frase, setFrase] = useState(initial.frase);
  const [descripcion, setDescripcion] = useState(initial.descripcion);
  const [redes, setRedes] = useState<Social[]>(initial.redes);

  // Mutadores redes
  const addRed     = () => setRedes(p => [...p, { id: uid(), tipo: 'web', url: '', label: 'Nuevo enlace' }]);
  const updateRed  = (id: string, patch: Partial<Social>) =>
    setRedes(p => p.map(r => (r.id === id ? { ...r, ...patch } : r)));
  const removeRed  = (id: string) => setRedes(p => p.filter(r => r.id !== id));

  const swapLayout = () =>
    setInternalLayout(l => (l === 'contenido-izq' ? 'redes-izq' : 'contenido-izq'));

  return (
    <section className={`${styles.wrap} ${effectiveLayout === 'redes-izq' ? styles.reverse : ''}`}>
      {/* Columna Frase/Descripción */}
      <div className={styles.left}>
        {isVista ? (
          <QuoteAndDescView frase={frase} descripcion={descripcion} />
        ) : (
          <>
            {layout === undefined && (
              <button type="button" onClick={swapLayout} className={styles.swapBtn} title="Intercambiar columnas">
                <RefreshCw size={16} /> Intercambiar columnas
              </button>
            )}

            <label className={styles.label}>
              <span>Frase</span>
              <textarea
                className={styles.input}
                rows={2}
                value={frase}
                onChange={(e) => setFrase(e.target.value)}
                placeholder="Escribe tu frase principal"
              />
            </label>

            <label className={styles.label}>
              <span>Descripción</span>
              <textarea
                className={styles.input}
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Texto introductorio"
              />
            </label>
          </>
        )}
      </div>

      {/* Columna Tarjetas */}
      <div className={styles.right}>
        {isVista ? (
          <SocialCardsView redes={redes} />
        ) : (
          <SocialEditorList
            redes={redes}
            onAdd={addRed}
            onUpdate={updateRed}
            onRemove={removeRed}
          />
        )}
      </div>
    </section>
  );
}
