'use client';
import React from 'react';
import styles from '../FraseYRedes.module.css';
import type { Social, SocialKind } from '../types';
import { Plus, Trash2 } from 'lucide-react';

export default function SocialEditorList({
  redes, onAdd, onUpdate, onRemove,
}: {
  redes: Social[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<Social>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <>
      <div className={styles.rowHeader}>
        <span className={styles.rowTitle}>Redes</span>
        <button type="button" className={styles.iconBtn} onClick={onAdd} title="Agregar">
          <Plus size={18} />
        </button>
      </div>

      <ul className={styles.editList}>
        {redes.map(r => (
          <li key={r.id} className={styles.editItem}>
            <select
              className={styles.select}
              value={r.tipo}
              onChange={(e) => onUpdate(r.id, { tipo: e.target.value as SocialKind })}
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
              onChange={(e) => onUpdate(r.id, { label: e.target.value })}
            />

            <input
              className={styles.input}
              placeholder="https://..."
              value={r.url}
              onChange={(e) => onUpdate(r.id, { url: e.target.value })}
            />

            <button
              type="button"
              className={styles.iconBtnDanger}
              onClick={() => onRemove(r.id)}
              aria-label="Eliminar"
              title="Eliminar"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
