'use client';

import { useState, type ReactElement } from 'react';
import type { Modo } from '@/app/dashboard/cv/crear/types/modo';
import { Instagram, Film, Camera, Pencil, Globe, Headphones, Plus, Trash2, RefreshCw } from 'lucide-react';
import styles from './FraseYRedes.module.css';

const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

type SocialKind = 'spotify' | 'youtube' | 'instagram' | 'procesos' | 'web';
type Social = { id: string; tipo: SocialKind; url: string; label: string };

// ✅ iconos tipados con ReactElement
const iconFor: Record<SocialKind, ReactElement> = {
  spotify:   <Headphones size={28} aria-hidden />,
  youtube:   <Film size={28} aria-hidden />,
  instagram: <Camera size={28} aria-hidden />,
  procesos:  <Pencil size={28} aria-hidden />,
  web:       <Globe size={28} aria-hidden />,
};

type Props = {
  modo?: Modo;
  /**
   * Control externo (opcional):
   * - 'contenido-izq': frase/desc a la izquierda, tarjetas a la derecha
   * - 'redes-izq'   : tarjetas a la izquierda, frase/desc a la derecha
   */
  layout?: 'contenido-izq' | 'redes-izq';
};

export default function FraseYRedes({ modo, layout }: Props) {
  const isVista = modo === 'vista';

  // si NO te pasan layout como prop, queda editable internamente
  const [internalLayout, setInternalLayout] = useState<'contenido-izq' | 'redes-izq'>('contenido-izq');
  const effectiveLayout = layout ?? internalLayout;

  const [frase, setFrase] = useState('“CADA NOTA, CADA ACORDE, CADA SILENCIO… ES PARTE DE MI HISTORIA.”');
  const [descripcion, setDescripcion] = useState(
    'Desde sonidos acústicos que sanan hasta composiciones experimentales que rompen moldes, mi obra busca provocar, emocionar y conectar. Aquí puedes escuchar mi universo:'
  );

  const [redes, setRedes] = useState<Social[]>([
    { id: uid(), tipo: 'spotify',   url: 'https://soundcloud.com/', label: 'SoundCloud / Spotify' },
    { id: uid(), tipo: 'youtube',   url: 'https://youtube.com/',    label: 'YouTube con performances' },
    { id: uid(), tipo: 'instagram', url: 'https://instagram.com/',  label: 'Instagram con ensayos' },
    { id: uid(), tipo: 'procesos',  url: '#',                       label: 'Procesos creativos' },
  ]);

  const addRed     = () => setRedes(p => [...p, { id: uid(), tipo: 'web', url: '', label: 'Nuevo enlace' }]);
  const updateRed  = (id: string, patch: Partial<Social>) => setRedes(p => p.map(r => r.id === id ? { ...r, ...patch } : r));
  const removeRed  = (id: string) => setRedes(p => p.filter(r => r.id !== id));
  const swapLayout = () => setInternalLayout(l => (l === 'contenido-izq' ? 'redes-izq' : 'contenido-izq'));

  return (
    <section className={`${styles.wrap} ${effectiveLayout === 'redes-izq' ? styles.reverse : ''}`}>
      {/* Columna Frase/Descripción */}
      <div className={styles.left}>
        {isVista ? (
          <>
            <h2 className={styles.quote}>
              “CADA NOTA, CADA ACORDE, CADA SILENCIO… <span className={styles.accent}>ES PARTE DE MI HISTORIA</span>.”
            </h2>
            <p className={styles.desc}>{descripcion}</p>
          </>
        ) : (
          <>
            {/* toggle solo si NO controlas layout por prop */}
            {layout === undefined && (
              <button type="button" onClick={swapLayout} className={styles.swapBtn} title="Invertir columnas">
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
          <ul className={styles.cardGrid}>
            {redes.filter(r => r.url?.trim()).map((r, idx) => (
              <li key={r.id}>
                <a
                  className={`${styles.card} ${idx === 0 ? styles.cardPrimary : ''}`}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.cardIcon}>{iconFor[r.tipo]}</div>
                  <div className={styles.cardText}>{r.label}</div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className={styles.rowHeader}>
              <span className={styles.rowTitle}>Redes</span>
              <button type="button" className={styles.iconBtn} onClick={addRed} title="Agregar">
                <Plus size={18} />
              </button>
            </div>
            <ul className={styles.editList}>
              {redes.map(r => (
                <li key={r.id} className={styles.editItem}>
                  <select
                    className={styles.select}
                    value={r.tipo}
                    onChange={(e) => updateRed(r.id, { tipo: e.target.value as SocialKind })}
                  >
                    <option value="spotify">SoundCloud / Spotify</option>
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="procesos">Procesos creativos</option>
                    <option value="web">Sitio web</option>
                  </select>
                  <input
                    className={styles.input}
                    placeholder="Etiqueta visible"
                    value={r.label}
                    onChange={(e) => updateRed(r.id, { label: e.target.value })}
                  />
                  <input
                    className={styles.input}
                    placeholder="https://..."
                    value={r.url}
                    onChange={(e) => updateRed(r.id, { url: e.target.value })}
                  />
                  <button
                    type="button"
                    className={styles.iconBtnDanger}
                    onClick={() => removeRed(r.id)}
                    aria-label="Eliminar"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
