'use client';

import { useState } from 'react';
import type { Modo } from '@/app/dashboard/cv/crear/types/modo';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import styles from './Educacion.module.css';

type AcadItem = { id: string; texto: string };

const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function Educacion({ modo }: { modo?: Modo }) {
  const isVista = modo === 'vista';

  // Historia (multilínea)
  const [historia, setHistoria] = useState(
    `Empecé a tocar guitarra a los 12, grabé mi primera demo en el cuarto de mi abuela, y desde entonces no he dejado de explorar.
Mi música ha sido mi diario, mi protesta, mi consuelo.
Hoy, cada canción que creo tiene una misión: acompañarte.`
  );

  // Influencias (chips)
  const [influencias, setInfluencias] = useState<string[]>([
    'Natalia Lafourcade', 'Jorge Drexler', 'Hiatus Kaiyote', 'folklore mexicano'
  ]);
  const [nuevaInfluencia, setNuevaInfluencia] = useState('');

  // Académico
  const [academico, setAcademico] = useState<AcadItem[]>([
    { id: uid(), texto: 'Lic. en Música y Producción – Universidad del Arte Sonoro' },
    { id: uid(), texto: 'Diplomado en Composición para Cine y Medios Visuales – Centro de Creadores (2022)' },
  ]);

  const addInfluencia = () => {
    const t = nuevaInfluencia.trim();
    if (!t) return;
    setInfluencias(prev => [...prev, t]);
    setNuevaInfluencia('');
  };
  const removeInfluencia = (idx: number) =>
    setInfluencias(prev => prev.filter((_, i) => i !== idx));

  const addAcademico = () =>
    setAcademico(prev => [...prev, { id: uid(), texto: '' }]);

  const updateAcademico = (id: string, texto: string) =>
    setAcademico(prev => prev.map(it => (it.id === id ? { ...it, texto } : it)));

  const removeAcademico = (id: string) =>
    setAcademico(prev => prev.filter(it => it.id !== id));

  const moveAcademico = (id: string, dir: 'up' | 'down') =>
    setAcademico(prev => {
      const i = prev.findIndex(x => x.id === id);
      const j = dir === 'up' ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const clone = [...prev];
      [clone[i], clone[j]] = [clone[j], clone[i]];
      return clone;
    });

  return (
    <section className={styles.wrap} aria-label="Educación e historia">
      <h2 className={styles.title}>CUÉNTAME TU HISTORIA</h2>

      {/* Historia */}
      {isVista ? (
        <div className={styles.story}>
          {historia.split('\n').map((line, i) => (
            <p key={i} className={styles.underlined}>{line}</p>
          ))}
        </div>
      ) : (
        <label className={styles.label}>
          <span>Historia (multilínea)</span>
          <textarea
            className={styles.textarea}
            rows={6}
            value={historia}
            onChange={(e) => setHistoria(e.target.value)}
            placeholder="Cuenta tu recorrido, motivaciones, giros..."
          />
        </label>
      )}

      {/* Influencias */}
      <div className={styles.block}>
        <strong className={styles.blockLabel}>Influencias:</strong>
        {isVista ? (
          <ul className={styles.influList}>
            {influencias.map((inf, i) => (
              <li key={`${inf}-${i}`} className={styles.influChip}>{inf}</li>
            ))}
          </ul>
        ) : (
          <div className={styles.influEditor}>
            <div className={styles.influRow}>
              <input
                className={styles.input}
                placeholder="Agregar influencia"
                value={nuevaInfluencia}
                onChange={(e) => setNuevaInfluencia(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addInfluencia()}
              />
              <button type="button" className={styles.addBtn} onClick={addInfluencia}>
                <Plus size={16} /> Agregar
              </button>
            </div>
            <ul className={styles.influListEditable}>
              {influencias.map((inf, i) => (
                <li key={`${inf}-${i}`} className={styles.influChipEditable}>
                  <span>{inf}</span>
                  <button
                    type="button"
                    className={styles.removeBadge}
                    onClick={() => removeInfluencia(i)}
                    aria-label="Eliminar"
                    title="Eliminar"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Historial académico */}
      <div className={styles.block}>
        <strong className={styles.blockLabel}>Formación académica</strong>
        {isVista ? (
          <ul className={styles.acadList}>
            {academico.map(it => (
              <li key={it.id} className={styles.acadBadge}>{it.texto}</li>
            ))}
          </ul>
        ) : (
          <>
            <div className={styles.tools}>
              <button type="button" className={styles.addBtn} onClick={addAcademico}>
                <Plus size={16} /> Agregar registro
              </button>
            </div>
            <ul className={styles.acadEditList}>
              {academico.map((it, i) => (
                <li key={it.id} className={styles.acadEditItem}>
                  <div className={styles.orderBtns}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => moveAcademico(it.id, 'up')}
                      disabled={i === 0}
                      title="Subir"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => moveAcademico(it.id, 'down')}
                      disabled={i === academico.length - 1}
                      title="Bajar"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>

                  <input
                    className={styles.input}
                    placeholder="Ej. Lic. en Música — Universidad X (Año)"
                    value={it.texto}
                    onChange={(e) => updateAcademico(it.id, e.target.value)}
                  />

                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeAcademico(it.id)}
                    aria-label="Eliminar"
                  >
                    <Trash2 size={16} />
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
