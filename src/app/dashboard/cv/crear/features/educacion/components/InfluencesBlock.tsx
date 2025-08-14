'use client';

import { useState } from 'react';
import styles from '../Educacion.module.css';
import type { Modo } from '../types';
import { Plus } from 'lucide-react';

export default function InfluencesBlock({
  modo,
  values,
  onChange,
}: {
  modo: Modo;
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const isVista = modo === 'vista';
  const [draft, setDraft] = useState('');

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    onChange([...values, t]);
    setDraft('');
  };
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));

  return (
    <div className={styles.block}>
      <strong className={styles.blockLabel}>Influencias:</strong>

      {isVista ? (
        <ul className={styles.influList}>
          {values.map((inf, i) => (
            <li key={`${inf}-${i}`} className={styles.influChip}>{inf}</li>
          ))}
        </ul>
      ) : (
        <div className={styles.influEditor}>
          <div className={styles.influRow}>
            <input
              className={styles.input}
              placeholder="Agregar influencia"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && add()}
            />
            <button type="button" className={styles.addBtn} onClick={add}>
              <Plus size={16} /> Agregar
            </button>
          </div>

          <ul className={styles.influListEditable}>
            {values.map((inf, i) => (
              <li key={`${inf}-${i}`} className={styles.influChipEditable}>
                <span>{inf}</span>
                <button
                  type="button"
                  className={styles.removeBadge}
                  onClick={() => remove(i)}
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
  );
}
