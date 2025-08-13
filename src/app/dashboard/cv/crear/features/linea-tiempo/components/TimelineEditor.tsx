'use client';
import React, { useState } from 'react';
import styles from '../LineaDeTiempo.module.css';
import type { TimelineItem } from '../types';
import { uid } from '../hooks/useUid';
import { moveItem } from '../utils/items';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function TimelineEditor({
  initial,
  onChange,
}: {
  initial: TimelineItem[];
  onChange?: (items: TimelineItem[]) => void;
}) {
  const [items, setItems] = useState<TimelineItem[]>(initial);

  const commit = (next: TimelineItem[]) => {
    setItems(next);
    onChange?.(next);
  };

  const addItem = () =>
    commit([...items, { id: uid(), fecha: '', titulo: '', descripcion: '', enlace: '' }]);

  const updateItem = (id: string, patch: Partial<TimelineItem>) =>
    commit(items.map(it => (it.id === id ? { ...it, ...patch } : it)));

  const removeItem = (id: string) => commit(items.filter(it => it.id !== id));

  const move = (id: string, dir: 'up' | 'down') => commit(moveItem(items, id, dir));

  return (
    <section className={styles.wrap} aria-label="Editor de línea de tiempo">
      <div className={styles.tools}>
        <button type="button" className={styles.addBtn} onClick={addItem}>
          <Plus size={16} /> Agregar evento
        </button>
      </div>

      <ul className={styles.editList}>
        {items.map((it, i) => (
          <li key={it.id} className={styles.editItem}>
            <div className={styles.orderBtns}>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => move(it.id, 'up')}
                disabled={i === 0}
                title="Subir"
              >
                <ArrowUp size={16} />
              </button>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => move(it.id, 'down')}
                disabled={i === items.length - 1}
                title="Bajar"
              >
                <ArrowDown size={16} />
              </button>
            </div>

            <div className={styles.fields}>
              <label className={styles.label}>
                <span>Fecha</span>
                <input
                  className={styles.input}
                  placeholder="2024 / Jun 2024 / 10-05-2024"
                  value={it.fecha}
                  onChange={(e) => updateItem(it.id, { fecha: e.target.value })}
                />
              </label>

              <label className={styles.label}>
                <span>Título</span>
                <input
                  className={styles.input}
                  placeholder="Evento / logro / publicación…"
                  value={it.titulo}
                  onChange={(e) => updateItem(it.id, { titulo: e.target.value })}
                />
              </label>

              <label className={styles.label}>
                <span>Descripción (opcional)</span>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  placeholder="Detalles…"
                  value={it.descripcion}
                  onChange={(e) => updateItem(it.id, { descripcion: e.target.value })}
                />
              </label>

              <label className={styles.label}>
                <span>Enlace (opcional)</span>
                <input
                  className={styles.input}
                  placeholder="https://..."
                  value={it.enlace}
                  onChange={(e) => updateItem(it.id, { enlace: e.target.value })}
                />
              </label>
            </div>

            <div className={styles.removeCol}>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeItem(it.id)}
                title="Eliminar"
                aria-label="Eliminar"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
